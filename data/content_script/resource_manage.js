try {
    var resource_manage = (function () {
        return {
            css_list: [
                {
                    name: 'font-awesome.min.css',
                    path: 'asset/css/font-awesome.min.css'
                },
                {
                    name: 'bootstrap.min.css',
                    path: 'asset/css/bootstrap.min.css'
                },
                {
                    name: 'bootstrap-theme.min.css',
                    path: 'asset/css/bootstrap-theme.min.css'
                },
                {
                    name: 'bootstrap-social.css',
                    path: 'asset/css/bootstrap-social.css'
                },
                {
                    name: 'nprogress.css',
                    path: 'asset/css/nprogress.css'
                },
                {
                    name: 'tipped.css',
                    path: 'asset/css/tipped.css'
                },
                {
                    name: 'lazy-image-style.css',
                    path: 'asset/css/lazy-image-style.css'
                },
                {
                    name: 'style.css',
                    path: 'asset/css/style.css'
                }
            ],
            js_list: [
                {
                    name: 'main.js',
                    path: 'asset/js/main.js'
                },
                {
                    name: 'ajax_hook.js',
                    path: 'asset/js/ajax_hook.js'
                },
                {
                    name: 'jquery-2.1.3.min.js',
                    path: 'asset/js/jquery-2.1.3.min.js'
                },
                {
                    name: 'nprogress.js',
                    path: 'asset/js/nprogress.js'
                },
                {
                    name: 'tipped.js',
                    path: 'asset/js/tipped.js'
                },
                {
                    name: 'angular.min.js',
                    path: 'asset/js/angular.min.js'
                },
                {
                    name: 'angular-route.min.js',
                    path: 'asset/js/angular-route.min.js'
                },
                {
                    name: 'ui-bootstrap-tpls-0.12.0.js',
                    path: 'asset/js/ui-bootstrap-tpls-0.12.0.js'
                },
                {
                    name: 'tipped-directive.js',
                    path: 'asset/js/tipped-directive.js'
                },
                {
                    name: 'ngHtmlCompile.js',
                    path: 'asset/js/ngHtmlCompile.js'
                },
                {
                    name: 'lazy-image.js',
                    path: 'asset/js/lazy-image.js'
                },
                {
                    name: 'router.js',
                    path: 'config/router.js'
                },
                {
                    name: 'jwplayer.js',
                    path: 'asset/js/jwplayer.js'
                }
            ],
            directive_list: [],
            controller_list: [
                {
                    name: 'controller.js',
                    path: 'controller/controller.js'
                },
                {
                    name: 'menu_manage.js',
                    path: 'controller/menu_manage.js'
                },
                {
                    name: 'carousel.js',
                    path: 'controller/carousel.js'
                },
                {
                    name: 'movie.js',
                    path: 'controller/movie.js'
                },
                {
                    name: 'film_list.js',
                    path: 'controller/film_list.js'
                },
                {
                    name: 'pagination.js',
                    path: 'controller/pagination.js'
                },
                {
                    name: 'search.js',
                    path: 'controller/search.js'
                },
                {
                    name: 'view.js',
                    path: 'controller/view.js'
                },
                {
                    name: 'login.js',
                    path: 'controller/login.js'
                },
                {
                    name: 'player.js',
                    path: 'controller/player.js'
                },
                {
                    name: 'comment.js',
                    path: 'controller/comment.js'
                }
            ],
            queue: [],
            resource: {},
            register: function () {
                var _this = this;
                self.port.on('res_resource', function (res) {
                    _this.resource[res.path].content = res.content;
                    _this.resource[res.path].callback(res.content);
                });
                var gm_script = win.gm_script;
                if (!win.hasOwnProperty('gm_script')) {
                    gm_script = createObjectIn(win, {defineAs: "gm_script"});
                }
                var req_resource = function (path, callback) {
                    _this.req_resource_call_back(path, function (content) {
                        callback(content);
                    })
                };
                exportFunction(req_resource, win.gm_script, {defineAs: "req_resource"});
            },
            req_resource_call_back: function (path, callback) {
                var _this = this;
                if (_this.resource[path]) {
                    callback(_this.resource[path].content);
                    return;
                }
                _this.resource[path] = {callback: callback, content: ''};
                _this.queue.push(_this.resource[path]);
                self.port.emit('req_resource', path);
            },
            req_resource: function (path) {
                var _this = this;
                return Q.Promise(function (resolve) {
                    _this.req_resource_call_back(path, function (content) {
                        resolve(content);
                    })
                })
            },
            add_innerHTML: function (path, tag, parent) {
                var _this = this;
                return _this.req_resource(path)
                    .then(function (content) {
                        tag.innerHTML = content;
                        win.console.info('%cRESOURCE LOAD: ', 'font-weight:bold;color:blue', tag.getAttribute('name'));
                        parent.appendChild(tag);
                        return true;
                    });
            },
            load_css: function (css, parent) {
                var _this = this;
                var style = document.createElement('style');
                style.setAttribute('name', css.name);
                style.type = 'text/css';
                return _this.add_innerHTML(css.path, style, parent);
            },
            load_js: function (js, parent) {
                var _this = this;
                var script = document.createElement('script');
                script.setAttribute('name', js.name);
                script.type = 'application/x-javascript';
                return _this.add_innerHTML(js.path, script, parent);
            },
            load_css_list: function (parent) {
                var _this = this;
                var q_all = [];
                _this.css_list.forEach(function (css) {
                    q_all.push(_this.load_css(css, parent));
                });
                return Q.all(q_all).spread(function () {
                    return true
                });
            },
            load_js_list: function (parent) {
                var _this = this;
                var q_all = [];
                _this.js_list.forEach(function (js) {
                    q_all.push(_this.load_js(js, parent));
                });
                return Q.all(q_all).spread(function () {
                    return true
                });
            },
            load_directive_list: function (parent) {
                var _this = this;
                var q_all = [];
                _this.directive_list.forEach(function (js) {
                    q_all.push(_this.load_js(js, parent));
                });
                return Q.all(q_all).spread(function () {
                    return true
                });
            },
            load_controller_list: function (parent) {
                var _this = this;
                var q_all = [];
                _this.controller_list.forEach(function (js) {
                    q_all.push(_this.load_js(js, parent));
                });
                return Q.all(q_all).spread(function () {
                    return true
                });
            }
        };
    }).call(null);
}
catch (err) {
    win.console.error(err);
}
