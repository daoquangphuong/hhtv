(function () {
    var controller_name = 'carousel';
    application.controller(controller_name, ['$scope', '$routeParams', function ($scope, $routeParams) {
        var _this = $scope[controller_name] = $scope[controller_name] || {};
        var _controller = $scope['controller'] = $scope['controller'] || {};
        // ----- LOCATION
        _this.movie_type = false;
        _this.init = function (jq) {
            if (_this.movie_type === $routeParams.link && $routeParams.link) {
                return;
            }
            var elem = angular.element;
            _this.movie_type = $routeParams.link;
            var pix = jq.find('.pix_diapo').eq(0);
            var frame_elem_list = pix.find('div[data-thumb]');
            _this.frame = [];
            var frame_list = [];
            frame_elem_list.each(function () {
                var a = elem(this).find('>a').eq(0);
                var div = elem(this).find('>div').eq(0);
                if (!div.hasClass('elemHover')) return;
                div.find('h3,h4').wrapAll('<div class="film-caption"></div>');
                div.find('.film-caption').nextAll().wrapAll('<div class="film-info"></div>');
                div.find('.film-info >a').eq(0).remove();
                div.find('a[href]').each(function () {
                    elem(this).attr('href', _controller.route_href(elem(this).attr('href')));
                });
                frame_list.push({
                    href: a.attr('href'),
                    image: a.find('img').eq(0).attr('src') + '?bypass=true',
                    html: div.html()
                })
            });
            _this.frame = frame_list;
            //if (_this.frame.length != frame_list.length) {
            //    _this.frame = frame_list;
            //    return;
            //}
            //frame_list.forEach(function (e, i) {
            //    _this.frame[i].href = e.href;
            //    _this.frame[i].image = e.image;
            //    _this.frame[i].html = e.html;
            //});
        };
        _this.clear = function(){
            _this.frame = [];
        }
    }]);
}).call();