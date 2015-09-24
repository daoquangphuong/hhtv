(function () {
    var controller_name = 'search';
    application.controller(controller_name, ['$scope', '$routeParams', function ($scope, $routeParams) {
        var _this = $scope[controller_name] = $scope[controller_name] || {};
        var _controller = $scope['controller'] = $scope['controller'] || {};
        var _movie = $scope['movie'] = $scope['movie'] || {};

        // ----- LOCATION
        _this.init = function (jq) {
            var elem = angular.element;
            var search_menu = jq.find('#search .menu_choose-sub,#colDivVOD .menu_choose-sub').eq(0);
            var select = search_menu.find('select');
            var select_list = [];
            select.each(function () {
                var sl = elem(this);
                var option = sl.find('option');
                select_list.push({
                    id: sl.attr('id'),
                    name: sl.attr('name'),
                    value: sl.val(),
                    option: option.toArray().map(function (e) {
                        var x = elem(e);
                        return {name: x.text(), value: x.attr('value')}
                    })
                })
            });
            _this.select_list = select_list;
            _this.sort = search_menu.find('#active').attr('value');
            _this.search_type = 'filmle_search';
            _this.search_url = false;
            var btn_search = search_menu.find('#btn_search');
            if (btn_search.length > 0) {
                var search_on_click = btn_search.attr('onclick');
                var search_type_mat = search_on_click.match(/{'(.*?_search)'/);
                if (search_type_mat) {
                    _this.search_type = search_type_mat[1];
                }
                var search_url_mat = search_on_click.match(/callURL\('(.*?)'/);
                _this.search_url = _controller.route_href(search_url_mat[1]);
            }
        };
        _this.make_search = function () {
            var option = _this.select_list.map(function (e) {
                return e.value
            });
            option.push(_this.sort);
            var search_value = option.join(',');
            if (_this.search_url) {
                main.redirect(main.baseUrl + _this.search_url + '?st=' + _this.search_type + '&sv=' + search_value);
                $routeParams.st = _this.search_type;
                $routeParams.sv = search_value;
                delete $routeParams.p;
                _movie.init();
            }
        };
        _this.make_sort = function () {
            _this.sort = _this.sort == 'ASC' ? 'DESC' : 'ASC';
            _this.make_search();
        }
    }]);
}).call();