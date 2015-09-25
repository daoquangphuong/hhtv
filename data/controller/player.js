(function () {
    var controller_name = 'player';
    application.controller(controller_name, ['$scope', '$routeParams', '$modal', '$http', function ($scope, $routeParams, $modal, $http) {
        var _this = $scope[controller_name] = $scope[controller_name] || {};
        var _controller = $scope['controller'] = $scope['controller'] || {};
        var _view = $scope['view'] = $scope['view'] || {};
        var _login = $scope['login'] = $scope['login'] || {};
        Tipped.hideAll();

        _this.host = {
            ip: "",
            location: ""
        };

        _this.get_host = function () {
            var rtmp_host = _this.get_cookie('rtmp_host');
            var host_mat = rtmp_host.match(/^(.*)\|(.*)$/);
            if (host_mat) {
                _this.host.location = host_mat[1];
                _this.host.ip = host_mat[2];
            }
        };

        _this.set_host = function (ip, location) {
            _this.host.location = location;
            _this.host.ip = ip;
            _this.set_cookie('rtmp_host', location + '|' + ip, 365);
        };

        _this.server = [
            {
                name: 'Hà-Nội',
                list: [
                    '118.69.202.2',
                    '118.69.202.11',
                    '118.69.202.12',
                    '118.69.202.25',
                    '118.69.202.31',
                    '118.69.202.34',
                    '118.69.202.40',
                    '118.69.202.45',
                    '118.69.202.46',
                    '118.69.202.52',
                    '118.69.202.56',
                    '118.69.202.61',
                    '118.69.202.65',
                    '118.69.202.67',
                    '118.69.202.69',
                    '118.69.202.70',
                    '118.69.202.74',
                    '118.69.202.105',
                    '118.69.202.106',
                    '118.69.202.107',
                    '118.69.202.112',
                    '118.69.202.113',
                    '118.69.202.114'
                ]
            },
            {
                name: 'TP-HCM',
                list: [
                    '221.132.35.70',
                    '221.132.35.145',
                    '221.132.35.162'
                ]
            }
        ];

        _this.player_id = 'jw_player';

        _this.init = function (jq) {
            _this.get_host();
            _this.show_play_film = false;
            try {
                jwplayer(_this.player_id).remove();
            }
            catch (e) {

            }
            var elem = angular.element;
            elem('body, html').animate({scrollTop: 0});
            var banner_add = jq.find('.banner_add');
            var banner_player = banner_add.find('.banner_player');
            var player_image_background = banner_player.find('.banner_player_img img').eq(0);
            ///
            var info_film = banner_player.find('.info_film-div').find('.info_film-img,.info_film-show,.info_film-dt').wrapAll('<div></div>');
            var info_film_img = info_film.parent().find('.info_film-img');
            info_film_img.addClass('col-sm-2 hidden-xs');
            var img_thumb = info_film_img.find('img');
            img_thumb.addClass('img-thumbnail');
            img_thumb.attr('src', img_thumb.attr('src') + '?bypass=true');
            ///
            var info_film_show = info_film.parent().find('.info_film-show');
            info_film_show.addClass('col-xs-6 col-sm-5');
            info_film_show.find('.info_film-link').find('span').eq(0).attr('class', 'btn btn-sm btn-default').attr('ng-click', 'player.open_config_pop(\'md\')');
            info_film_show.find('#btn_xemngay').addClass('btn btn-sm btn-success').attr('ng-click', 'player.play_film(false)');
            info_film_show.find('#btn_trailer').addClass('btn btn-sm btn-warning').attr('ng-click', 'player.play_film(true)');
            var h2 = info_film_show.find('h2');
            h2.eq(0).replaceWith('<h3>' + h2.eq(0).text() + '</h3>');
            h2.eq(1).replaceWith('<h4>' + h2.eq(1).text() + '</h4>');
            ///
            var info_film_dt = info_film.parent().find('.info_film-dt');
            info_film_dt.addClass('col-xs-6 col-sm-5');
            info_film_dt.find('a[href]').each(function () {
                elem(this).attr('href', _controller.route_href(elem(this).attr('href')))
            });
            info_film_dt.find('li').toArray().forEach(function (e, i) {
                if (i > 4) {
                    elem(e).addClass('hover');
                }
            });
            ///
            _this.info = {
                background: {
                    src: player_image_background.attr('src') + '?bypass=true',
                    alt: player_image_background.attr('alt')
                },
                info: info_film.parent().html()
            };
            // if is JJ hayhaytv
            var script_tag;
            if (banner_player.length <= 0) {
                banner_player = jq.find('#new_player_container');
                player_image_background = banner_player.find('#bannerPlay img').eq(0);
                info_film = elem('<div></div>');
                info_film.append('<div class="info_film-img col-sm-2 hidden-xs"></div>');
                info_film.append('<div class="info_film-show col-xs-6 col-sm-5"><div itemprop="name"></div><div class="content_mCustomScrollbar_4 content_mCustomScrollbar info_film-sidepalyer"></div><div class="info_film-link"></div></div>');
                info_film.append('<div class="info_film-dt col-xs-6 col-sm-5"></div>');
                //
                var image = banner_player.find('.player-info-img .player-info-img-dv');
                var img_thumb_jj = image.find('img');
                img_thumb_jj.addClass('img-thumbnail');
                img_thumb_jj.attr('src', img_thumb_jj.attr('src') + '?bypass=true');
                info_film.find('.info_film-img').html(image.html());
                //
                var show = banner_player.find('.player-info-tx').find('.mh-col2').eq(0);
                var show_title = show.find('>p').wrapAll('<div></div>').parent();
                var p = show_title.find('p');
                p.eq(0).replaceWith('<h3>' + p.eq(0).text() + '</h3>');
                p.eq(1).replaceWith('<h4>' + p.eq(1).text() + '</h4>');
                var show_content = show.find('>div');
                var total_view = banner_player.find('.mh-ico-view').text();
                info_film.find('.info_film-show').find('[itemprop="name"]').html(show_title.html());
                info_film.find('.info_film-show').find('.info_film-sidepalyer').html(show_content.text());
                info_film.find('.info_film-show').find('.info_film-link').html('<span class="btn btn-sm btn-default" ng-click="player.open_config_pop(\'md\')">Lượt xem: ' + total_view + '</span><span id="btn_xemngay" class="btn_span btn btn-sm btn-success" ng-click="player.play_film(false)">Xem phim</span>');

                //
                var dt = banner_player.find('.player-info-tx').find('.mh-col2').eq(1);
                var dt_ul = dt.find('ul').wrap('<div class="content_mCustomScrollbar_4 content_mCustomScrollbar info_film-cat_dt_film"></div>');
                dt_ul.find('li').toArray().forEach(function (e, i) {
                    if (i > 4) {
                        elem(e).addClass('hover');
                    }
                });
                info_film.find('.info_film-dt').html(dt_ul.parent().html());
                _this.info = {
                    background: {
                        src: player_image_background.attr('src') + '?bypass=true',
                        alt: player_image_background.attr('alt')
                    },
                    info: info_film.html()
                };
                script_tag = jq.find('#new_player.banner_player_player #new_player + script');
                _this.setup_info = _this.get_setup_info(script_tag.text());
            }
            else {
                script_tag = jq.find('#new_player + script');
                _this.setup_info = _this.get_setup_info(script_tag.text());
            }
            //
            var list_episodes = jq.find('.list_episodes');
            // if JJ hayhaytv
            if (list_episodes.length <= 0) {
                list_episodes = jq.find('.listepisode-page-item').eq(0);
            }
            var a_tag = list_episodes.find('a');
            _this.episodes = a_tag.toArray().map(function (e) {
                var a = elem(e);
                return {
                    active: a.attr('class') == 'active',
                    href: _controller.route_href(a.attr('href')),
                    text: a.text()
                }
            })
        };

        _this.play_film = function (is_trailer) {
            if (!_login.is_logged) {
                _login.open_login_pop('sm');
                return;
            }
            var elem = angular.element;
            elem('body, html').animate({scrollTop: 0});
            _this.show_play_film = true;
            _this.setup_player(_this.setup_info, is_trailer);
        };

        _this.open_episode = function (episode) {
            main.redirect(episode.href);
            var ep_mat, ep_code_mat, jj_mat, tp_mat;
            if (ep_mat = episode.href.match(/ep=([^&#=]*)/)) {
                $routeParams.ep = ep_mat[1]
            }
            if (ep_code_mat = episode.href.match(/ep_code=([^&#=]*)/)) {
                $routeParams.ep_code = ep_code_mat[1]
            }
            if (jj_mat = episode.href.match(/jj=([^&#=]*)/)) {
                $routeParams.jj = jj_mat[1]
            }
            if (tp_mat = episode.href.match(/tp=([^&#=]*)/)) {
                $routeParams.tp = tp_mat[1]
            }
            var elem = angular.element;
            elem('body, html').animate({scrollTop: 0});
            _view.init();
        };

        _this.get_setup_info = function (script) {
            eval(script);
            var info = {};

            function add_info(property) {
                try {
                    var script_eval = ['info.', property, ' = ', property].join('');
                    eval(script_eval);
                }
                catch (e) {
                    console.log(e);
                }
            }

            add_info('nextEpisode');
            add_info('initVideoUrl');
            add_info('initVideoUrlOld');
            add_info('initTrailerUrl');
            add_info('adsXMLURL');
            add_info('infoXMLUrl');
            add_info('imageSrc');
            add_info('videoSubs');
            add_info('defaultObj');
            add_info('playerInfo');
            add_info('ready');
            return info;
        };

        _this.setup_player = function (setup_info, is_trailer) {
            var ep_code = $routeParams.ep_code;
            player_id = _this.player_id;
            imageSrc = setup_info.imageSrc;
            videoSubs = setup_info.videoSubs;
            adsXMLURL = setup_info.adsXMLURL;
            infoXMLUrl = setup_info.infoXMLUrl;
            initVideoUrl = setup_info.initVideoUrl;
            googletag = {};
            googletag.cmd = [];
            var playlist_obj = {
                provider: main.baseUrl + '/jwplayer/hls.6.014.swf',
                sources: [{
                    file: initVideoUrl,
                    type: 'hls'
                }],
                image: imageSrc
            };
            var isResumed = false;

            jQuery.ajax({
                type: 'POST',
                data: {},
                url: 'http://myip.hayhaytv.vn/ip.php',
                dataType: "json", // data type of response
                success: function (data) {
                    ipAdress = data["ip"];
                    var jwplayerSetup = {
                        debug: true,
                        primary: "flash",
                        flashplayer: "http://static.hayhaytv.vn/jwplayer/jwplayer.flash.v12.swf",
                        hls_minbufferlength: 10,
                        hls_maxbufferlength: 300,
                        playlist: [playlist_obj],
                        captions: {         //  format text for subtitles
                            back: false,
                            color: '#FFFFFF',
                            fontfamily: "Arial",
                            fontsize: 18,
                            fontOpacity: 100,
                            backgroundColor: "#FFFF00",
                            backgroundOpacity: 0,
                            edgeStyle: "depressed", //  none, dropshadow, raised, depressed, uniform
                            windowColor: "#000000",
                            windowOpacity: 0
                        },
                        plugins: {
                            "http://static.hayhaytv.vn/jwplayer/swf/at-plugin.v1.2.0.swf": {
                                userid: '-1',
                                ads_pause_url: adsXMLURL + '&ip=' + ipAdress,
                                info_url: infoXMLUrl,
                                notify_cc_url: "",
                                bgimage: imageSrc
                            }
                        },
                        autostart: true,
                        width: '100%',//defaultObj.playerWidth,
                        height: 'auto',//defaultObj.playerHeight,
                        aspectratio: '16:9',
                        stretching: "uniform",
                        events: {
                            onPause: function (e) {
                                var myPosition = Math.floor(jwplayer(player_id).getPosition());
                                if ((e.oldstate == "BUFFERING" || e.oldstate == "PLAYING") && e.newstate == "PAUSED" && myPosition > 60) {
                                    _this.set_cookie("resume" + ep_code, myPosition, 4);
                                }
                            },
                            onPlay: function (e) {
                                if (e.newstate == 'PLAYING') {
                                    if (!is_trailer) {
                                        if (isResumed == false) {
                                            var resume_position = _this.get_cookie("resume" + ep_code);
                                            if (resume_position > 0) {
                                                jwplayer(player_id).seek(Math.floor(resume_position));
                                            }
                                            isResumed = true;
                                        }
                                    }
                                }
                            },
                            onTime: function (e) {
                                if (e.position > 60 && (e.position % 5).toFixed(1).toString() <= '0.5') {
                                    _this.set_cookie("resume" + ep_code, e.position, 4);
                                }
                            },
                            onError: function (mes) {
                                var new_line = '\n\r--------------------------------------------------\n\r';
                                if (confirm(mes.message + new_line + _this.host.location + ':' + _this.host.ip + new_line + 'Nhấn OK để reload!')) {
                                    jwplayer(_this.player_id).remove();
                                    _this.play_film(is_trailer);
                                }
                                else {
                                    jwplayer(_this.player_id).remove();
                                    _this.show_play_film = false;
                                    $scope.$apply();
                                }
                                console.log('Player Error: ', mes);
                            }
                        }
                    };
                    jwplayer(player_id).setup(jwplayerSetup);
                }
            });
        };

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

        _this.open_config_pop = function (size) {
            var modalInstance = $modal.open({
                templateUrl: '/gm_script/resource/view/view/config_pop.html',
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
                //console.log('dismiss');
            });
        };

    }]);
}).call();