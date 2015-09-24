(function () {
    var controller_name = 'view';
    application.controller(controller_name, ['$scope', '$routeParams', '$http', '$q', '$timeout', function ($scope, $routeParams, $http, $q, $timeout) {
        var _this = $scope[controller_name] = $scope[controller_name] || {};
        var _controller = $scope['controller'] = $scope['controller'] || {};
        var _carousel = $scope['carousel'] = $scope['carousel'] || {};
        var _player = $scope['player'] = $scope['player'] || {};
        var _comment = $scope['comment'] = $scope['comment'] || {};
        _this.init = function (clear_cache) {
            return $q(function (resolve) {
                var elem = angular.element;
                NProgress.configure({minimum: 0.4, showSpinner: false, trickleRate: 0.05, trickleSpeed: 10});
                NProgress.start();
                _carousel.clear();
                var url = $routeParams.film_link || '';
                if ($routeParams.ep >= 0) {
                    url += '-Tap-' + $routeParams.ep;
                }
                url += '-hd-' + $routeParams.ep_code + '.html';
                var get_url = main.baseUrl + '/xem-phim/' + url;
                if ($routeParams.jj && $routeParams.tp) {
                    get_url = 'http://jj.hayhaytv.vn/' + $routeParams.tp + '/' + url;
                }
                if (clear_cache) {
                    delete _controller.page_cache[get_url];
                }
                if (_controller.page_cache[get_url]) {
                    $timeout(function () {
                        success(_controller.page_cache[get_url]);
                    });
                    return;
                }
                window.gm_script.make_request('get', {url: get_url}, function (status, header, text, json) {
                    if (status == '200') {
                        success(text);
                        return;
                    }
                    console.error(new Error('Make request fail ' + get_url));
                });

                function success(res) {
                    if (!_controller.page_cache[get_url]) {
                        _controller.page_cache[get_url] = res;
                    }
                    _controller.set_full_page_scroll('#comment-review');
                    resolve();
                    NProgress.done();
                    var jq = elem(res);
                    //check if is JJ
                    if (res.match(/content="jj.hayhaytv.vn"/)) {
                        var link_an_do = 'http://www.hayhaytv.vn/trailer';
                        if (clear_cache) delete  _controller.page_cache[link_an_do];
                        if (_controller.page_cache[link_an_do]) {
                            var jqp = elem(_controller.page_cache[link_an_do]);
                            load_ctrl(jqp, jq, jq);
                            return;
                        }
                        $http.get(link_an_do)
                            .success(function (resp) {
                                _controller.page_cache[link_an_do] = resp;
                                var jqp = elem(resp);
                                load_ctrl(jqp, jq, jq);
                            });
                        return;
                    }
                    load_ctrl(jq, jq, jq);
                    function load_ctrl(jq_controller, jq_player, jq_comment) {
                        _controller.init(jq_controller);
                        _player.init(jq_player);
                        _comment.init(jq_comment);
                    }
                }
            }).catch(function (err) {
                console.error(err);
            })
        }
    }]);
}).call();