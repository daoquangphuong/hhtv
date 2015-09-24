(function () {
    var controller_name = 'login';
    application.controller(controller_name, ['$scope', '$http', '$modal', function ($scope, $http, $modal) {
        var _this = $scope[controller_name] = $scope[controller_name] || {};
        var _controller = $scope['controller'] = $scope['controller'] || {};
        _this.is_logged = false;
        _this.init = function (jq) {
            var elem = angular.element;
            _this.is_logged = jq.find('.header .box_login .login_txt').eq(1).attr('href') == 'user/logout';
            var scripts = jq.wrap('<div></div>').parent().find('script').toArray();
            var k, v;
            for (k in scripts) {
                if (!scripts.hasOwnProperty(k)) continue;
                v = scripts[k];
                var text = elem(v).text();
                var app_mat = text.match(/var APPID = '(.*?)';/);
                if (app_mat) {
                    _this.APPID = app_mat[1];
                    var links_google_mat = text.match(/var links_google = '(.*?)';/);
                    if (links_google_mat) {
                        _this.links_google = links_google_mat[1];
                    }
                    break;
                }
            }
        };
        _this.open_login_pop = function (size) {
            var modalInstance = $modal.open({
                templateUrl: '/gm_script/resource/view/login/popup.html',
                size: size,
                scope: $scope
            });
            _this.close_pop_up = function () {
                modalInstance.dismiss();
            };
            modalInstance.opened.then(function () {

            });
            modalInstance.result.then(function () {
                //console.log('close');
            }, function () {
                _this.reset_pop_up();
            });
        };
        _this.reset_pop_up = function () {
            _this.login_form.$setPristine();
            _this.login_data = {};
            _this.status = 'none';
            _this.FB_loaded = false;
        };
        _this.submit = function () {
            var elem = angular.element;
            _this.is_logging_on = true;
            _this.status = 'none';
            $http.post(main.baseUrl + '/ajax_jsonp.php?p=jsonp_login', _this.login_data, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: function (data) {
                    return elem.param(data);
                }
            })
                .success(function (res) {
                    _controller.refresh_page()
                        .then(function () {
                            _this.is_logging_on = false;
                            _this.close_pop_up();
                        });
                    if (res.success == 'success') {
                        _this.status = 'success';
                        return;
                    }
                    _this.status = 'error';
                })
        };
        _this.logout = function () {
            _this.is_logging_out = true;
            $http.get(main.baseUrl + '/user/logout')
                .success(function () {
                    _controller.refresh_page().then(function () {
                        _this.is_logging_out = false;
                    });
                })
        };
        //Social
        _this.FBLogin = function () {
            _this.is_logging_on = true;
            _controller.load_script('//connect.facebook.net/vi_VN/sdk.js')
                .then(function () {
                    if (_this.APPID && !_controller.FB_init) {
                        _controller.FB_init = true;
                        FB.init({
                            appId: _this.APPID,
                            channelUrl: main.baseUrl + '/channel.html',
                            status: true,
                            cookie: true,
                            xfbml: true,
                            version: 'v2.3'
                        });
                    }
                    _this.FB_loaded = true;
                });
        };
        _this.FBCallback = function (response) {
            if (response.authResponse) {
                window.gm_script.make_request('get', {url: main.baseUrl + '/login-facebook.php'}, function (status, header, text, json) {
                    _controller.refresh_page()
                        .then(function () {
                            _this.is_logging_on = false;
                            _this.is_FB_logging = false;
                            _this.close_pop_up();
                        });
                })
            }
        };
        _this.GGLogin = function () {
            if (_this.links_google) {
                _this.is_logging_on = true;
                main.redirect(_this.links_google);
            }
        };
    }]);
}).call();