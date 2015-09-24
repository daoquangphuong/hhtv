var application = angular.module('application', ['ngRoute', 'ui.bootstrap', 'decipher.tipped', 'afkl.lazyImage', 'ngHtmlCompile']);

(function () {
    var root_path = '/';
    var template_path = main.baseUrl + root_path + 'gm_script/resource/view';
    var app_name = application;
    app_name.config(['$routeProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
        function ($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {

            app_name.controller = $controllerProvider.register;
            app_name.directive = $compileProvider.directive;
            app_name.filter = $filterProvider.register;
            app_name.factory = $provide.factory;
            app_name.service = $provide.service;

            $routeProvider.
                when('/xem-phim/:film_link', {
                    templateUrl: template_path + '/view/view.html',
                    controller: 'view',
                    reloadOnSearch: false
                }).
                when('/:link*?', {
                    templateUrl: template_path + '/movie/movie.html',
                    controller: 'movie',
                    reloadOnSearch: false
                }).
                //when('/movie/:type/:search?', {
                //    templateUrl: template_path + '/movie/movie.html',
                //    controller: 'movie',
                //    reloadOnSearch:false
                //}).
                otherwise({
                    redirectTo: root_path
                });
        }]);
}).call();

