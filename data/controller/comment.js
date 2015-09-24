(function () {
    var controller_name = 'comment';
    application.controller(controller_name, ['$scope', '$timeout', '$routeParams', function ($scope, $timeout, $routeParams) {
        var _this = $scope[controller_name] = $scope[controller_name] || {};
        var _controller = $scope['controller'] = $scope['controller'] || {};
        _this.init = function (jq) {
            var elem = angular.element;
            var scripts = jq.wrap('<div></div>').parent().find('script').toArray();
            var k, v;
            for (k in scripts) {
                if (!scripts.hasOwnProperty(k)) continue;
                v = scripts[k];
                var text = elem(v).text();
                var app_mat = text.match(/var APPID = '(.*?)';/);
                if (app_mat) {
                    _this.APPID = app_mat[1];
                    break;
                }
            }
            _this.comment = jq.find('#div_comment').find('div[data-href]').attr('data-href');
            _this.review = jq.find('#div_commentpreview').find('div[data-href]').attr('data-href');

            if (!_this.comment) {
                // JJ hayhaytv
                for (k in scripts) {
                    if (!scripts.hasOwnProperty(k)) continue;
                    v = scripts[k];
                    text = elem(v).text();
                    var comment_mat = text.match(/'data-href="(.*?)"/);
                    app_mat = text.match(/appId=(\d+)/);
                    if (comment_mat) {
                        _this.comment = comment_mat[1];
                        if (app_mat) {
                            _this.APPID = app_mat[1];
                        }
                        break;
                    }
                }
            }
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
                    if ($routeParams.film_link && $routeParams.film_link != _this.film_link) {
                        _this.film_link = $routeParams.film_link;
                        $timeout(function () {
                            $scope.$apply();
                            FB.XFBML.parse(document.getElementById('comment'));
                            _this.show = true;
                        });
                    }
                });

        }
        ;
        _this.tab_select = function () {
            if (!_this.first_tab) {
                _this.first_tab = true;
                return;
            }
            var elem = angular.element;
            var pos = elem('#comment-review').offset().top - elem('#fake-top')[0].scrollHeight;
            elem('body, html').animate({scrollTop: pos});
        }
    }
    ])
    ;
}).call();