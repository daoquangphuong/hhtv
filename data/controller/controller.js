(function () {
    var controller_name = 'controller';
    application.controller(controller_name, ['$scope', '$sce', '$compile', '$q', function ($scope, $sce, $compile, $q) {
        var _this = $scope[controller_name] = $scope[controller_name] || {};
        var _movie = $scope['movie'] = $scope['movie'] || {};
        var _view = $scope['view'] = $scope['view'] || {};
        // ----- LOCATION
        _this.location = window.location;
        _this.base_url = main.baseUrl;
        var _menu_manage = $scope['menu_manage'] = $scope['menu_manage'] || {};
        var _login = $scope['login'] = $scope['login'] || {};
        var _carousel = $scope['carousel'] = $scope['carousel'] || {};
        _this.page_cache = {};
        _this.init = function (jq) {
            _login.init(jq);
            _menu_manage.init(jq);
            _carousel.init(jq);
        };
        _this.route_href = function (href) {
            href = href.trim();
            var mat_xem_phim = href.match(/https?:\/\/.*?\/xem-phim\/(.*)/i);
            var mat_jj = href.match(/https?:\/\/jj.*?\/(.*?)\/(phim-.*)/);
            if (mat_xem_phim || mat_jj) {
                var jj = [];
                if (mat_jj) {
                    mat_xem_phim = [];
                    mat_xem_phim[1] = mat_jj[2];
                    jj = ['&jj=', 'true', '&tp=', mat_jj[1]];
                }
                var mat_tap_phim = mat_xem_phim[1].match(/^(.*)-Tap-(\d+)-\w\w-(\w+)\.html$/im);
                if (mat_tap_phim) {
                    return ['/#/xem-phim/', mat_tap_phim[1], '?ep=', mat_tap_phim[2], '&ep_code=', mat_tap_phim[3]].concat(jj).join('');
                }
                var mat_not_tap_phim = mat_xem_phim[1].match(/^(.*)-\w\w-(\w+)\.html$/im);
                if (mat_not_tap_phim) {
                    return ['/#/xem-phim/', mat_not_tap_phim[1], '?ep=', -1, '&ep_code=', mat_not_tap_phim[2]].concat(jj).join('');
                }
            }
            var mat = href.match(/https?:\/\/.*?\/(.*)/i);
            if (!mat) {
                return href;
            }
            var url = mat[1].replace(/#.*/, '');
            return '/#/' + url;
        };
        _this.bind_html = function (html) {
            $compile(html)($scope);
            return $sce.trustAsHtml(html);
        };
        _this.refresh_page = function () {
            // clear cache
            _this.page_cache = {};
            if (window.location.hash.match(/^#\/xem-phim\//)) {
                return _view.init(true);
            }
            return _movie.init(true);
        };
        _this.load_script = function (url) {
            return $q(function (resolve) {
                _this.script = _this.script || {};
                if (_this.script[url]) {
                    if (_this.script[url] == 'loading') {
                        var loop = function () {
                            setTimeout(function () {
                                if (_this.script[url] === true) {
                                    resolve();
                                    return;
                                }
                                loop();
                            }, 100)
                        };
                        loop();
                        return;
                    }
                    resolve();
                    return;
                }
                _this.script[url] = 'loading';
                var script = document.createElement("script");
                script.type = "text/javascript";
                if (script.readyState) {  //IE
                    script.onreadystatechange = function () {
                        if (script.readyState === "loaded" || script.readyState === "complete") {
                            script.onreadystatechange = null;
                            _this.script[url] = true;
                            resolve();
                        }
                    };
                } else {  //Others
                    script.onload = function () {
                        _this.script[url] = true;
                        resolve();
                    };
                }

                script.src = url;
                document.getElementsByTagName("head")[0].appendChild(script);

            });
        };
        _this.set_full_page_scroll = function (selector) {
            _this.full_page_scroll_selector = selector;
        };
        _this.full_page_scroll = function () {
            var elem = angular.element;
            var cur_page = 0;
            var is_animate = false;
            elem(document).mousedown(function () {
                _this.mouse = 'down';
            });
            elem(document).mouseup(function () {
                _this.mouse = 'up';
                scroll();
            });
            window.scrollTo(0, 0);
            elem(document).scroll(scroll);
            function scroll(event) {
                if (!_this.full_page_scroll_selector) return;
                if (_this.mouse == 'down') {
                    event.preventDefault();
                    return;
                }
                if (is_animate) return;
                var win = elem(window);
                var height = win.height();
                var width = win.width();
                width = width > 960 ? 960 : width;
                if (height / width < 650 / 960) return;
                var cur_top = win.scrollTop();
                var content_pos = elem(_this.full_page_scroll_selector).offset().top - elem('#fake-top')[0].scrollHeight;
                if (!cur_page) {
                    cur_page = cur_top >= content_pos ? 2 : 1;
                }
                if (cur_top > 0 && cur_top < content_pos) {
                    if (cur_page == 1) {
                        is_animate = true;
                        cur_page = 2;
                        elem('html,body').animate({scrollTop: content_pos}, function () {
                            setTimeout(function () {
                                is_animate = false
                            }, 100);
                        });
                    }
                    else {
                        is_animate = true;
                        cur_page = 1;
                        elem('html,body').animate({scrollTop: 0}, function () {
                            setTimeout(function () {
                                is_animate = false
                            }, 100);
                        });
                    }
                }
            }
        };
        _this.full_page_scroll();
    }]);
}).call();