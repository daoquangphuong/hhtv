(function () {
    var controller_name = 'menu_manage';
    application.controller(controller_name, ['$scope', '$http', function ($scope, $http) {
        var _this = $scope[controller_name] = $scope[controller_name] || {};
        var _controller = $scope['controller'] = $scope['controller'] || {};
        // ----- SHOW/HIDE menu
        _this.set_cookie = function (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toGMTString();
            document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
        };

        _this.get_cookie = function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i].trim();
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }
            return "";
        };

        if(_this.get_cookie('hide_menu') === 'true') _controller.menu_is_hidden = true;

        // ----- LOCATION
        _this.init = function (jq) {
            if (_this.menu_list) return;
            //var menu_list = jq.find('#smoothmenu1 > ul > li');
            //var elem = angular.element;
            //_this.menu_list = [];
            //menu_list.each(function () {
            //    var menu = elem(this);
            //    var menu_a_tag = menu.find('>a').eq(0);
            //    var menu_info = {
            //        href: _controller.route_href(menu_a_tag.attr('href')),
            //        name: menu_a_tag.text(),
            //        child: []
            //    };
            //    var menu_child = menu.find('>ul >li');
            //    if (menu_child.length > 0) {
            //        menu_child.each(function () {
            //            var child = elem(this);
            //            var child_a_tag = child.find('>a').eq(0);
            //            menu_info.child.push({
            //                href: _controller.route_href(child_a_tag.attr('href')),
            //                name: child_a_tag.text()
            //            });
            //        });
            //    }
            //    if (menu_info.child.length > 1) {
            //        menu_info.child.unshift(menu_info.child.pop());
            //    }
            //    _this.menu_list.push(menu_info);
            //});
            //_this.menu_list = _this.menu_list.slice(0, 2);
            _this.menu_list = [];
            _this.menu_list.push({
                href: _controller.route_href('http://www.hayhaytv.vn/phim-le'),
                name: 'PHIM LẺ',
                child: []
            });
            _this.menu_list.push({
                href: _controller.route_href('http://www.hayhaytv.vn/phim-bo'),
                name: 'PHIM BỘ',
                child: []
            });
            _this.menu_list.push({
                href: _controller.route_href('http://www.hayhaytv.vn/phim-chieu-rap'),
                name: 'PHIM CHIẾU RẠP',
                child: []
            })
        };
        _this.get_search_hint = function (val) {
            var elem = angular.element;
            return $http.post(main.baseUrl + '/search/autocomplete', {'object': val}, {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: function (data) {
                        return elem.param(data);
                    }
                }
            )
                .then(function (res) {
                    var data = res.data;
                    var list = {};
                    list['VOD'] = data['VOD'].map(function (e) {
                        e.link = _controller.route_href(e.link);
                        if(e.images){
                            e.images += '?bypass=true';
                        }
                        return e;
                    });
                    list['TAGS'] = data['TAGS'].map(function (e) {
                        e.link = _controller.route_href(main.baseUrl + '/tags/' + e.keyword);
                        return e;
                    });
                    list['Actors'] = data['Actors'].map(function (e) {
                        e.link = _controller.route_href(main.baseUrl + '/dien-vien/' + e.keyword);
                        return e;
                    });
                    list['Director'] = data['Director'].map(function (e) {
                        e.link = _controller.route_href(main.baseUrl + '/dao-dien/' + e.keyword);
                        return e;
                    });
                    return [{key: '', value: list}];
                })
        };

        _this.make_search = function () {
            var val = _this.search_value;
            var keyword = CharacterAutoComplete(val.toString());
            var url = main.baseUrl + '/#/tim-kiem/' + keyword;
            main.redirect(url);
        };

        _this.hidden = function () {
            _controller.menu_is_hidden = true;
            _this.set_cookie("hide_menu", 'true', 365);
        };

        _this.show = function () {
            _controller.menu_is_hidden = false;
            _this.set_cookie("hide_menu", 'false', 365);
        };

        _this.scroll_to_top = function () {
            var elem = angular.element;
            elem('body, html').animate({scrollTop: 0});
        };

        function CharacterAutoComplete(str) {
            str = str.toLowerCase(); // chuyển chuỗi sang chữ thường để xử lý

            // tìm kiếm và thay thế tất cả các nguyên âm có dấu sang không dấu
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");

            str = str.replace(/-/g, "--");

            //str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");
            str = str.replace(/!|@|%|\^|\*|\=|\<|\>|\?|\/|,|\:|\;| |\"|\&|\#|\[|\]|~|$|_/g, "-");

            // tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự -
            //str= str.replace(/-+-/g,"-"); //thay thế 2- thành 1-
            str = str.replace(/^\-+|\-+$/g, ""); //cắt bỏ ký tự - ở đầu và cuối chuỗi

            return str; // xuất kết quả xữ lý ra
        }
    }]);
}).call();