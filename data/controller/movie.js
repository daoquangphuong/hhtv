(function () {
    var controller_name = 'movie';
    application.controller(controller_name, ['$scope', '$routeParams', '$http', '$q', '$timeout', function ($scope, $routeParams, $http, $q, $timeout) {
        var _this = $scope[controller_name] = $scope[controller_name] || {};
        var _controller = $scope['controller'] = $scope['controller'] || {};
        var _film_list = $scope['film_list'] = $scope['film_list'] || {};
        var _pagination = $scope['pagination'] = $scope['pagination'] || {};
        var _search = $scope['search'] = $scope['search'] || {};

        _this.init = function (clear_cache) {
            return $q(function (resolve) {
                var elem = angular.element;
                elem('div.t_Tooltip').remove();
                var post = false;
                NProgress.configure({minimum: 0.4, showSpinner: false, trickleRate: 0.05, trickleSpeed: 10});
                NProgress.start();
                var next_page = false;
                var page_change = false;
                var url = $routeParams.link || '';
                if ($routeParams.st && $routeParams.sv) {
                    post = {};
                    post[$routeParams.st] = $routeParams.sv;
                }
                if ($routeParams.p) {
                    url += '/trang-' + $routeParams.p;
                    if (_pagination.page_link) {
                        url = _pagination.page_link + $routeParams.p;
                        post = false;
                        next_page = true;
                    }
                    else if ($routeParams.st && $routeParams.sv) {
                        page_change = $routeParams.p;
                    }
                }
                if (url == '') {
                    url = ('?_=home');
                }
                var get_post_link = main.baseUrl + '/' + url;
                if (clear_cache) {
                    delete _controller.page_cache[get_post_link];
                }
                if (_controller.page_cache[get_post_link]) {
                    $timeout(function () {
                        success(_controller.page_cache[get_post_link]);
                    });
                    return;
                }
                $http[post ? 'post' : 'get'](get_post_link, post, {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: function (data) {
                        return elem.param(data);
                    }
                })
                    .success(success);

                function success(res) {
                    if (!_controller.page_cache[get_post_link] && !post) {
                        _controller.page_cache[get_post_link] = res;
                    }
                    _controller.set_full_page_scroll('#content');
                    resolve();
                    NProgress.done();
                    if (next_page) {
                        var next_jq = elem('<div>' + res + '</div>');
                        _film_list.init(next_jq);
                        return;
                    }
                    var jq = elem(res);
                    _controller.init(jq);
                    if (page_change) {
                        _pagination.init(jq, page_change);
                    } else {
                        _film_list.init(jq);
                        _pagination.init(jq);
                    }
                    _search.init(jq);
                }
            });
        }
    }]);
}).call();