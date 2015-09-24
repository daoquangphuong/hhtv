(function () {
    var controller_name = 'film_list';
    application.controller(controller_name, ['$scope', '$routeParams', function ($scope, $routeParams) {
        var _this = $scope[controller_name] = $scope[controller_name] || {};
        var _controller = $scope['controller'] = $scope['controller'] || {};
        _this.tooltip_options_1 = {
            target: 'mouse',
            background: {color: '#000', opacity: .75},
            border: {size: 3},
            hideOthers: true,
            hook: {target: 'bottomleft', tooltip: 'topleft'},
            maxWidth: 450
        };
        _this.tooltip_options_2 = {
            target: 'mouse',
            background: {color: '#000', opacity: .75},
            border: {size: 3},
            hideOthers: true,
            hook: {target: 'bottomright', tooltip: 'topright'},
            maxWidth: 450
        };
        _this.init = function (jq) {
            var elem = angular.element;
            _this.tooltip = {};
            var tooltip_list = jq.find('#mystickytooltip .atip');
            tooltip_list.each(function () {
                var tooltip = elem(this);
                var ul = tooltip.find('ul');
                var first_li = ul.find('>li').eq(0);
                ul.attr('class', 'tooltip-info');
                var child_li = first_li.find('>*');
                child_li.eq(0).replaceWith(elem('<h3/>').html(child_li.eq(0).html()));
                child_li.eq(1).replaceWith(elem('<h4/>').html(child_li.eq(1).html()));
                child_li.wrapAll('<div class="tooltip-title"></div>>');
                tooltip.prepend(first_li.html());
                first_li.remove();
                _this.tooltip[tooltip.attr('id')] = tooltip.wrap('<div></div>').parent().html();
            });
            _this.list = [];
            _this.tab_list = [];
            // neu co slider_box_sim
            var slider_box_sim = jq.find('.slider_box_sim');
            if (slider_box_sim.length > 5) {
                var tab_list = slider_box_sim.toArray().map(function (e) {
                    var e_tab = elem(e);
                    var a_tag = e_tab.find('> h2:first-child > a').eq(0);
                    return {
                        name: a_tag.text().trim().replace(/[\n\r]/g, '').replace(/\s+/g, ' '),
                        href: a_tag.attr('href'),
                        list: get_list(e_tab.find('.slide_child_div_dt'))
                    };
                });
                _this.tab_list = tab_list.filter(function (e) {
                    var mat = e.href.match(/https?:\/\/.*?\/(su-kien|phim-le|phim-bo|phim-chieu-rap)/);
                    var mat_jj = e.href.match(/https?:\/\/jj\./);
                    if (mat) {
                        switch (mat[1]) {
                            case 'su-kien':
                                e.name = 'Phim Hot';
                                break;
                            case 'phim-le':
                                e.name = 'Phim Lẻ';
                                break;
                            case 'phim-bo':
                                e.name = 'Phim Bộ';
                                break;
                            case 'phim-chieu-rap':
                                e.name = 'Phim Chiếu Rạp';
                                break;
                        }
                    }
                    if (mat_jj) {
                        e.name = 'JJ Chanel';
                    }
                    e.href = _controller.route_href(e.href);
                    return mat || mat_jj;
                });
                if (_this.tab_list.length > 0) {
                    _this.tab_select(_this.tab_list[0], true);
                }
                return;
            }
            var div = jq.find('#div');
            var film_list = false;
            if (div.length > 0) {
                film_list = div.find('.slide_child_div_dt');
            } else {
                film_list = jq.find('.slide_child_div_dt');
            }

            _this.list = get_list(film_list);

            function get_list(film_list) {
                return film_list.toArray().map(function (e) {
                    var film = elem(e);
                    var film_a_tag = film.find('>a');
                    var film_img_tag = film_a_tag.find('>img');
                    var film_p_tag = film_a_tag.find('>p span');
                    return {
                        tooltip_id: film_a_tag.attr('data-tooltip'),
                        tooltip_value: _this.tooltip[film_a_tag.attr('data-tooltip')] || '',
                        num_film: film_a_tag.find('.mask-num-film').attr('class', 'number_film').wrap('<span class="num_film" />').closest('.num_film').html(),
                        href: _controller.route_href(film_a_tag.attr('href')),
                        alt: film_img_tag.attr('alt'),
                        src: (film_img_tag.attr('data-original')?film_img_tag.attr('data-original'):film_img_tag.attr('src')) + '?bypass=true',
                        en_name: film_p_tag.eq(0).text(),
                        vn_name: film_p_tag.eq(1).text()
                    };
                })
            }
        };
        _this.tab_select = function (tab, no_scroll) {
            _this.tab_list.forEach(function (tab) {
                tab.active = false;
            });
            tab.active = true;
            if(!no_scroll){
                var elem = angular.element;
                var pos = elem('#film_list').offset().top - elem('#fake-top')[0].scrollHeight;
                elem('body, html').animate({scrollTop: pos});
            }
            _this.list = tab.list;
        }
    }]);
}).call();