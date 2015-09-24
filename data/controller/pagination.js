(function () {
    var controller_name = 'pagination';
    application.controller(controller_name, ['$scope', '$routeParams', function ($scope, $routeParams) {
        var _this = $scope[controller_name] = $scope[controller_name] || {};
        var _movie = $scope['movie'] = $scope['movie'] || {};
        _this.init = function (jq, page_change) {
            var div = jq.find('#div');
            var paging = false;
            if (div.length > 0) {
                paging = div.find('.paging').eq(0);
            }
            else {
                paging = jq.find('.paging').eq(0);
            }
            var pagination = paging.find('.mh-jumppaging >span').eq(0);
            var pagination_mat = pagination.text().match(/Trang (\d+)\/(\d+)/);
            _this.cur_page = 0;
            _this.total_page = 0;
            if (pagination_mat) {
                _this.cur_page = pagination_mat[1];
                _this.total_page = pagination_mat[2];
            }
            var a_onclick = paging.find('> a[onclick]');
            _this.page_link = false;
            if (a_onclick.length > 0) {
                var onclick = a_onclick.eq(0).attr('onclick');
                var page_link_mat = onclick.match(/ajax_hayhaytv\.php\?.*?&page=/);
                if(page_link_mat){
                    _this.page_link = page_link_mat[0];
                }
            }
            if (page_change) {
                _this.cur_page = page_change;
                _this.page_change();
            }
        };
        _this.page_change = function () {
            var elem = angular.element;
            var pos = elem('#content').offset().top - elem('#fake-top')[0].scrollHeight;
            elem('body, html').animate({scrollTop: pos});
            if ($routeParams.st && $routeParams.sv) {
                main.redirect(main.baseUrl + '/#/' + $routeParams.link + '?st=' + $routeParams.st + '&sv=' + $routeParams.sv + '&p=' + _this.cur_page);
            }
            else {
                main.redirect(main.baseUrl + '/#/' + $routeParams.link + '?p=' + _this.cur_page);
            }
            $routeParams.p = _this.cur_page;
            _movie.init();
        };
        _this.go_to_page = function () {
            _this.go_page = parseInt(_this.go_page);
            if (_this.go_page > 0 && _this.go_page <= _this.total_page) {
                _this.cur_page = _this.go_page;
                _this.page_change();
            }
            else {
                _this.go_page = '';
            }
        };
    }]);
}).call();