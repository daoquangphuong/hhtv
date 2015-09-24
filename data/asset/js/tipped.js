/*!
 * Tipped - The jQuery Tooltip - v3.2.0.1
 * (c) 2010-2014 Nick Stakenburg
 *
 * http://projects.nickstakenburg.com/tipped
 *
 * License: http://projects.nickstakenburg.com/tipped/license
 */
;
var Tipped = {version: '3.2.0.1'};

Tipped.Skins = {
    // base skin, don't modify! (create custom skins in a separate file)
    'base': {
        afterUpdate: false,
        ajax: {
            cache: true,
            type: 'get'
        },
        background: {
            color: '#f2f2f2',
            opacity: 1
        },
        border: {
            size: 1,
            color: '#000',
            opacity: 1
        },
        closeButtonSkin: 'default',
        containment: {
            selector: 'viewport'
        },
        fadeIn: 180,
        fadeOut: 220,
        showDelay: 75,
        hideDelay: 25,
        radius: {
            size: 5,
            position: 'background'
        },
        hideAfter: false,
        hideOn: {
            element: 'self',
            event: 'mouseleave'
        },
        hideOthers: false,
        hook: 'topleft',
        inline: false,
        offset: {x: 0, y: 0},
        onHide: false,
        onShow: false,
        shadow: {
            blur: 2,
            color: '#000',
            offset: {x: 0, y: 0},
            opacity: .12
        },
        showOn: 'mousemove',
        spinner: true,
        stem: {
            height: 9,
            width: 18,
            offset: {x: 9, y: 9},
            spacing: 2
        },
        target: 'self'
    },

    // Every other skin inherits from this one
    'reset': {
        ajax: false,
        closeButton: false,
        hideOn: [{
            element: 'self',
            event: 'mouseleave'
        }, {
            element: 'tooltip',
            event: 'mouseleave'
        }],
        hook: 'topmiddle',
        stem: true
    },

    'dark': {
        background: {color: '#282828'},
        border: {color: '#9b9b9b', opacity: .4, size: 1},
        shadow: {opacity: .02},
        spinner: {color: '#fff'}
    },

    'light': {
        background: {color: '#fff'},
        border: {color: '#646464', opacity: .4, size: 1},
        shadow: {opacity: .04}
    },

    'gray': {
        background: {
            color: [
                {position: 0, color: '#8f8f8f'},
                {position: 1, color: '#808080'}
            ]
        },
        border: {color: '#131313', size: 1, opacity: .6}
    },

    'tiny': {
        background: {color: '#161616'},
        border: {color: '#969696', opacity: .35, size: 1},
        fadeIn: 0,
        fadeOut: 0,
        radius: 4,
        stem: {
            width: 11,
            height: 6,
            offset: {x: 6, y: 6}
        },
        shadow: false,
        spinner: {color: '#fff'}
    },

    'yellow': {
        background: '#ffffaa',
        border: {size: 1, color: '#6d5208', opacity: .4}
    },

    'red': {
        background: {
            color: [
                {position: 0, color: '#e13c37'},
                {position: 1, color: '#e13c37'}
            ]
        },
        border: {size: 1, color: '#150201', opacity: .6},
        spinner: {color: '#fff'}
    },

    'green': {
        background: {
            color: [
                {position: 0, color: '#4bb638'},
                {position: 1, color: '#4aab3a'}
            ]
        },
        border: {size: 1, color: '#122703', opacity: .6},
        spinner: {color: '#fff'}
    },

    'blue': {
        background: {
            color: [
                {position: 0, color: '#4588c8'},
                {position: 1, color: '#3d7cb9'}
            ]
        },
        border: {color: '#020b17', opacity: .6},
        spinner: {color: '#fff'}
    }
};


/* black and white are dark and light without radius */
(function ($) {
    $.extend(Tipped.Skins, {
        black: $.extend(true, {}, Tipped.Skins.dark, {radius: 0}),
        white: $.extend(true, {}, Tipped.Skins.light, {radius: 0})
    });
})(jQuery);

Tipped.Skins.CloseButtons = {
    'base': {
        diameter: 17,
        border: 2,
        x: {diameter: 10, size: 2, opacity: 1},
        states: {
            'default': {
                background: {
                    color: [
                        {position: 0, color: '#1a1a1a'},
                        {position: 0.46, color: '#171717'},
                        {position: 0.53, color: '#121212'},
                        {position: 0.54, color: '#101010'},
                        {position: 1, color: '#000'}
                    ],
                    opacity: 1
                },
                x: {color: '#fafafa', opacity: 1},
                border: {color: '#fff', opacity: 1}
            },
            'hover': {
                background: {
                    color: '#333',
                    opacity: 1
                },
                x: {color: '#e6e6e6', opacity: 1},
                border: {color: '#fff', opacity: 1}
            }
        },
        shadow: {
            blur: 1,
            color: '#000',
            offset: {x: 0, y: 0},
            opacity: .5
        }
    },

    'reset': {},

    'default': {},

    'light': {
        diameter: 17,
        border: 2,
        x: {diameter: 10, size: 2, opacity: 1},
        states: {
            'default': {
                background: {
                    color: [
                        {position: 0, color: '#797979'},
                        {position: 0.48, color: '#717171'},
                        {position: 0.52, color: '#666'},
                        {position: 1, color: '#666'}
                    ],
                    opacity: 1
                },
                x: {color: '#fff', opacity: .95},
                border: {color: '#676767', opacity: 1}
            },
            'hover': {
                background: {
                    color: [
                        {position: 0, color: '#868686'},
                        {position: 0.48, color: '#7f7f7f'},
                        {position: 0.52, color: '#757575'},
                        {position: 1, color: '#757575'}
                    ],
                    opacity: 1
                },
                x: {color: '#fff', opacity: 1},
                border: {color: '#767676', opacity: 1}
            }
        }
    }
};

!function (a) {
    function c(a, b) {
        var c = [a, b];
        return c.left = a, c.top = b, c
    }

    function f(a) {
        window.console && console[console.warn ? "warn" : "log"](a)
    }

    function j(a) {
        this.element = a
    }

    function k(a) {
        var b = {};
        for (var c in a)b[c] = a[c] + "px";
        return b
    }

    function l(a, b) {
        return Math.sqrt(a * a + b * b)
    }

    function m(a) {
        return 180 * a / Math.PI
    }

    function n(a) {
        return a * Math.PI / 180
    }

    function o(a) {
        return 1 / Math.cos(a)
    }

    function v(b) {
        if (b) {
            this.element = b, u.remove(b);
            var c = this.getTooltip();
            this.options = a.extend({}, c.options), this._globalAlpha = 1, this._cache = {}, this.uid = a(b).data("tipped-uid"), u.add(this), this._hookPosition = this.options.hook.tooltip, this._stemPosition = this.options.stem && this._hookPosition, this._stemCorrection = {
                x: 0,
                y: 0
            }, this._adjustment = {top: 0, left: 0}, this.build()
        }
    }

    function x(b, c) {
        this.element = b, this.element && c && (this.options = a.extend({
            blur: 3,
            offset: {x: 0, y: 0},
            color: "#000",
            opacity: .5,
            globalAlpha: 1
        }, arguments[2] || {}), this._globalAlpha = this.options.globalAlpha, this._cache = {}, this.uid = a(b).data("tipped-uid"), w.add(this), this.build())
    }

    function z(b) {
        this.element = b, this.element && (this.options = a.extend({
            blur: 5,
            offset: {x: 0, y: 0},
            color: "#000",
            opacity: .5,
            globalAlpha: 1
        }, arguments[1] || {}), this._globalAlpha = this.options.globalAlpha, this.uid = a(b).data("tipped-uid"), y.add(this), this.build())
    }

    function A(b, c) {
        for (var d in c)c[d] && c[d].constructor && c[d].constructor === Object ? (b[d] = a.extend({}, b[d]) || {}, A(b[d], c[d])) : b[d] = c[d];
        return b
    }

    function C(b, c) {
        if (this.element = b, this.element) {
            var e = a(b).data("tipped-uid");
            e && B.remove(b), e = h(), a(b).data("tipped-uid", e), this.uid = e;
            var f;
            "object" != a.type(c) || d.isElement(c) ? f = arguments[2] || {} : (f = c, c = null), this.options = B.createOptions(f);
            var g = b.getAttribute("title");
            if (!c) {
                var i = b.getAttribute("data-tipped");
                i ? c = i : g && (c = g)
            }
            g && (a(b).data("tipped_restore_title", g), b.setAttribute("title", "")), this.content = c, this.zIndex = this.options.zIndex || +B.options.startingZIndex, this._cache = {
                contentDimensions: {
                    width: 1,
                    height: 1
                },
                events: [],
                timers: [],
                states: {
                    active: !1,
                    xhr: !1,
                    visible: !1,
                    updated: !1,
                    build: !1,
                    skinned: !1,
                    toggles: !1,
                    preloading_images: !1
                },
                fnCallContent: ""
            };
            var j = this.options.target;
            this.target = "mouse" == j ? "mouse" : "self" != j && j ? d.isElement(j) ? j : j && document.getElementById(j) || this.element : this.element, this._preBuild(), B.add(this)
        }
    }

    var b = Array.prototype.slice, d = {
        wrap: function (c, d) {
            var e = c;
            return function () {
                var c = [a.proxy(e, this)].concat(b.call(arguments));
                return d.apply(this, c)
            }
        }, isElement: function (a) {
            return a && 1 == a.nodeType
        }, delay: function (a, c) {
            var d = b.call(arguments, 2);
            return setTimeout(function () {
                return a.apply(a, d)
            }, c)
        }, defer: function (a) {
            return d.delay.apply(this, [a, 1].concat(b.call(arguments, 1)))
        }, pointer: function (a) {
            return {x: a.pageX, y: a.pageY}
        }, element: {
            cumulativeScrollOffset: function (a) {
                var b = 0, d = 0;
                do b += a.scrollTop || 0, d += a.scrollLeft || 0, a = a.parentNode; while (a);
                return c(d, b)
            }, cumulativeOffset: function (b) {
                var e = a(b).offset(), f = d.element.cumulativeScrollOffset(b), g = {
                    top: a(window).scrollTop(),
                    left: a(window).scrollLeft()
                };
                return e.left += f.left - g.left, e.top += f.top - g.top, c(e.left, e.top)
            }, isAttached: function () {
                function a(a) {
                    for (var b = a; b && b.parentNode;)b = b.parentNode;
                    return b
                }

                return function (b) {
                    var c = a(b);
                    return !(!c || !c.body)
                }
            }()
        }
    }, e = function (a) {
        function b(b) {
            var c = new RegExp(b + "([\\d.]+)").exec(a);
            return c ? parseFloat(c[1]) : !0
        }

        return {
            IE: !(!window.attachEvent || -1 !== a.indexOf("Opera")) && b("MSIE "),
            Opera: a.indexOf("Opera") > -1 && (!!window.opera && opera.version && parseFloat(opera.version()) || 7.55),
            WebKit: a.indexOf("AppleWebKit/") > -1 && b("AppleWebKit/"),
            Gecko: a.indexOf("Gecko") > -1 && -1 === a.indexOf("KHTML") && b("rv:"),
            MobileSafari: !!a.match(/Apple.*Mobile.*Safari/),
            Chrome: a.indexOf("Chrome") > -1 && b("Chrome/")
        }
    }(navigator.userAgent), g = {
        scripts: {jQuery: {required: "1.4.4", available: window.jQuery && jQuery.fn.jquery}},
        check: function () {
            function b(b) {
                for (var c = b.match(a), d = c && c[1] && c[1].split(".") || [], e = 0, f = 0, g = d.length; g > f; f++)e += parseInt(d[f] * Math.pow(10, 6 - 2 * f));
                return c && c[3] ? e - 1 : e
            }

            var a = /^(\d+(\.?\d+){0,3})([A-Za-z_-]+[A-Za-z0-9]+)?/;
            return function (a) {
                this.scripts[a].checked || (this.scripts[a].checked = !0, (!this.scripts[a].available || b(this.scripts[a].available) < b(this.scripts[a].required) && !this.scripts[a].notified) && (this.scripts[a].notified = !0, f("Tipped requires " + a + " >= " + this.scripts[a].required)))
            }
        }()
    }, h = function () {
        var a = 0, b = "_t_uid_";
        return function (c) {
            for (c = c || b, a++; document.getElementById(c + a);)a++;
            return c + a
        }
    }(), i = function () {
        var b = [];
        return {
            get: function (c) {
                for (var d = null, e = 0; e < b.length; e++)b[e] && b[e].url == c.url && b[e].type.toUpperCase() == c.type.toUpperCase() && a.param(b[e].data || {}) == a.param(c.data || {}) && (d = b[e].responseText);
                return d
            }, set: function (c, d) {
                this.remove(c.url), b.push(a.extend({}, c, {responseText: d}))
            }, remove: function (a) {
                for (var c = 0; c < b.length; c++)b[c] && b[c].url == a && delete b[c]
            }, clear: function () {
                b = []
            }
        }
    }();
    a.extend(Tipped, function () {
        return {
            support: {
                canvas: function () {
                    var a = document.createElement("canvas");
                    return !(!a.getContext || !a.getContext("2d"))
                }(), touch: function () {
                    try {
                        return !!("ontouchstart"in window || window.DocumentTouch && document instanceof DocumentTouch)
                    } catch (a) {
                        return !1
                    }
                }(), cssTransitions: function () {
                    var b = ["WebKitTransitionEvent", "TransitionEvent", "OTransitionEvent"], c = !!window.TransitionEvent;
                    return a.each(b, function (a, b) {
                        try {
                            document.createEvent(b), c = !0
                        } catch (d) {
                        }
                    }), c
                }()
            }, init: function () {
                (this.support.canvas || e.IE) && (g.check("jQuery"), B.UpdateQueue.container && (a(B.UpdateQueue.container).remove(), B.UpdateQueue.container = null), a(document).ready(function () {
                    B.removeAll(), B.startDelegating()
                }))
            }, create: function (a, b, c) {
                return j.create(a, b, c), this.get(a)
            }, get: function (a) {
                return new j(a)
            }, findElement: function (a) {
                return B.findElement(a)
            }, show: function (a) {
                return this.get(a).show(), this
            }, hide: function (a) {
                return this.get(a).hide(), this
            }, toggle: function (a) {
                return this.get(a).toggle(), this
            }, refresh: function (a) {
                return this.get(a).refresh(), this
            }, remove: function (a) {
                return this.get(a).remove(), this
            }, hideAll: function () {
                return B.hideAll(), this
            }, setDefaultSkin: function (a) {
                return B.setDefaultSkin(a), this
            }, setStartingZIndex: function (a) {
                return B.setStartingZIndex(a), this
            }, visible: function (b) {
                if (d.isElement(b))return B.isVisibleByElement(b);
                if ("undefined" != a.type(b)) {
                    var c = a(b), e = 0;
                    return a.each(c, function (a, b) {
                        B.isVisibleByElement(b) && e++
                    }), e
                }
                return B.getVisible().length
            }, clearAjaxCache: function () {
                return B.clearAjaxCache(), this
            }
        }
    }()), a.extend(j, {
        create: function (b, c) {
            if (b) {
                var e = arguments[2] || {}, f = [];
                return B.removeDetached(), d.isElement(b) ? f.push(new C(b, c, e)) : a(b).each(function (a, b) {
                    f.push(new C(b, c, e))
                }), f
            }
        }
    }), a.extend(j.prototype, {
        items: function () {
            return B.Position.mouseBuffer = {x: 0, y: 0}, B.get(this.element)
        }, show: function () {
            return a.each(this.items(), function (a, b) {
                b.show()
            }), this
        }, hide: function () {
            return a.each(this.items(), function (a, b) {
                b.hide()
            }), this
        }, toggle: function () {
            return a.each(this.items(), function (a, b) {
                b.toggle()
            }), this
        }, refresh: function () {
            return a.each(this.items(), function (a, b) {
                b.refresh()
            }), this
        }, remove: function () {
            return B.remove(this.element), this
        }
    });
    var p = {
        viewport: function () {
            var b;
            return b = e.MobileSafari ? {
                width: window.innerWidth,
                height: window.innerHeight
            } : {height: a(window).height(), width: a(window).width()}
        }
    }, q = {
        devicePixelRatio: Math.ceil(Math.min(window.devicePixelRatio ? parseFloat(window.devicePixelRatio) || 1 : 1, 2)),
        init: function () {
            function a(a) {
                var b = a.getContext("2d");
                b.scale(q.devicePixelRatio, q.devicePixelRatio)
            }

            return window.G_vmlCanvasManager && !Tipped.support.canvas && e.IE ? function (b) {
                G_vmlCanvasManager.initElement(b), a(b)
            } : function (b) {
                a(b)
            }
        }(),
        resize: function (b, c) {
            a(b).attr({width: c.width * this.devicePixelRatio, height: c.height * this.devicePixelRatio}).css(k(c))
        },
        drawRoundedRectangle: function (b) {
            var c = a.extend({
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                radius: 0
            }, arguments[1] || {}), d = c, e = d.left, f = d.top, g = d.width, h = d.height, i = d.radius;
            return i ? (b.beginPath(), b.moveTo(e + i, f), b.arc(e + g - i, f + i, i, n(-90), n(0), !1), b.arc(e + g - i, f + h - i, i, n(0), n(90), !1), b.arc(e + i, f + h - i, i, n(90), n(180), !1), b.arc(e + i, f + i, i, n(-180), n(-90), !1), b.closePath(), b.fill(), void 0) : (b.fillRect(e, f, g, h), void 0)
        },
        drawPixelArray: function (b, c) {
            for (var d = a.extend({
                x: 0,
                y: 0,
                color: "#000"
            }, arguments[2] || {}), e = 0, f = c.length; f > e; e++)for (var g = 0, h = c[e].length; h > g; g++) {
                var i = parseInt(c[e].charAt(g)) * (1 / 9);
                b.fillStyle = t.hex2fill(d.color, i), i && b.fillRect(d.x + g, d.y + e, 1, 1)
            }
        },
        createFillStyle: function (b, c) {
            var d;
            if ("string" == a.type(c))d = t.hex2fill(c); else if ("string" == a.type(c.color))d = t.hex2fill(c.color, "number" == a.type(c.opacity) ? c.opacity : 1); else if (a.isArray(c.color)) {
                var e = a.extend({x1: 0, y1: 0, x2: 0, y2: 0}, arguments[2] || {});
                d = q.Gradient.addColorStops(b.createLinearGradient(e.x1, e.y1, e.x2, e.y2), c.color, c.opacity)
            }
            return d
        }
    };
    q.Gradient = {
        addColorStops: function (b, c) {
            for (var d = "number" == a.type(arguments[2]) ? arguments[2] : 1, e = 0, f = c.length; f > e; e++) {
                var g = c[e];
                ("undefined" == a.type(g.opacity) || "number" != a.type(g.opacity)) && (g.opacity = 1), b.addColorStop(g.position, t.hex2fill(g.color, g.opacity * d))
            }
            return b
        }
    };
    var r = {
        positions: ["topleft", "topmiddle", "topright", "righttop", "rightmiddle", "rightbottom", "bottomright", "bottommiddle", "bottomleft", "leftbottom", "leftmiddle", "lefttop"],
        regex: {
            toOrientation: /^(top|left|bottom|right)(top|left|bottom|right|middle|center)$/,
            horizontal: /^(top|bottom)/,
            isCenter: /(middle|center)/,
            side: /^(top|bottom|left|right)/
        },
        toDimension: function () {
            var a = {top: "height", left: "width", bottom: "height", right: "width"};
            return function (b) {
                return a[b]
            }
        }(),
        isCenter: function (a) {
            return !!a.toLowerCase().match(this.regex.isCenter)
        },
        isCorner: function (a) {
            return !this.isCenter(a)
        },
        getOrientation: function (a) {
            return a.toLowerCase().match(this.regex.horizontal) ? "horizontal" : "vertical"
        },
        getSide: function (a) {
            var b = null, c = a.toLowerCase().match(this.regex.side);
            return c && c[1] && (b = c[1]), b
        },
        split: function (a) {
            return a.toLowerCase().match(this.regex.toOrientation)
        }
    }, s = {
        getDimensions: function (a) {
            var b = a.options.stem;
            return {width: b.width, height: b.height}
        }, getBorderDimensions: function (b, c) {
            var d = a.extend({math: "ceil"}, arguments[2] || {}), e = b.options.stem, f = e.width, g = e.height, h = this.getCenterBorderDimensions(f, g, c);
            return d.math && (h.width = Math[d.math](h.width), h.height = Math[d.math](h.height)), {
                width: h.width,
                height: h.height
            }
        }, getCenterBorderDimensions: function (a, b, c) {
            var d = m(Math.atan(.5 * (b / a))), e = 180 - d, f = Math.cos(n(e - 90)) * c, g = a + 2 * f, h = g * b / a;
            return {width: g, height: h}
        }, getLayout: function (a, b) {
            var c = this.getBorderDimensions(a, b), d = this.getDimensions(a), f = (r.isCenter(a._hookPosition), Math.ceil(c.height + b));
            return a.options.stem.offset || 0, a.options.radius && a.options.radius.size || 0, {
                box: {
                    dimensions: {
                        width: Math.ceil(c.width),
                        height: Math.ceil(f)
                    }
                }, border: {dimensions: c}, stem: {dimensions: {width: d.width, height: d.height}}
            }
        }, getBubbleLayout: function (b, c, d) {
            var f = b.options, g = {top: 0, left: 0}, h = {
                top: 0,
                left: 0
            }, i = a.extend({}, c), j = b.border, k = k || this.getLayout(b, b.border), l = k.box.dimensions;
            d && (l.height = d, j = 0);
            var m = r.split(b._hookPosition), n = r.getOrientation(b._hookPosition);
            if (b.options.stem) {
                var o = r.getSide(b._hookPosition);
                if ("top" == o ? g.top = l.height - j : "left" == o && (g.left = l.height - j), "horizontal" == n) {
                    switch (m[2]) {
                        case"middle":
                        case"center":
                            h.left = .5 * i.width;
                            break;
                        case"right":
                            h.left = i.width
                    }
                    "bottom" == m[1] && (h.top = i.height - j + l.height)
                } else {
                    switch (m[2]) {
                        case"middle":
                        case"center":
                            h.top = .5 * i.height;
                            break;
                        case"bottom":
                            h.top = i.height
                    }
                    "right" == m[1] && (h.left = i.width - j + l.height)
                }
                i[r.toDimension(o)] += l.height - j
            } else if ("horizontal" == n) {
                switch (m[2]) {
                    case"middle":
                    case"center":
                        h.left = .5 * i.width;
                        break;
                    case"right":
                        h.left = i.width
                }
                "bottom" == m[1] && (h.top = i.height)
            } else {
                switch (m[2]) {
                    case"middle":
                    case"center":
                        h.top = .5 * i.height;
                        break;
                    case"bottom":
                        h.top = i.height
                }
                "right" == m[1] && (h.left = i.width)
            }
            var p = f.radius && f.radius.size || 0, q = f.border && f.border.size || 0;
            if (b.options.stem) {
                var t = p && "background" == f.radius.position ? p : 0, u = p && "border" == f.radius.position ? p : p + q, v = q + t + .5 * k.stem.dimensions.width - .5 * k.border.dimensions.width, w = u > v ? u - v : 0, x = Math.ceil(q + t + .5 * k.stem.dimensions.width + w);
                if ("horizontal" == n)switch (m[2]) {
                    case"left":
                        h.left += x;
                        break;
                    case"right":
                        h.left -= x
                } else switch (m[2]) {
                    case"top":
                        h.top += x;
                        break;
                    case"bottom":
                        h.top -= x
                }
            }
            var y;
            if (f.stem && (y = f.stem.offset)) {
                var z = s.nullifyCornerOffset(y, b._stemPosition, c, k.border.dimensions, q, p);
                if (y = z.offset, z.correction, "horizontal" == n)switch (m[2]) {
                    case"left":
                        h.left += y.x;
                        break;
                    case"right":
                        h.left -= y.x
                } else switch (m[2]) {
                    case"top":
                        h.top += y.y;
                        break;
                    case"bottom":
                        h.top -= y.y
                }
            }
            var B;
            if (f.stem && (B = f.stem.spacing))if ("horizontal" == n)switch (m[1]) {
                case"top":
                    h.top -= B;
                    break;
                case"bottom":
                    h.top += B
            } else switch (m[1]) {
                case"left":
                    h.left -= B;
                    break;
                case"right":
                    h.left += B
            }
            return {
                dimensions: i,
                position: {top: 0, left: 0},
                background: {position: g, dimensions: c},
                stem: {dimensions: l},
                anchor: h
            }
        }, nullifyCornerOffset: function (b, c, d, e, f, g) {
            var h = r.getOrientation(c), i = a.extend({}, b), j = {x: 0, y: 0}, k = 0;
            return "horizontal" == h && (k = d.width - e.width - 2 * f - 2 * g) < 2 * b.x && (j.x = i.x, /(right)$/.test(c) && (j.x *= -1), i.x = 0), "vertical" == h && (k = d.height - e.height - 2 * f - 2 * g) < 2 * b.y && (j.y = i.y, /(bottom)$/.test(c) && (j.y *= -1), i.y = 0), {
                offset: i,
                correction: j
            }
        }
    }, t = function () {
        function d(a) {
            var b = a;
            return b.red = a[0], b.green = a[1], b.blue = a[2], b
        }

        function e(a) {
            return parseInt(a, 16)
        }

        function f(a) {
            var b = new Array(3);
            if (0 == a.indexOf("#") && (a = a.substring(1)), a = a.toLowerCase(), "" != a.replace(c, ""))return null;
            3 == a.length ? (b[0] = a.charAt(0) + a.charAt(0), b[1] = a.charAt(1) + a.charAt(1), b[2] = a.charAt(2) + a.charAt(2)) : (b[0] = a.substring(0, 2), b[1] = a.substring(2, 4), b[2] = a.substring(4));
            for (var f = 0; f < b.length; f++)b[f] = e(b[f]);
            return d(b)
        }

        function g(a, b) {
            var c = f(a);
            return c[3] = b, c.opacity = b, c
        }

        function h(b, c) {
            return "undefined" == a.type(c) && (c = 1), "rgba(" + g(b, c).join() + ")"
        }

        function i(a) {
            return "#" + (j(a)[2] > 50 ? "000" : "fff")
        }

        function j(a) {
            return k(f(a))
        }

        function k(a) {
            var f, g, h, a = d(a), b = a.red, c = a.green, e = a.blue, i = b > c ? b : c;
            e > i && (i = e);
            var j = c > b ? b : c;
            if (j > e && (j = e), h = i / 255, g = 0 != i ? (i - j) / i : 0, 0 == g)f = 0; else {
                var k = (i - b) / (i - j), l = (i - c) / (i - j), m = (i - e) / (i - j);
                f = b == i ? m - l : c == i ? 2 + k - m : 4 + l - k, f /= 6, 0 > f && (f += 1)
            }
            f = Math.round(360 * f), g = Math.round(100 * g), h = Math.round(100 * h);
            var n = [];
            return n[0] = f, n[1] = g, n[2] = h, n.hue = f, n.saturation = g, n.brightness = h, n
        }

        var b = "0123456789abcdef", c = new RegExp("[" + b + "]", "g");
        return {hex2rgb: f, hex2fill: h, getSaturatedBW: i}
    }(), u = {
        skins: {}, get: function (b) {
            if (!b)return null;
            var c = null, d = a(b).data("tipped-uid");
            return d && (c = this.skins[d]), c
        }, add: function (a) {
            this.skins[a.uid] = a
        }, remove: function (a) {
            var b = this.get(a);
            b && (delete this.skins[b.uid], b.remove())
        }
    };
    a.extend(v.prototype, function () {
        function b() {
            this._cache.hook = {};
            var b = this._hookPosition;
            a.each(r.positions, a.proxy(function (b, c) {
                var d, e = this._cache.hook[c] = {};
                this._hookPosition = c;
                var f = this.getOrderLayout();
                d = f, e.anchor = d.anchor;
                var g = d.bubble.dimensions, h = {top: d.bubble.position.top, left: d.bubble.position.left};
                if (e.bubble = {dimensions: g, position: h}, e.tooltip = {dimensions: d.skin.dimensions}, this.shadow) {
                    var i = this.shadow.getOrderLayout(), j = i.skin.position, k = e.bubble.position;
                    a.extend(!0, e, {
                        anchor: i.anchor,
                        bubble: {position: {top: k.top + j.top, left: k.left + j.left}},
                        tooltip: {dimensions: i.tooltip.dimensions}
                    })
                }
            }, this)), this._hookPosition = b
        }

        function c() {
            this.cleanup(), this.options.shadow && (w.remove(this.element), this.options.closeButton && this.options.closeButton.shadow && y.remove(this.element)), this.iframeShim && (this.iframeShim.remove(), this.iframeShim = null), this.container && (a(this.container).remove(), this.container = null)
        }

        function d() {
            this.bubble && (this.closeButton && (a(this.closeButton).remove(), this.closeButton = null, this.defaultCloseButton = null, this.hoverCloseButton = null), a(this.bubble).remove(), this.stem = null, this.background = null, this.bubble = null, this._cache = {})
        }

        function f() {
            var a = this.getTooltip();
            this.contentDimensions = a._cache.contentDimensions;
            var b = a.options;
            this.radius = b.radius && b.radius.size || 0, this.border = b.border && b.border.size || 0, this.padding = b.padding;
            var c = Math.min(this.contentDimensions.height, this.contentDimensions.width);
            this.radius > c / 2 && (this.radius = Math.floor(c / 2)), "border" == this.options.radius.position && this.radius > this.border && (this.border = this.radius), this._cache = {
                options: {
                    radius: this.radius,
                    border: this.border,
                    padding: this.padding
                }
            }
        }

        function g() {
            this.cleanup(), window.G_vmlCanvasManager && window.G_vmlCanvasManager.init_(document);
            var b = this.getTooltip(), c = this.options;
            this.bubble = a("<div>").addClass("t_Bubble")[0], a(b.skinElement).append(this.bubble), this.prepare(), this.drawBubble(b), c.closeButton && (this.drawCloseButton(b), c.closeButton.shadow && (this.closeButtonShadow ? (this.closeButtonShadow.options = c.closeButton.shadow, this.closeButtonShadow.build()) : this.closeButtonShadow = new z(this.element, a.extend({globalAlpha: this._globalAlpha}, c.closeButton.shadow)))), e.IE && e.IE < 7 && a(b.container).prepend(this.iframeShim = a("<iframe>").addClass("t_iframeShim").attr({
                frameBorder: 0,
                src: "javascript:'';"
            })), this.order(), c.shadow && (this.shadow ? (this.shadow.options = c.shadow, this.shadow.build()) : this.shadow = new x(this.element, this, a.extend({globalAlpha: this._globalAlpha}, c.shadow))), this.createHookCache()
        }

        function h() {
            var b = this.getTooltip(), c = a(b.container), d = a(b.container).find(".t_ContentContainer").first()[0];
            if (d) {
                a(d).css({width: "auto", height: "auto"});
                var e = parseInt(c.css("top")), f = parseInt(c.css("left")), g = parseInt(c.css("width"));
                c.css({
                    left: "-25000px",
                    top: "-25000px",
                    width: "15000px",
                    height: "auto"
                }), b.getState("visible") || a(b.container).show();
                var h = B.UpdateQueue.getMeasureElementDimensions(d);
                b.options.maxWidth && "number" == a.type(b.options.maxWidth) && h.width > b.options.maxWidth && (a(d).css({width: b.options.maxWidth + "px"}), h = B.UpdateQueue.getMeasureElementDimensions(d)), b.getState("visible") || a(b.container).hide(), b._cache.contentDimensions = h, c.css({
                    left: f + "px",
                    top: e + "px",
                    width: g + "px"
                }), this.build()
            }
        }

        function i(a, b, c) {
            var d = !1;
            this.setHookPosition(a) && (d = !0), this.setStemCorrection(b) && (d = !0), c && this.setAdjustment(c) && (d = !0), d && this.build()
        }

        function j(a) {
            var b = !1;
            return (this._adjustment.left != a.left || this._adjustment.top != a.top) && (b = !0, this._adjustment = a), b
        }

        function l(a) {
            var b = !1;
            return (this._stemCorrection.x != a.x || this._stemCorrection.y != a.y) && (b = !0, this._stemCorrection = a), b
        }

        function m(a) {
            var c = !1;
            return this._hookPosition != a && (c = !0, this._hookPosition = a), c
        }

        function o() {
            return B.get(this.element)[0]
        }

        function p() {
            return s.getLayout(this, this.border)
        }

        function u() {
            var b = this.getTooltip().options.closeButton, c = b.diameter + 2 * b.border;
            a(this.defaultCloseButton).css({left: -1 * c + "px"}), a(this.hoverCloseButton).css({left: 0})
        }

        function v() {
            var b = this.getTooltip().options.closeButton, c = b.diameter + 2 * b.border;
            a(this.defaultCloseButton).css({left: 0}), a(this.hoverCloseButton).css({left: c + "px"})
        }

        function A(b) {
            var c = b.options.closeButton, d = {width: c.diameter + 2 * c.border, height: c.diameter + 2 * c.border};
            a(b.container).append(a(this.closeButton = document.createElement("div")).addClass("t_Close").css(k(d)).append(a(this.closeButtonShift = document.createElement("div")).addClass("t_CloseButtonShift").css(k(d)))), this.drawCloseButtonState(b, "default"), this.drawCloseButtonState(b, "hover"), Tipped.support.touch || e.Chrome || a(this.closeButton).bind("mouseenter", a.proxy(this.closeButtonMouseover, this)).bind("mouseleave", a.proxy(this.closeButtonMouseout, this))
        }

        function C(b, c) {
            var d = b.options.closeButton, e = d.diameter, f = d.border || 0, g = d.x.diameter, h = d.x.size, j = (d.x.lineCap, d.states[c || "default"]), l = {
                width: e + 2 * f,
                height: e + 2 * f
            };
            g >= e && (g = e - 2);
            var m;
            a(this.closeButtonShift).append(a(this[c + "CloseButton"] = document.createElement("div")).addClass("t_CloseState").css(a.extend(k(l), {left: ("hover" == c ? l.width : 0) + "px"}))), a(document.body).append(a(m = document.createElement("canvas"))), q.resize(m, l), q.init(m);
            var o = m.getContext("2d");
            o.globalAlpha = this._globalAlpha, a(this[c + "CloseButton"]).append(m), o.translate(l.width / 2, l.height / 2), o.fillStyle = q.createFillStyle(o, j.background, {
                x1: 0,
                y1: 0 - e / 2,
                x2: 0,
                y2: 0 + e / 2
            }), o.beginPath(), o.arc(0, 0, e / 2, 0, 2 * Math.PI, !0), o.closePath(), o.fill(), f && (o.fillStyle = q.createFillStyle(o, j.border, {
                x1: 0,
                y1: 0 - e / 2 - f,
                x2: 0,
                y2: 0 + e / 2 + f
            }), o.beginPath(), o.arc(0, 0, e / 2, Math.PI, 0, !1), o.lineTo((e + f) / 2, 0), o.arc(0, 0, e / 2 + f, 0, Math.PI, !0), o.arc(0, 0, e / 2 + f, Math.PI, 0, !0), o.lineTo(e / 2, 0), o.arc(0, 0, e / 2, 0, Math.PI, !1), o.closePath(), o.fill());
            var p = g / 2, r = h / 2;
            if (r > p) {
                var s = r;
                r = p, p = s
            }
            o.fillStyle = t.hex2fill(j.x.color || j.x, j.x.opacity || 1), o.rotate(n(45)), o.beginPath(), o.moveTo(0, 0), o.lineTo(0, p);
            for (var u = 0; 4 > u; u++)o.lineTo(0, p), o.lineTo(r, p), o.lineTo(r, p - (p - r)), o.lineTo(p, r), o.lineTo(p, 0), o.rotate(n(90));
            o.closePath(), o.fill()
        }

        function D(b) {
            var l, m, o, p, q, c = a.extend({
                stem: !1,
                hookPosition: null,
                stemCorrection: null,
                beginPath: !1,
                closePath: !1,
                layout: null,
                stemLayout: null,
                radius: 0,
                border: 0,
                borderRadius: 0,
                cornerOffset: {x: 0, y: 0}
            }, arguments[1] || {}), d = c.layout, e = c.stemLayout, f = c.cornerOffset, g = c.border, h = c.radius, i = c.hookPosition, j = d.background.position, k = d.background.dimensions, t = {
                x: Math.abs(this._stemCorrection.x),
                y: Math.abs(this._stemCorrection.y)
            }, u = {x: 0, y: 0}, v = {x: 0, y: 0};
            if (e) {
                l = e.stem.dimensions, m = e.box.position, o = e.box.dimensions, p = o.width - l.width;
                var w = c.borderRadius, x = g + h + .5 * l.width - .5 * e.border.dimensions.width;
                q = Math.ceil(w > x ? w - x : 0);
                var y = s.nullifyCornerOffset(f, i, k, e.border.dimensions, g, h);
                f = y.offset, v = y.correction, u = {
                    x: Math.max(k.width - 2 * Math.max(q, f.x || 0) - e.border.dimensions.width - (2 * h || 0), 0),
                    y: Math.max(k.height - 2 * Math.max(q, f.y || 0) - e.border.dimensions.height - (2 * h || 0), 0)
                }, r.isCenter(i) && (u.x *= .5, u.y *= .5), t.x = Math.min(t.x, u.x), t.y = Math.min(t.y, u.y), r.isCenter(i) && (this._stemCorrection.x < 0 && t.x > 0 && (t.x *= -1), this._stemCorrection.y < 0 && t.y > 0 && (t.y *= -1)), this._adjustment && this._adjustment.sides && a.each(this._adjustment.sides, function (b, c) {
                    a.each("top right bottom left".split(" "), function (a, b) {
                        c == b && new RegExp("(" + b + ")$").test(i) && (t[/^(left|right)$/.test(b) ? "x" : "y"] = 0)
                    })
                })
            }
            var z, A;
            if (h ? (z = j.left + g + h, A = j.top + g) : (z = j.left + g, A = j.top + g), f && f.x && /^(topleft|lefttop)$/.test(i) && (z += f.x), c.beginPath && b.beginPath(), b.moveTo(z, A), c.stem)switch (i) {
                case"topleft":
                    z = j.left + g, h && (z += h), z += Math.max(q, f.x || 0), z += t.x, b.lineTo(z, A), A -= l.height, z += .5 * l.width, b.lineTo(z, A), A += l.height, z += .5 * l.width, b.lineTo(z, A);
                    break;
                case"topmiddle":
                case"topcenter":
                    z = j.left + .5 * k.width - .5 * l.width, z += t.x, b.lineTo(z, A), A -= l.height, z += .5 * l.width, b.lineTo(z, A), A += l.height, z += .5 * l.width, b.lineTo(z, A), z = j.left + .5 * k.width - .5 * o.width, b.lineTo(z, A);
                    break;
                case"topright":
                    z = j.left + k.width - g - l.width, h && (z -= h), z -= Math.max(q, f.x || 0), z -= t.x, b.lineTo(z, A), A -= l.height, z += .5 * l.width, b.lineTo(z, A), A += l.height, z += .5 * l.width, b.lineTo(z, A)
            }
            if (h ? h && (b.arc(j.left + k.width - g - h, j.top + g + h, h, n(-90), n(0), !1), z = j.left + k.width - g, A = j.top + g + h) : (z = j.left + k.width - g, A = j.top + g, b.lineTo(z, A)), c.stem)switch (i) {
                case"righttop":
                    A = j.top + g, h && (A += h), A += Math.max(q, f.y || 0), A += t.y, b.lineTo(z, A), z += l.height, A += .5 * l.width, b.lineTo(z, A), z -= l.height, A += .5 * l.width, b.lineTo(z, A);
                    break;
                case"rightmiddle":
                case"rightcenter":
                    A = j.top + .5 * k.height - .5 * l.width, A += t.y, b.lineTo(z, A), z += l.height, A += .5 * l.width, b.lineTo(z, A), z -= l.height, A += .5 * l.width, b.lineTo(z, A);
                    break;
                case"rightbottom":
                    A = j.top + k.height - g, h && (A -= h), A -= l.width, A -= Math.max(q, f.y || 0), A -= t.y, b.lineTo(z, A), z += l.height, A += .5 * l.width, b.lineTo(z, A), z -= l.height, A += .5 * l.width, b.lineTo(z, A)
            }
            if (h ? h && (b.arc(j.left + k.width - g - h, j.top + k.height - g - h, h, n(0), n(90), !1), z = j.left + k.width - g - h, A = j.top + k.height - g) : (z = j.left + k.width - g, A = j.top + k.height - g, b.lineTo(z, A)), c.stem)switch (i) {
                case"bottomright":
                    z = j.left + k.width - g, h && (z -= h), z -= Math.max(q, f.x || 0), z -= t.x, b.lineTo(z, A), z -= .5 * l.width, A += l.height, b.lineTo(z, A), z -= .5 * l.width, A -= l.height, b.lineTo(z, A);
                    break;
                case"bottommiddle":
                case"bottomcenter":
                    z = j.left + .5 * k.width + .5 * l.width, z += t.x, b.lineTo(z, A), z -= .5 * l.width, A += l.height, b.lineTo(z, A), z -= .5 * l.width, A -= l.height, b.lineTo(z, A);
                    break;
                case"bottomleft":
                    z = j.left + g + l.width, h && (z += h), z += Math.max(q, f.x || 0), z += t.x, b.lineTo(z, A), z -= .5 * l.width, A += l.height, b.lineTo(z, A), z -= .5 * l.width, A -= l.height, b.lineTo(z, A)
            }
            if (h ? h && (b.arc(j.left + g + h, j.top + k.height - g - h, h, n(90), n(180), !1), z = j.left + g, A = j.top + k.height - g - h) : (z = j.left + g, A = j.top + k.height - g, b.lineTo(z, A)), c.stem)switch (i) {
                case"leftbottom":
                    A = j.top + k.height - g, h && (A -= h), A -= Math.max(q, f.y || 0), A -= t.y, b.lineTo(z, A), z -= l.height, A -= .5 * l.width, b.lineTo(z, A), z += l.height, A -= .5 * l.width, b.lineTo(z, A);
                    break;
                case"leftmiddle":
                case"leftcenter":
                    A = j.top + .5 * k.height + .5 * l.width, A += t.y, b.lineTo(z, A), z -= l.height, A -= .5 * l.width, b.lineTo(z, A), z += l.height, A -= .5 * l.width, b.lineTo(z, A);
                    break;
                case"lefttop":
                    A = j.top + g + l.width, h && (A += h), A += Math.max(q, f.y || 0), A += t.y, b.lineTo(z, A), z -= l.height, A -= .5 * l.width, b.lineTo(z, A), z += l.height, A -= .5 * l.width, b.lineTo(z, A)
            }
            return h ? h && (b.arc(j.left + g + h, j.top + g + h, h, n(-180), n(-90), !1), z = j.left + g + h, A = j.top + g, z += 1, b.lineTo(z, A)) : (z = j.left + g, A = j.top + g, b.lineTo(z, A)), c.closePath && b.closePath(), {
                x: z,
                y: A,
                stem: t,
                corner: v,
                cornerOffset: f
            }
        }

        function E(b) {
            var o, p, q, r, s, t, c = a.extend({
                stem: !1,
                hookPosition: null,
                beginPath: !1,
                closePath: !1,
                layout: null,
                stemLayout: null,
                radius: 0,
                border: 0,
                stemOffset: 0,
                cornerOffset: {x: 0, y: 0},
                corrections: null
            }, arguments[1] || {}), d = c.layout, e = c.stemLayout, g = (c.stemOffset, c.cornerOffset), h = c.border, i = c.radius && c.radius.size || 0, j = c.backgroundRadius, k = c.hookPosition, l = d.background.position, m = d.background.dimensions, u = c.corrections && c.corrections.stem || {
                    x: 0,
                    y: 0
                };
            if (e) {
                o = e.stem.dimensions, p = e.box.position, q = e.box.dimensions, r = e.border.dimensions, s = q.width - o.width;
                var v = h + j + .5 * o.width - .5 * r.width;
                t = Math.ceil(i > v ? i - v : 0)
            }
            var w = l.left + h + j, x = l.top + h;
            j && (w += 1), a.extend({}, {x: w, y: x}), c.beginPath && b.beginPath();
            var z = a.extend({}, {x: w, y: x});
            if (x -= h, b.lineTo(w, x), i ? i && (b.arc(l.left + i, l.top + i, i, n(-90), n(-180), !0), w = l.left, x = l.top + i) : (w = l.left, x = l.top, b.lineTo(w, x)), c.stem)switch (k) {
                case"lefttop":
                    x = l.top + h, j && (x += j), x -= .5 * r.width, x += .5 * o.width, x += Math.max(t, g.y || 0), x += u.y, b.lineTo(w, x), w -= r.height, x += .5 * r.width, b.lineTo(w, x), w += r.height, x += .5 * r.width, b.lineTo(w, x);
                    break;
                case"leftmiddle":
                case"leftcenter":
                    x = l.top + .5 * m.height - .5 * r.width, x += u.y, b.lineTo(w, x), w -= r.height, x += .5 * r.width, b.lineTo(w, x), w += r.height, x += .5 * r.width, b.lineTo(w, x);
                    break;
                case"leftbottom":
                    x = l.top + m.height - h - r.width, j && (x -= j), x += .5 * r.width, x -= .5 * o.width, x -= Math.max(t, g.y || 0), x -= u.y, b.lineTo(w, x), w -= r.height, x += .5 * r.width, b.lineTo(w, x), w += r.height, x += .5 * r.width, b.lineTo(w, x)
            }
            if (i ? i && (b.arc(l.left + i, l.top + m.height - i, i, n(-180), n(-270), !0), w = l.left + i, x = l.top + m.height) : (w = l.left, x = l.top + m.height, b.lineTo(w, x)), c.stem)switch (k) {
                case"bottomleft":
                    w = l.left + h, j && (w += j), w -= .5 * r.width, w += .5 * o.width, w += Math.max(t, g.x || 0), w += u.x, b.lineTo(w, x), x += r.height, w += .5 * r.width, b.lineTo(w, x), x -= r.height, w += .5 * r.width, b.lineTo(w, x);
                    break;
                case"bottommiddle":
                case"bottomcenter":
                    w = l.left + .5 * m.width - .5 * r.width, w += u.x, b.lineTo(w, x), x += r.height, w += .5 * r.width, b.lineTo(w, x), x -= r.height, w += .5 * r.width, b.lineTo(w, x), w = l.left + .5 * m.width + r.width, b.lineTo(w, x);
                    break;
                case"bottomright":
                    w = l.left + m.width - h - r.width, j && (w -= j), w += .5 * r.width, w -= .5 * o.width, w -= Math.max(t, g.x || 0), w -= u.x, b.lineTo(w, x), x += r.height, w += .5 * r.width, b.lineTo(w, x), x -= r.height, w += .5 * r.width, b.lineTo(w, x)
            }
            if (i ? i && (b.arc(l.left + m.width - i, l.top + m.height - i, i, n(90), n(0), !0), w = l.left + m.width, x = l.top + m.width + i) : (w = l.left + m.width, x = l.top + m.height, b.lineTo(w, x)), c.stem)switch (k) {
                case"rightbottom":
                    x = l.top + m.height - h, x += .5 * r.width, x -= .5 * o.width, j && (x -= j), x -= Math.max(t, g.y || 0), x -= u.y, b.lineTo(w, x), w += r.height, x -= .5 * r.width, b.lineTo(w, x), w -= r.height, x -= .5 * r.width, b.lineTo(w, x);
                    break;
                case"rightmiddle":
                case"rightcenter":
                    x = l.top + .5 * m.height + .5 * r.width, x += u.y, b.lineTo(w, x), w += r.height, x -= .5 * r.width, b.lineTo(w, x), w -= r.height, x -= .5 * r.width, b.lineTo(w, x);
                    break;
                case"righttop":
                    x = l.top + h, j && (x += j), x += r.width, x -= .5 * r.width - .5 * o.width, x += Math.max(t, g.y || 0), x += u.y, b.lineTo(w, x), w += r.height, x -= .5 * r.width, b.lineTo(w, x), w -= r.height, x -= .5 * r.width, b.lineTo(w, x)
            }
            if (i ? i && (b.arc(l.left + m.width - i, l.top + i, i, n(0), n(-90), !0), w = l.left + m.width - i, x = l.top) : (w = l.left + m.width, x = l.top, b.lineTo(w, x)), c.stem)switch (k) {
                case"topright":
                    w = l.left + m.width - h, w += .5 * r.width - .5 * o.width, j && (w -= j), w -= Math.max(t, g.x || 0), w -= u.x, b.lineTo(w, x), x -= r.height, w -= .5 * r.width, b.lineTo(w, x), x += r.height, w -= .5 * r.width, b.lineTo(w, x);
                    break;
                case"topmiddle":
                case"topcenter":
                    w = l.left + .5 * m.width + .5 * r.width, w += u.x, b.lineTo(w, x), x -= r.height, w -= .5 * r.width, b.lineTo(w, x), x += r.height, w -= .5 * r.width, b.lineTo(w, x), w = l.left + .5 * m.width - r.width, b.lineTo(w, x), b.lineTo(w, x);
                    break;
                case"topleft":
                    w = l.left + h + r.width, w -= .5 * r.width, w += .5 * o.width, j && (w += j), w += Math.max(t, g.x || 0), w += u.x, b.lineTo(w, x), x -= r.height, w -= .5 * r.width, b.lineTo(w, x), x += r.height, w -= .5 * r.width, b.lineTo(w, x)
            }
            b.lineTo(z.x, z.y - h), b.lineTo(z.x, z.y), c.closePath && b.closePath()
        }

        function F(b) {
            var c = this.getOrderLayout(), d = this.options.stem && this.getStemLayout(), e = this._hookPosition && this._hookPosition.toLowerCase(), f = this.radius, h = this.border, i = this.padding, k = ({
                width: 2 * h + 2 * i + this.contentDimensions.width,
                height: 2 * h + 2 * i + this.contentDimensions.height
            }, b.options.stem && b.options.stem.offset || {x: 0, y: 0}), l = 0, m = 0;
            f && (l = "background" == this.options.radius.position ? f : 0, m = "border" == this.options.radius.position ? f : l + h), a(document.body).append(this.bubbleCanvas = document.createElement("canvas")), q.resize(this.bubbleCanvas, c.bubble.dimensions), q.init(this.bubbleCanvas);
            var n = this.bubbleCanvas.getContext("2d");
            n.globalAlpha = this._globalAlpha, a(this.bubble).append(this.bubbleCanvas), n.fillStyle = q.createFillStyle(n, this.options.background, {
                x1: 0,
                y1: c.background.position.top + h,
                x2: 0,
                y2: c.background.position.top + c.background.dimensions.height - h
            }), n.lineWidth = 0;
            var o;
            o = this._drawBackgroundPath(n, {
                beginPath: !0,
                closePath: !0,
                border: h,
                radius: l,
                borderRadius: m,
                layout: c,
                stemLayout: d,
                stem: this.options.stem,
                hookPosition: e,
                cornerOffset: k
            }), n.fill();
            for (var p = [], r = 0, s = p.length, u = 0, v = p.length; v > u; u++)r = Math.max(r, p[u].length);
            var w = {left: 5, top: 5}, x = b.contentElement.firstChild;
            if (x && (x = a(x), w.left = parseInt(x.css("padding-left")) || 0, w.top = parseInt(x.css("padding-top")) || 0), q.drawPixelArray(n, p, {
                    x: c.background.position.left + c.background.dimensions.width - h - (w.left || 0) - r,
                    y: c.background.position.top + c.background.dimensions.height - h - (w.top || 0) - s,
                    color: t.getSaturatedBW(a.isArray(this.options.background.color) ? this.options.background.color[this.options.background.color.length - 1].color : this.options.background.color)
                }), h) {
                var y = q.createFillStyle(n, this.options.border, {
                    x1: 0,
                    y1: c.background.position.top,
                    x2: 0,
                    y2: c.background.position.top + c.background.dimensions.height
                });
                n.fillStyle = y, o = this._drawBackgroundPath(n, {
                    beginPath: !0,
                    closePath: !1,
                    border: h,
                    radius: l,
                    borderRadius: m,
                    layout: c,
                    stemLayout: d,
                    stem: this.options.stem,
                    hookPosition: e,
                    cornerOffset: k
                }), this._drawBorderPath(n, {
                    beginPath: !1,
                    closePath: !0,
                    border: h,
                    backgroundRadius: l,
                    radius: {size: m, position: this.options.radius.position},
                    layout: c,
                    stemLayout: d,
                    stem: this.options.stem,
                    hookPosition: e,
                    cornerOffset: o.cornerOffset,
                    corrections: o
                }), n.fill()
            }
            this._corrections = o
        }

        function G() {
            var i, a = this.getTooltip(), b = this.contentDimensions, c = a.options, d = this.radius, f = this.border, g = this.padding, h = {
                width: 2 * f + 2 * g + b.width,
                height: 2 * f + 2 * g + b.height
            };
            if (this.options.stem) {
                var j = this.getStemLayout();
                i = j.box.dimensions
            }
            var k = s.getBubbleLayout(this, h), l = k.dimensions, m = k.position, h = k.background.dimensions, o = k.background.position;
            k.stem.dimensions;
            var r, t, u, q = {top: 0, left: 0}, v = {width: l.width, height: l.height};
            if (c.closeButton) {
                var w = d;
                "background" == c.radius.position && (w += f);
                var x = w - Math.sin(n(45)) * w, y = "right";
                this._hookPosition.toLowerCase().match(/^(topright|righttop)$/) && (y = "left");
                var z = c.closeButton.diameter + 2 * c.closeButton.border, r = {width: z, height: z};
                if (q.left = o.left - z / 2 + ("left" == y ? x : h.width - x), q.top = o.top - z / 2 + x, "left" == y) {
                    if (q.left < 0) {
                        var A = Math.abs(q.left);
                        v.width += A, m.left += A, q.left = 0
                    }
                } else {
                    var B = q.left + z - v.width;
                    B > 0 && (v.width += B)
                }
                if (q.top < 0) {
                    var C = Math.abs(q.top);
                    v.height += C, m.top += C, q.top = 0
                }
                if (this.options.closeButton.shadow) {
                    var D = this.options.closeButton.shadow, E = D.blur, F = D.offset;
                    if (t = {width: r.width + 2 * E, height: r.height + 2 * E}, u = {
                            top: q.top - E + F.y,
                            left: q.left - E + F.x
                        }, "left" == y) {
                        if (u.left < 0) {
                            var A = Math.abs(u.left);
                            v.width += A, m.left += A, q.left += A, u.left = 0
                        }
                    } else {
                        var B = u.left + t.width - v.width;
                        B > 0 && (v.width += B)
                    }
                    if (u.top < 0) {
                        var C = Math.abs(u.top);
                        v.height += C, m.top += C, q.top += C, u.top = 0
                    }
                }
            }
            var G = k.anchor;
            G.top += m.top, G.left += m.left;
            var H = {
                left: Math.ceil(m.left + o.left + this.border + this.options.padding),
                top: Math.ceil(m.top + o.top + this.border + this.options.padding)
            }, I = {
                tooltip: {dimensions: {width: Math.ceil(v.width), height: Math.ceil(v.height)}},
                skin: {dimensions: {width: Math.ceil(v.width), height: Math.ceil(v.height)}},
                bubble: {dimensions: l, position: {top: Math.round(m.top), left: Math.round(m.left)}},
                background: {
                    dimensions: {width: Math.ceil(h.width), height: Math.ceil(h.height)},
                    position: {top: Math.round(o.top), left: Math.round(o.left)}
                },
                anchor: {top: Math.round(G.top), left: Math.round(G.left)},
                content: {position: H}
            };
            return this.options.closeButton && (I.closeButton = {
                dimensions: {
                    width: Math.ceil(r.width),
                    height: Math.ceil(r.height)
                }, position: {top: Math.round(q.top), left: Math.round(q.left)}
            }, this.options.closeButton.shadow && (I.closeButtonShadow = {
                dimensions: {
                    width: Math.ceil(t.width),
                    height: Math.ceil(t.height)
                }, position: {top: Math.round(u.top), left: Math.round(u.left)}
            })), I
        }

        function H() {
            var b = this.getOrderLayout(), c = this.getTooltip();
            a(c.container).css(k(b.tooltip.dimensions)), a(c.skinElement).css(k(b.skin.dimensions)), this.iframeShim && this.iframeShim.css(k(b.tooltip.dimensions)), a(this.bubble).css(a.extend(k(b.bubble.dimensions), k(b.bubble.position))), this.closeButton && (a(this.closeButton).css(k(b.closeButton.position)), b.closeButtonShadow && a(this.closeButtonShadow.container).css(k(b.closeButtonShadow.position))), a(c.contentElement).css(k(b.content.position))
        }

        function I(a) {
            this._globalAlpha = a || 0, this.shadow && (this.shadow._globalAlpha = this._globalAlpha)
        }

        function J(a) {
            this.setGlobalAlpha(a), this.build()
        }

        return {
            prepare: f,
            createHookCache: b,
            build: g,
            remove: c,
            cleanup: d,
            getTooltip: o,
            refresh: h,
            setHookPositionAndStemCorrection: i,
            setAdjustment: j,
            setStemCorrection: l,
            setHookPosition: m,
            drawCloseButton: A,
            drawCloseButtonState: C,
            drawBubble: F,
            _drawBackgroundPath: D,
            _drawBorderPath: E,
            closeButtonMouseover: u,
            closeButtonMouseout: v,
            getStemLayout: p,
            getOrderLayout: G,
            order: H,
            setGlobalAlpha: I,
            setOpacity: J
        }
    }());
    var w = {
        shadows: {}, get: function (b) {
            if (!b)return null;
            var c = null, d = a(b).data("tipped-uid");
            return d && (c = this.shadows[d]), c
        }, add: function (a) {
            this.shadows[a.uid] = a
        }, remove: function (a) {
            var b = this.get(a);
            b && (delete this.shadows[b.uid], b.remove())
        }, transition: function (a) {
            return Math.PI / 2 - Math.pow(a, Math.cos(a) * Math.PI)
        }
    };
    w.Stem = {
        getBorderDimensions: function (a, b) {
            var c = u.get(a.element), d = c.getStemLayout().border.dimensions, e = this.getCenterBorderDimensions(d.width, d.height, b, {math: !1});
            return {width: e.width, height: e.height}
        }, getCenterBorderDimensions2: function (a, b, c) {
            var d = .5 * a, e = m(Math.acos(d / l(d, b))), f = 180 - e - 90, g = o(n(f)) * c, h = 2 * (d + g), i = h / a * b;
            return {width: h, height: i}
        }, getCenterBorderDimensions: function (a, b, c) {
            var d = m(Math.atan(.5 * (b / a))), e = 180 - d, f = Math.cos(n(e - 90)) * c, g = a + 2 * f, h = g * b / a;
            return {width: g, height: h}
        }, getLayout: function (b) {
            var c = u.get(b.element), d = b.options.blur, e = r.isCorner(c._hookPosition), g = (r.getOrientation(c._hookPosition), w.Stem.getBorderDimensions(b, d)), h = {
                box: {
                    dimensions: {
                        width: Math.ceil(g.width),
                        height: Math.ceil(g.height)
                    }, position: {top: 0, left: 0}
                }
            };
            if (d) {
                h.blurs = [];
                for (var i = 0; d >= i; i++) {
                    var j = w.Stem.getBorderDimensions(b, i, {math: !1}), k = {
                        position: {
                            top: h.box.dimensions.height - j.height,
                            left: e ? d - i : (h.box.dimensions.width - j.width) / 2
                        }, dimensions: j
                    };
                    h.blurs.push(k)
                }
            } else h.blurs = [a.extend({}, h.box)];
            return h
        }, rotate: function (a, b, c) {
            s.rotate(a, b.getSkin(), c)
        }
    }, a.extend(x.prototype, function () {
        function b() {
            return B.get(this.element)[0]
        }

        function c() {
            return u.get(this.element)
        }

        function d() {
            this.cleanup()
        }

        function e() {
            this.container && (a(this.container).remove(), this.stem = null, this.background = null, this.bubble = null, this.container = null, this._cache = {})
        }

        function f() {
        }

        function g() {
            this.cleanup(), this.prepare();
            var b = this.getTooltip(), c = this.getSkin();
            this.container = a("<div>").addClass("t_Shadow")[0], a(b.container).prepend(this.container), c.iframeShim && a(b.container).prepend(c.iframeShim), c.getOrderLayout(), a(this.container).css({
                top: 0,
                left: 0
            }), this.drawBackground(), this.order()
        }

        function h() {
            return this.options.opacity / (this.options.blur + 1)
        }

        function i() {
            var b = this.getSkin(), c = b.getOrderLayout(), d = this.getTooltip(), e = this.getOrderLayout(), f = this.options.blur, g = w.Stem.getLayout(this), h = b._hookPosition, i = r.getSide(h), j = {
                top: f,
                left: f
            };
            if (d.options.stem) {
                var l = g.blurs[g.blurs.length - 1];
                "left" == i && (j.left += Math.ceil(l.dimensions.height)), "top" == i && (j.top += Math.ceil(l.dimensions.height))
            }
            var m = b._cache.options, n = m.radius, o = m.border;
            "background" == d.options.radius.position && n && (n += o);
            var p = e.bubble.dimensions;
            a(this.container).append(a(this.bubble = document.createElement("div")).addClass("t_ShadowBubble").css(k(p))).css(k(p)), a(document.body).append(a(this.bubbleCanvas = document.createElement("canvas"))), q.resize(this.bubbleCanvas, e.bubble.dimensions), q.init(this.bubbleCanvas);
            var s = this.bubbleCanvas.getContext("2d");
            s.globalAlpha = this._globalAlpha, a(this.bubble).append(this.bubbleCanvas);
            for (var u = f + 1, v = 0; f >= v; v++)s.fillStyle = t.hex2fill(this.options.color, w.transition(v * (1 / u)) * (this.options.opacity / u)), q.drawRoundedRectangle(s, {
                width: c.background.dimensions.width + 2 * v,
                height: c.background.dimensions.height + 2 * v,
                top: j.top - v,
                left: j.left - v,
                radius: n + v
            });
            if (b.options.stem) {
                var x = {x: j.left, y: j.top}, y = g.blurs[0].dimensions, z = b.options.stem, A = o;
                A += .5 * z.width;
                var B = b.options.radius && "background" == b.options.radius.position ? b.options.radius.size || 0 : 0;
                B && (A += B);
                var C = o + B + .5 * z.width - .5 * y.width, D = Math.ceil(n > C ? n - C : 0), E = b._corrections && b._corrections.stem || {
                        x: 0,
                        y: 0
                    }, F = b._corrections && b._corrections.corner || {x: 0, y: 0};
                if (A += Math.max(D, b.options.stem.offset && b.options.stem.offset[i && /^(left|right)$/.test(i) ? "y" : "x"] || 0), "top" == i || "bottom" == i) {
                    switch (h) {
                        case"topleft":
                        case"bottomleft":
                            x.x += A + E.x - F.x;
                            break;
                        case"topmiddle":
                        case"topcenter":
                        case"bottommiddle":
                        case"bottomcenter":
                            x.x += .5 * c.background.dimensions.width + E.x;
                            break;
                        case"topright":
                        case"bottomright":
                            x.x += c.background.dimensions.width - (A - E.x + F.x)
                    }
                    "bottom" == i && (x.y += c.background.dimensions.height);
                    for (var v = 0, G = g.blurs.length; G > v; v++) {
                        s.fillStyle = t.hex2fill(this.options.color, w.transition(v * (1 / u)) * (this.options.opacity / u));
                        var f = g.blurs[v];
                        s.beginPath(), "top" == i ? (s.moveTo(x.x, x.y - v), s.lineTo(x.x - .5 * f.dimensions.width, x.y - v), s.lineTo(x.x, x.y - v - f.dimensions.height), s.lineTo(x.x + .5 * f.dimensions.width, x.y - v)) : (s.moveTo(x.x, x.y + v), s.lineTo(x.x - .5 * f.dimensions.width, x.y + v), s.lineTo(x.x, x.y + v + f.dimensions.height), s.lineTo(x.x + .5 * f.dimensions.width, x.y + v)), s.closePath(), s.fill()
                    }
                } else {
                    switch (h) {
                        case"lefttop":
                        case"righttop":
                            x.y += A + E.y - F.y;
                            break;
                        case"leftmiddle":
                        case"leftcenter":
                        case"rightmiddle":
                        case"rightcenter":
                            x.y += .5 * c.background.dimensions.height + E.y;
                            break;
                        case"leftbottom":
                        case"rightbottom":
                            x.y += c.background.dimensions.height - (A - E.y + F.y)
                    }
                    "right" == i && (x.x += c.background.dimensions.width);
                    for (var v = 0, G = g.blurs.length; G > v; v++) {
                        s.fillStyle = t.hex2fill(this.options.color, w.transition(v * (1 / u)) * (this.options.opacity / u));
                        var f = g.blurs[v];
                        s.beginPath(), "left" == i ? (s.moveTo(x.x - v, x.y), s.lineTo(x.x - v, x.y - .5 * f.dimensions.width), s.lineTo(x.x - v - f.dimensions.height, x.y), s.lineTo(x.x - v, x.y + .5 * f.dimensions.width)) : (s.moveTo(x.x + v, x.y), s.lineTo(x.x + v, x.y - .5 * f.dimensions.width), s.lineTo(x.x + v + f.dimensions.height, x.y), s.lineTo(x.x + v, x.y + .5 * f.dimensions.width)), s.closePath(), s.fill()
                    }
                }
            }
        }

        function j() {
            var b = this.getSkin();
            b.contentDimensions, b.radius;
            var e = b.getOrderLayout(), g = (this.getTooltip(), this.options.blur), h = a.extend({}, e.background.dimensions);
            h.width += 2 * g, h.height += 2 * g;
            var i, k;
            if (b.options.stem) {
                var l = w.Stem.getLayout(this);
                i = l.box.dimensions, k = i.height
            }
            var m = s.getBubbleLayout(b, h, k), n = m.dimensions, o = m.position, h = m.background.dimensions, p = m.background.position, r = e.bubble.position, t = e.background.position, u = {
                top: r.top + t.top - (p.top + g) + this.options.offset.y,
                left: r.left + t.left - (p.left + g) + this.options.offset.x
            }, v = e.anchor, x = e.skin.dimensions, y = {top: 0, left: 0};
            if (u.top < 0) {
                var z = Math.abs(u.top);
                y.top += z, u.top = 0, v.top += z
            }
            if (u.left < 0) {
                var A = Math.abs(u.left);
                y.left += A, u.left = 0, v.left += A
            }
            var B = {
                height: Math.max(n.height + u.top, x.height + y.top),
                width: Math.max(n.width + u.left, x.width + y.left)
            }, C = {
                left: Math.ceil(y.left + e.bubble.position.left + e.background.position.left + b.border + b.padding),
                top: Math.ceil(y.top + e.bubble.position.top + e.background.position.top + b.border + b.padding)
            }, D = {
                tooltip: {dimensions: B},
                skin: {dimensions: x, position: y},
                container: {dimensions: n, position: u},
                bubble: {dimensions: n, position: {top: Math.round(o.top), left: Math.round(o.left)}},
                background: {
                    dimensions: {width: Math.ceil(h.width), height: Math.ceil(h.height)},
                    position: {top: Math.round(p.top), left: Math.round(p.left)}
                },
                anchor: v,
                content: {position: C}
            };
            return D
        }

        function l() {
            var b = this.getOrderLayout(), c = this.getSkin(), d = this.getTooltip();
            if (a(d.container).css(k(b.tooltip.dimensions)), a(d.skinElement).css(a.extend(k(b.skin.position), k(b.skin.dimensions))), c.iframeShim && c.iframeShim.css(k(b.tooltip.dimensions)), d.options.closeButton) {
                var e = c.getOrderLayout(), f = b.skin.position, g = e.closeButton.position;
                if (a(c.closeButton).css(k({
                        top: f.top + g.top,
                        left: f.left + g.left
                    })), d.options.closeButton.shadow) {
                    var h = e.closeButtonShadow.position;
                    a(c.closeButtonShadow.container).css(k({top: f.top + h.top, left: f.left + h.left}))
                }
            }
            a(this.container).css(a.extend(k(b.container.dimensions), k(b.container.position))), a(this.bubble).css(k(b.bubble.dimensions)), a(d.contentElement).css(k(b.content.position))
        }

        return {
            prepare: f,
            remove: d,
            cleanup: e,
            build: g,
            getTooltip: b,
            getSkin: c,
            getOrderLayout: j,
            getBlurOpacity: h,
            drawBackground: i,
            order: l
        }
    }());
    var y = {
        shadows: {}, get: function (b) {
            if (!b)return null;
            var c = a(b).data("tipped-uid");
            return c ? this.shadows[c] : null
        }, add: function (a) {
            this.shadows[a.uid] = a
        }, remove: function (a) {
            var b = this.get(a);
            b && (delete this.shadows[b.uid], b.remove())
        }
    };
    a.extend(z.prototype, function () {
        function b() {
            return B.get(this.element)[0]
        }

        function c() {
            return u.get(this.element)
        }

        function d() {
            return this.options.opacity / (this.options.blur + 1)
        }

        function e() {
            this.cleanup()
        }

        function f() {
            this.container && (a(this.container).remove(), this.container = null)
        }

        function g() {
            this.cleanup();
            var c = (this.getTooltip(), this.getSkin()), d = c.getOrderLayout().closeButton.dimensions, e = a.extend({}, d), f = this.options.blur;
            e.width += 2 * f, e.height += 2 * f, a(c.closeButton).before(a(this.container = document.createElement("div")).addClass("t_CloseButtonShadow")), a(document.body).append(a(this.closeButtonCanvas = document.createElement("canvas"))), q.resize(this.closeButtonCanvas, e), q.init(this.closeButtonCanvas);
            var g = this.closeButtonCanvas.getContext("2d");
            g.globalAlpha = this._globalAlpha, a(this.container).append(this.closeButtonCanvas);
            for (var h = e.width / 2, i = e.height / 2, j = d.height / 2, k = f + 1, l = 0; f >= l; l++)g.fillStyle = t.hex2fill(this.options.color, w.transition(l * (1 / k)) * (this.options.opacity / k)), g.beginPath(), g.arc(h, i, j + l, n(0), n(360), !0), g.closePath(), g.fill()
        }

        return {build: g, remove: e, cleanup: f, getTooltip: b, getSkin: c, getBlurOpacity: d}
    }());
    var B = {
        tooltips: {}, options: {defaultSkin: "dark", startingZIndex: 999999}, stopDelegating: function () {
            var b = ["click"];
            Tipped.support.touch && (b.push("touchstart"), this._void && a(document.body).unbind("click", this._void), this._void = null), a.each(b, function (b, c) {
                a(document.documentElement).undelegate(".t_Tooltip .t_Close, .t_Tooltip .close-tooltip", c)
            }), this._onWindowResizeHandler && (a(window).unbind("resize", this._onWindowResizeHandler), this._onWindowResizeHandler = null), a(document).unbind("mousemove", B.Position._mouseBufferHandler)
        }, startDelegating: function () {
            function b() {
                this.stopDelegating();
                var b = ["click"];
                Tipped.support.touch && (b.push("touchstart"), this._void = function () {
                    return void 0
                }, a(document.body).bind("click", this._void)), a.each(b, function (b, c) {
                    a(document.documentElement).delegate(".t_Tooltip .t_Close, .t_Tooltip .close-tooltip", c, function (b) {
                        b.preventDefault(), b.stopPropagation(), B.getByTooltipElement(a(b.target).closest(".t_Tooltip")[0]).hide()
                    })
                }), this._onWindowResizeHandler = a.proxy(this.onWindowResize, this), a(window).bind("resize", this._onWindowResizeHandler), a(document).bind("mousemove", B.Position._mouseBufferHandler)
            }

            return b
        }(), onWindowResize: function () {
            this._resizeTimer && (window.clearTimeout(this._resizeTimer), this._resizeTimer = null), this._resizeTimer = d.delay(a.proxy(function () {
                var b = this.getVisible();
                a.each(b, function (a, b) {
                    b.position()
                })
            }, this), 200)
        }, _getTooltip: function (b) {
            var d, c = a(b).data("tipped-uid");
            if (!c) {
                var e = this.getByTooltipElement(a(b).closest(".t_Tooltip")[0]);
                e && e.element && (c = a(e.element).data("tipped-uid"))
            }
            return c && (d = this.tooltips[c]) ? d : void 0
        }, findElement: function (a) {
            var b;
            return d.isElement(a) && (b = this._getTooltip(a)), b && b.element
        }, get: function (b) {
            var c = [];
            if (d.isElement(b)) {
                var e = this._getTooltip(b);
                e && (c = [e])
            } else a.each(this.tooltips, function (d, e) {
                e.element && a(e.element).is(b) && c.push(e)
            });
            return c
        }, getByTooltipElement: function (b) {
            if (!b)return null;
            var c = null;
            return a.each(this.tooltips, function (a, d) {
                d.getState("build") && d.container === b && (c = d)
            }), c
        }, getBySelector: function (b) {
            var c = [];
            return a.each(this.tooltips, function (d, e) {
                e.element && a(e.element).is(b) && c.push(e)
            }), c
        }, show: function (b) {
            if (d.isElement(b)) {
                var c = b, e = this.get(c)[0];
                e && e.show()
            } else a(b).each(a.proxy(function (a, b) {
                var c = this.get(b)[0];
                c && c.show()
            }, this))
        }, hide: function (b) {
            if (d.isElement(b)) {
                var c = this.get(b)[0];
                c && c.hide()
            } else a(b).each(a.proxy(function (a, b) {
                var c = this.get(b)[0];
                c && c.hide()
            }, this))
        }, toggle: function (b) {
            if (d.isElement(b)) {
                var c = b, e = this.get(c)[0];
                e && e.toggle()
            } else a(b).each(a.proxy(function (a, b) {
                var c = this.get(b)[0];
                c && c.toggle()
            }, this))
        }, hideAll: function () {
            a.each(this.getVisible(), function (a, b) {
                b.hide()
            })
        }, refresh: function (b) {
            if (d.isElement(b)) {
                var c = b, e = this.get(c)[0];
                e && e.refresh()
            } else a(b).each(a.proxy(function (a, b) {
                var c = this.get(b)[0];
                c && c.refresh()
            }, this))
        }, getVisible: function () {
            var b = [];
            return a.each(this.tooltips, function (a, c) {
                c.visible() && b.push(c)
            }), b
        }, isVisibleByElement: function (b) {
            var c = !1;
            return d.isElement(b) && a.each(this.getVisible() || [], function (a, d) {
                return d.element == b ? (c = !0, !1) : void 0
            }), c
        }, getHighestTooltip: function () {
            var c, b = 0;
            return a.each(this.tooltips, function (a, d) {
                d.zIndex > b && (b = d.zIndex, c = d)
            }), c
        }, resetZ: function () {
            this.getVisible().length <= 1 && a.each(this.tooltips, function (b, c) {
                c.getState("build") && !c.options.zIndex && a(c.container).css({zIndex: c.zIndex = +B.options.startingZIndex})
            })
        }, add: function (a) {
            this.tooltips[a.uid] = a
        }, _remove: function (b) {
            var c = this._getTooltip(b);
            if (c) {
                var d = a(c.element).data("tipped-uid");
                delete this.tooltips[d], c.hide(), c.remove()
            }
        }, remove: function (b) {
            d.isElement(b) ? this._remove(b) : a(b).each(a.proxy(function (a, b) {
                this._remove(b)
            }, this))
        }, removeDetached: function () {
            a.each(this.tooltips, a.proxy(function (a, b) {
                b.element && !d.element.isAttached(b.element) && this._remove(b.element)
            }, this))
        }, removeAll: function () {
            a.each(this.tooltips, a.proxy(function (a, b) {
                b.element && this._remove(b.element)
            }, this)), this.tooltips = {}
        }, setDefaultSkin: function (a) {
            this.options.defaultSkin = a || "dark"
        }, setStartingZIndex: function (a) {
            this.options.startingZIndex = a || 0
        }, clearAjaxCache: function () {
            a.each(this.tooltips, a.proxy(function (a, b) {
                b._cache && b._cache.xhr && (b._cache.xhr.abort(), b._cache.xhr = null), b.setState("updated", !1)
            }, this)), i.clear()
        }, createOptions: function () {
            function f(d) {
                var e;
                return e = "string" == a.type(d) ? {
                    element: c.hideOn && c.hideOn.element || b.hideOn.element,
                    event: d
                } : A(a.extend({}, b.hideOn), d)
            }

            function g(f) {
                return b = Tipped.Skins.base, c = A(a.extend({}, b), Tipped.Skins.reset), d = Tipped.Skins.CloseButtons.base, e = A(a.extend({}, d), Tipped.Skins.CloseButtons.reset), g = h, h(f)
            }

            function h(g) {
                g.skin = g.skin && Tipped.Skins[g.skin] ? g.skin : Tipped.Skins[B.options.defaultSkin] ? B.options.defaultSkin : "dark";
                var h = g.skin ? a.extend({}, Tipped.Skins[g.skin] || Tipped.Skins[B.options.defaultSkin]) : {}, i = A(a.extend({}, c), h), j = A(a.extend({}, i), g);
                if (j.ajax) {
                    var k = c.ajax || {}, l = b.ajax;
                    "boolean" == a.type(j.ajax) && (j.ajax = {
                        cache: k.cache || l.cache,
                        type: k.type || l.type
                    }), j.ajax = A(a.extend({}, l), j.ajax)
                }
                if (j.background && "string" == a.type(j.background) && (j.background = {
                        color: j.background,
                        opacity: 1
                    }), j.border) {
                    var m, n = c.border || {}, o = b.border;
                    m = "number" == a.type(j.border) ? {
                        size: j.border,
                        color: n.color || o.color,
                        opacity: n.opacity || o.opacity
                    } : A(a.extend({}, o), j.border), j.border = 0 === m.size ? !1 : m
                }
                if (j.radius) {
                    var p;
                    p = "number" == a.type(j.radius) ? {
                        size: j.radius,
                        position: c.radius && c.radius.position || b.radius.position
                    } : A(a.extend({}, b.radius), j.radius), j.radius = 0 === p.size ? !1 : p
                }
                var q, s = s = j.hook && j.hook.target || "string" == a.type(j.hook) && j.hook || c.hook && c.hook.target || "string" == a.type(c.hook) && c.hook || b.hook && b.hook.target || b.hook, t = j.hook && j.hook.tooltip || c.hook && c.hook.tooltip || b.hook && b.hook.tooltip || B.Position.getInversedPosition(s);
                if (j.hook ? "string" == a.type(j.hook) ? q = {
                        target: j.hook,
                        tooltip: B.Position.getTooltipPositionFromTarget(j.hook)
                    } : (q = {
                        tooltip: t,
                        target: s
                    }, j.hook.tooltip && (q.tooltip = j.hook.tooltip), j.hook.target && (q.target = j.hook.target)) : q = {
                        tooltip: t,
                        target: s
                    }, "mouse" == j.target) {
                    var u = r.getOrientation(q.target);
                    q.target = "horizontal" == u ? q.target.replace(/(left|right)/, "middle") : q.target.replace(/(top|bottom)/, "middle")
                }
                j.hook = q;
                var v;
                if ("mouse" == j.target ? (v = a.extend({}, b.offset), a.extend(v, Tipped.Skins.reset.offset || {}), g.skin && a.extend(v, (Tipped.Skins[g.skin] || Tipped.Skins[B.options.defaultSkin]).offset || {}), v = B.Position.adjustOffsetBasedOnHooks(b.offset, b.hook, q.target, !0), g.offset && (v = a.extend(v, g.offset || {})), j.fadeOut = 0) : v = {
                        x: j.offset.x,
                        y: j.offset.y
                    }, j.offset = v, j.closeButton && j.closeButtonSkin) {
                    var w = a.extend({}, Tipped.Skins.CloseButtons[j.closeButtonSkin]), x = A(a.extend({}, e), w);
                    if (x.states && a.each(["default", "hover"], function (b, c) {
                            var f = x.states[c], g = e.states && e.states[c];
                            if (f.background) {
                                var h = g && g.background;
                                if ("number" == a.type(f.background))f.background = {
                                    color: h && h.color || d.states[c].background.color,
                                    opacity: f.background
                                }; else if ("string" == a.type(f.background)) {
                                    var i = h && "number" == a.type(h.opacity) && h.opacity || d.states[c].background.opacity;
                                    f.background = {color: f.background, opacity: i}
                                } else f.background = A(a.extend({}, d.states[c].background), f.background)
                            }
                            if (f.border) {
                                var j = g && g.border;
                                f.border = "number" == a.type(f.border) ? {
                                    color: j && j.color || d.states[c].border.color,
                                    opacity: f.border
                                } : A(a.extend({}, d.states[c].border), f.border)
                            }
                        }), x.shadow) {
                        var z = e.shadow && e.shadow.constructor && e.shadow.constructor == Object ? e.shadow : d.shadow;
                        x.shadow.constructor && x.shadow.constructor == Object && (z = A(z, x.shadow)), x.shadow = z
                    }
                    j.closeButton = x
                }
                if (j.shadow) {
                    var C;
                    C = "boolean" == a.type(j.shadow) ? c.shadow && "boolean" == a.type(c.shadow) ? b.shadow : c.shadow ? c.shadow : b.shadow : A(a.extend({}, b.shadow), j.shadow || {}), "number" == a.type(C.offset) && (C.offset = {
                        x: C.offset,
                        y: C.offset
                    }), j.shadow = C
                }
                if (j.stem) {
                    var D = {};
                    D = "boolean" == a.type(j.stem) ? A({}, b.stem) : A(A({}, b.stem), a.extend({}, j.stem)), "number" == a.type(D.offset) && (D.offset = {
                        x: D.offset,
                        y: D.offset
                    }), j.stem = D
                }
                if (j.containment && ("string" == a.type(j.containment) ? j.containment = {
                        selector: j.containment,
                        flip: !0
                    } : "boolean" == a.type(j.containment) && (j.containment = j.containment ? {
                        selector: "viewport",
                        flip: !0
                    } : !1)), j.hideOn && "click-outside" == j.hideOn && (j.hideOnClickOutside = !0, j.hideOn = !1), j.hideOn)if (a.isArray(j.hideOn)) {
                    var E = [];
                    a.each(j.hideOn, function (a, b) {
                        E.push(f(b))
                    }), j.hideOn = E
                } else j.hideOn = [f(j.hideOn)];
                return j.showOn && "string" == a.type(j.showOn) && (j.showOn = ["" + j.showOn]), j.padding = 0, j.spinner && (window.Spinners || (j.spinner = !1)), j
            }

            var b, c, d, e;
            return g
        }()
    };
    B.Position = function () {
        function c(c) {
            var d = r.split(c), e = d[1], f = d[2], g = r.getOrientation(c), h = a.extend({
                horizontal: !0,
                vertical: !0
            }, arguments[1] || {});
            return "horizontal" == g ? (h.vertical && (e = b[e]), h.horizontal && (f = b[f])) : (h.vertical && (f = b[f]), h.horizontal && (e = b[e])), e + f
        }

        function f(a) {
            var d = r.split(a);
            return c(d[1] + b[d[2]])
        }

        function h(b, c) {
            a(b.container).css({top: c.top + "px", left: c.left + "px"})
        }

        function j(a, b, d, e) {
            var g = y(a, b, d, e), h = d && "string" == typeof d.type ? d.type : "";
            if (/move$/.test(h), 1 === g.contained.overlap)return l(a, g), g;
            var m = b, n = e, o = {
                horizontal: !g.contained.horizontal,
                vertical: !g.contained.vertical
            }, p = {horizontal: !1, vertical: !1}, q = r.getOrientation(b);
            return ((p.vertical = "horizontal" == q && o.vertical) || (p.horizontal = "vertical" == q && o.horizontal)) && (m = c(b, p), n = c(e, p), g = y(a, m, d, n), 1 === g.contained.overlap) ? (l(a, g), g) : (g = k(g, a), l(a, g), g)
        }

        function k(a, b) {
            var c = z(b), d = c.dimensions, e = c.position, f = u.get(b.element)._cache.hook[a.hook.tooltip].tooltip.dimensions, g = a.position, h = {
                top: 0,
                left: 0,
                sides: []
            };
            return e.left > g.left && (h.left = e.left - g.left, h.sides.push("left"), a.position.left = e.left), e.top > g.top && (h.top = g.top - e.top, h.sides.push("top"), a.position.top = e.top), e.left + d.width < g.left + f.width && (h.left = e.left + d.width - (g.left + f.width), h.sides.push("right"), a.position.left = e.left + d.width - f.width), e.top + d.height < g.top + f.height && (h.top = e.top + d.height - (g.top + f.height), h.sides.push("bottom"), a.position.top = e.top + d.height - f.height), a.adjustment = h, a
        }

        function l(a, b) {
            a.setHookPositionAndStemCorrection(b.hook.tooltip, b.contained.correction, b.adjustment), h(a, b.position)
        }

        function m(a) {
            return a && (/^mouse|click|touch$/.test("string" == typeof a.type && a.type || "") || a.pageX >= 0)
        }

        function n(a, b, c) {
            return a >= b && c >= a
        }

        function o(a, b, c, d) {
            var e = n(a, c, d), f = n(b, c, d);
            if (e && f)return b - a;
            if (e && !f)return d - a;
            if (!e && f)return b - c;
            var g = n(c, a, b), h = n(d, a, b);
            return g && h ? d - c : g && !h ? b - c : !g && h ? d - a : 0
        }

        function q(a, b) {
            return o(a.position.left, a.position.left + a.dimensions.width, b.position.left, b.position.left + b.dimensions.width) * o(a.position.top, a.position.top + a.dimensions.height, b.position.top, b.position.top + b.dimensions.height)
        }

        function s(a, b) {
            var c = a.dimensions.width * a.dimensions.height;
            return c ? q(a, b) / c : 0
        }

        function t(a, b) {
            var c = r.split(b), d = r.getOrientation(b), e = {left: 0, top: 0};
            if ("horizontal" == d) {
                switch (c[2]) {
                    case"middle":
                    case"center":
                        e.left = .5 * a.width;
                        break;
                    case"right":
                        e.left = a.width
                }
                "bottom" == c[1] && (e.top = a.height)
            } else {
                switch (c[2]) {
                    case"middle":
                    case"center":
                        e.top = .5 * a.height;
                        break;
                    case"bottom":
                        e.top = a.height
                }
                "right" == c[1] && (e.left = a.width)
            }
            return e
        }

        function v(b) {
            var c = d.element.cumulativeOffset(b), e = d.element.cumulativeScrollOffset(b), f = {
                top: a(window).scrollTop(),
                left: a(window).scrollLeft()
            };
            return c.left += -1 * (e.left - f.left), c.top += -1 * (e.top - f.top), c
        }

        function y(b, e, f, g) {
            var h, i, j, k = u.get(b.element), l = k.options, n = l.offset, o = m(f);
            if (o || !f) {
                if (j = {width: 24, height: 24}, o) {
                    var p = d.pointer(f);
                    h = {top: p.y - .5 * j.height + 6, left: p.x - .5 * j.width + 6}
                } else {
                    var q = b._cache.event;
                    h = {top: (q ? q.y : 0) - .5 * j.height + 6, left: (q ? q.x : 0) - .5 * j.width + 6}
                }
                b._cache.event = {x: h.left, y: h.top}
            } else h = v(f), j = {width: a(f).outerWidth(), height: a(f).outerHeight()};
            if (l.stem && "mouse" != l.target) {
                var y = r.split(g), A = r.split(e), C = r.getOrientation(g), D = k._cache.options, E = k.getStemLayout().border.dimensions, F = D.radius, G = D.border, H = F && "background" == l.radius.position ? F : 0, I = F && "border" == l.radius.position ? F : F + G, J = G + H + .5 * l.stem.width - .5 * E.width, K = I > J ? I - J : 0;
                sideOffset = Math.ceil(G + H + .5 * l.stem.width + K + l.stem.offset["horizontal" == C ? "x" : "y"]), "horizontal" == C && "left" == y[2] && "left" == A[2] || "right" == y[2] && "right" == A[2] ? (j.width -= 2 * sideOffset, h.left += sideOffset) : ("vertical" == C && "top" == y[2] && "top" == A[2] || "bottom" == y[2] && "bottom" == A[2]) && (j.height -= 2 * sideOffset, h.top += sideOffset)
            }
            i = a.extend({}, h);
            var L = o ? c(l.hook.tooltip) : l.hook.target, M = t(j, L), N = t(j, g);
            ({top: h.top + M.top + n.y, left: h.left + M.left + n.x}), h = {left: h.left + N.left, top: h.top + N.top};
            var P = a.extend({}, n);
            P = x(P, L, g, "mouse" == k.options.target), h.top += P.y, h.left += P.x;
            var k = u.get(b.element), Q = k._cache.hook, R = a.extend({}, Q[e]), S = {x: 0, y: 0}, y = r.split(g);
            if ("middle" != y[2]) {
                var C = C = r.getOrientation(g), T = B.Position.getInversedPosition(g, "vertical" == C ? {
                    horizontal: !0,
                    vertical: !1
                } : {horizontal: !1, vertical: !0});
                e == T && (S.y = k._corrections.corner.y, S.x = k._corrections.corner.x)
            }
            var U = {top: h.top - R.anchor.top - S.y, left: h.left - R.anchor.left - S.x};
            R.tooltip.position = U;
            var V = {horizontal: !0, vertical: !0}, W = {x: 0, y: 0};
            if (b.options.containment) {
                var X = z(b), Y = b.options.shadow ? w.get(b.element) : k, Z = Y.getOrderLayout().tooltip.dimensions;
                V.overlap = s({
                    dimensions: Z,
                    position: U
                }, X), V.overlap < 1 && ((U.left < X.position.left || U.left + Z.width > X.position.left + X.dimensions.width) && (V.horizontal = !1, W.x = U.left < X.position.left ? U.left - X.position.left : U.left + Z.width - (X.position.left + X.dimensions.width)), (U.top < X.position.top || U.top + Z.height > X.position.top + X.dimensions.height) && (V.vertical = !1, W.y = U.top < X.position.top ? U.top - X.position.top : U.top + Z.height - (X.position.top + X.dimensions.height)))
            } else V.overlap = 1;
            V.correction = W;
            var $ = Q[e].bubble, _ = s({dimensions: j, position: i}, {
                dimensions: $.dimensions,
                position: {top: U.top + $.position.top, left: U.left + $.position.left}
            });
            return {position: U, overlap: {target: _}, contained: V, hook: {tooltip: e, target: g}}
        }

        function z(b) {
            var c = {top: a(window).scrollTop(), left: a(window).scrollLeft()}, e = b.options, f = e.target;
            ("mouse" == f || "self" == f) && (f = b.element);
            var g = a(f).closest(e.containment.selector).first()[0];
            if (!g || "viewport" == e.containment.selector)return {dimensions: p.viewport(), position: c};
            var h = d.element.cumulativeOffset(g), i = d.element.cumulativeScrollOffset(g);
            return h.left += -1 * (i.left - c.left), h.top += -1 * (i.top - c.top), {
                dimensions: {
                    width: a(g).innerWidth(),
                    height: a(g).innerHeight()
                }, position: h
            }
        }

        var b = {left: "right", right: "left", top: "bottom", bottom: "top", middle: "middle", center: "center"};
        e.IE && e.IE < 9 || e.Gecko && e.Gecko < 2 || e.WebKit && e.WebKit < 530;
        var x = function () {
            var a = [[-1, -1], [0, -1], [1, -1], [-1, 0], [0, 0], [1, 0], [-1, 1], [0, 1], [1, 1]], b = {
                lefttop: 0,
                topleft: 0,
                topmiddle: 1,
                topcenter: 1,
                topright: 2,
                righttop: 2,
                rightmiddle: 5,
                rightcenter: 5,
                rightbottom: 8,
                bottomright: 8,
                bottommiddle: 7,
                bottomcenter: 7,
                bottomleft: 6,
                leftbottom: 6,
                leftmiddle: 3,
                leftcenter: 3
            };
            return function (c, d, e, f) {
                var g = a[b[d]], h = a[b[e]], i = [Math.floor(.5 * Math.abs(g[0] - h[0])) ? -1 : 1, Math.floor(.5 * Math.abs(g[1] - h[1])) ? -1 : 1];
                return r.isCenter(d) || !r.isCenter(e) || f || ("horizontal" == r.getOrientation(e) ? i[0] = 0 : i[1] = 0), {
                    x: i[0] * c.x,
                    y: i[1] * c.y
                }
            }
        }();
        return {
            get: y,
            set: j,
            getInversedPosition: c,
            getTooltipPositionFromTarget: f,
            getAbsoluteOffset: v,
            adjustOffsetBasedOnHooks: x,
            isPointerEvent: m
        }
    }(), B.Position.mouseBuffer = {x: 0, y: 0}, B.Position._mouseBufferHandler = function (a) {
        B.Position.mouseBuffer = {x: a.pageX, y: a.pageY}
    }, B.UpdateQueue = function () {
        function b() {
            a(document.body).append(a(document.createElement("div")).addClass("t_UpdateQueue").append(a(document.createElement("div")).addClass("t_Tooltip").append(a(this.container = document.createElement("div")).addClass("t_Content"))))
        }

        function c(b) {
            return {width: a(b).innerWidth(), height: a(b).innerHeight()}
        }

        function e(b) {
            var d = c(b), e = b.parentNode;
            return e && a(e).css({width: d.width + "px"}) && c(b).height > d.height && d.width++, a(e).css({width: "100%"}), d
        }

        function f(b, c, e) {
            (!this.container || this.container && !d.element.isAttached(this.container)) && this.build();
            var f = b.options, g = a.extend({spinner: !1}, arguments[3] || {});
            !f.inline && !d.isElement(c) || a(c).data("isSpinner") || (f.inline && "string" == a.type(c) && (b.inlineContent = a("#" + c)[0], c = b.inlineContent), !b.inlineMarker && c && d.element.isAttached(c) && (a(b.inlineContent).data("tipped_restore_inline_display", a(b.inlineContent).css("display")), b.inlineMarker = document.createElement("div"), a(b.inlineContent).before(a(b.inlineMarker).hide())));
            var h = document.createElement("div");
            a(this.container).append(a(h).addClass("t_ContentContainer t_clearfix").append(c)), d.isElement(c) && a(c).show(), f.skin && a(h).addClass("t_Content_" + b.options.skin);
            var i = a(h).find("img[src]").filter(function () {
                return !(a(this).attr("height") && a(this).attr("width"))
            });
            if (i.length > 0 && !b.getState("preloading_images")) {
                b.setState("preloading_images", !0), f.spinner && (g.spinner || b.spinner || (b.spinner = b.insertSpinner(f.spinner)), b.getState("visible") && (b.position(), a(b.container).show()), b.spinner.play());
                var j = 0, k = Math.max(8e3, 750 * (i.length || 0));
                b.clearTimer("preloading_images"), b.setTimer("preloading_images", a.proxy(function () {
                    i.each(function () {
                        this.onload = function () {
                        }
                    }), j >= i.length || (this._updateTooltip(b, h), e && e())
                }, this), k), a.each(i, a.proxy(function (c, d) {
                    var f = new Image;
                    f.onload = a.proxy(function () {
                        f.onload = function () {
                        };
                        var c = f.width, g = f.height, k = a(d).attr("width"), l = a(d).attr("height");
                        k && l || (!k && l ? (c = Math.round(l * c / g), g = l) : !l && k && (g = Math.round(k * g / c), c = k), a(d).attr({
                            width: c,
                            height: g
                        }), j++), j == i.length && (b.clearTimer("preloading_images"), b.spinner && (b.spinner.remove(), b.spinner = null), b.getState("visible") && a(b.container).hide(), this._updateTooltip(b, h), e && e())
                    }, this), f.src = d.src
                }, this))
            } else this._updateTooltip(b, h), e && e()
        }

        function g(b, c) {
            var d = e(c), f = {
                width: d.width - (parseInt(a(c).css("padding-left")) || 0) - (parseInt(a(c).css("padding-right")) || 0),
                height: d.height - (parseInt(a(c).css("padding-top")) || 0) - (parseInt(a(c).css("padding-bottom")) || 0)
            };
            b.options.maxWidth && "number" == a.type(b.options.maxWidth) && f.width > b.options.maxWidth && (a(c).css({width: b.options.maxWidth + "px"}), d = e(c)), b._cache.contentDimensions = d, a(b.contentElement).html(c)
        }

        return e = d.wrap(e, function (a, b) {
            var c = a(b);
            return c.height += 13, c
        }), {build: b, update: f, _updateTooltip: g, getMeasureElementDimensions: e}
    }(), a.extend(C.prototype, function () {
        function b(a, b, c) {
            this._cache.timers[a] = d.delay(b, c)
        }

        function c(a) {
            return this._cache.timers[a]
        }

        function e(a) {
            this._cache.timers[a] && (window.clearTimeout(this._cache.timers[a]), delete this._cache.timers[a])
        }

        function f() {
            a.each(this._cache.timers, function (a, b) {
                window.clearTimeout(b)
            }), this._cache.timers = []
        }

        function g(b, c, d, e) {
            c = c;
            var f = a.proxy(d, e || this);
            this._cache.events.push({element: b, eventName: c, handler: f}), a(b).bind(c, f)
        }

        function h() {
            a.each(this._cache.events, function (b, c) {
                a(c.element).unbind(c.eventName, c.handler)
            })
        }

        function j(a, b) {
            this._cache.states[a] = b
        }

        function l(a) {
            return this._cache.states[a]
        }

        function m() {
            this.setEvent(this.element, "mouseenter", this.setActive), this.setEvent(this.element, "mouseleave", a.proxy(function (a) {
                this.setIdle(a)
            }, this)), this.options.showOn && a.each(this.options.showOn, a.proxy(function (b, c) {
                var d = !1;
                "click" == c && (this.options.hideOn && a.each(this.options.hideOn, function (a, b) {
                    return "self" == b.element && "click" == b.event ? (d = !0, !1) : void 0
                }), this.setState("toggles", d)), this.setEvent(this.element, c, "click" == c ? d ? this.toggle : this.show : a.proxy(function () {
                    this.showDelayed()
                }, this))
            }, this)), this.options.hideOn ? a.each(this.options.hideOn, a.proxy(function (b, c) {
                var d;
                switch (c.element) {
                    case"self":
                        if (this.getState("toggles") && "click" == c.event)return;
                        d = this.element;
                        break;
                    case"target":
                        d = this.target
                }
                d && this.setEvent(d, c.event, "click" == c.event ? this.hide : a.proxy(function () {
                    this.hideDelayed()
                }, this))
            }, this)) : this.options.showDelay && this.options.showOn && !a.inArray("click", this.options.showOn) > -1 && this.setEvent(this.element, "mouseleave", a.proxy(function () {
                this.clearTimer("show")
            }, this));
            var b = !1;
            !this.options.fixed && this.options.showOn && ((b = a.inArray("mousemove", this.options.showOn) > -1) || a.inArray("touchmove", this.options.showOn) > -1) && "mouse" == this.target && this.setEvent(this.element, b ? "mousemove" : "touchmove", function (a) {
                this.getState("skinned") && this.position(a)
            })
        }

        function n() {
            this.setEvent(this.container, Tipped.support.touch ? "touchmove" : "mouseenter", this.setActive), this.setEvent(this.container, "mouseleave", this.setIdle), this.setEvent(this.container, Tipped.support.touch ? "touchmove" : "mouseenter", a.proxy(function () {
                this.getTimer("fadeTransition") || this.show()
            }, this)), this.options.hideOn && a.each(this.options.hideOn, a.proxy(function (b, c) {
                var d;
                switch (c.element) {
                    case"tooltip":
                        d = this.container
                }
                d && this.setEvent(d, c.event, c.event.match(/^(click|mousemove|mouseenter)$/) ? this.hide : a.proxy(function () {
                    this.hideDelayed()
                }, this))
            }, this))
        }

        function o(a, b, c) {
            var d = u.get(this.element);
            d && d.setHookPositionAndStemCorrection(a, b, c)
        }

        function p(a) {
            var b = u.get(this.element);
            b && b.setHookPosition(a)
        }

        function q() {
            this.setHookPosition(this.options.hook.tooltip)
        }

        function r() {
            a(this.container = document.createElement("div")).addClass("t_Tooltip").addClass("hidden-xs"), this.createPreBuildObservers()
        }

        function s() {
            this.build();
            var a = u.get(this.element);
            a ? a.build() : (new v(this.element), this.setState("skinned", !0))
        }

        function t() {
            this.getState("build") || (a(document.body).append(a(this.container).css({
                left: "-10000px",
                top: "-10000px",
                zIndex: this.zIndex
            }).append(a(this.skinElement = document.createElement("div")).addClass("t_Skin")).append(a(this.contentElement = document.createElement("div")).addClass("t_Content"))), a(this.container).addClass("t_Tooltip_" + this.options.skin), this.options.hideOnClickOutside && (a(this.element).addClass("t_hideOnClickOutside"), this.setEvent(document.documentElement, "click", a.proxy(function (b) {
                if (this.visible()) {
                    var c = a(b.target).closest(".t_Tooltip, .t_hideOnClickOutside")[0];
                    (!c || c && c != this.container && c != this.element) && this.hide()
                }
            }, this))), Tipped.support.cssTransitions && (this.options.fadeIn || this.options.fadeOut) && (this.setFadeDuration(this.options.fadeIn), a(this.container).addClass("t_hidden")), this.createPostBuildObservers(), this.setState("build", !0), B.add(this))
        }

        function w() {
            var c;
            this.content, this.inlineMarker && this.inlineContent && ((c = a(this.inlineContent).data("tipped_restore_inline_display")) && a(this.inlineContent).css({display: c}), a(this.inlineMarker).before(this.inlineContent).remove(), this.inlineMarker = null)
        }

        function x() {
            d.defer(a.proxy(function () {
                this.clearEvents()
            }, this)), this.clearTimers(), this._restoreInlineContent(), d.defer(a.proxy(function () {
                a(this.container).find("img[src]").unbind("load")
            }, this)), u.remove(this.element), this.getState("build") && this.container && (a(this.container).remove(), this.container = null);
            var c, b = "tipped_restore_title";
            (c = a(this.element).data(b)) && a(this.element).attr("title", c).removeData("tipped_restore_title"), a(this.element).removeData("tipped-uid")
        }

        function y(b) {
            var c = a.extend({afterUpdate: this.options.afterUpdate, spinner: !1}, arguments[1] || {});
            this.build(), this.getState("visible") && a(this.container).hide(), B.UpdateQueue.update(this, b, a.proxy(function () {
                var b = this.getState("visible");
                b || this.setState("visible", !0), this._buildSkin(), b || this.setState("visible", !1), this.getState("visible") && (a(this.container).hide(), this.position(), this.raise(), a(this.container).show()), this.setState("updated", !0), c.afterUpdate && c.afterUpdate(this.contentElement.firstChild, this.element), c.callback && c.callback()
            }, this), {spinner: c.spinner})
        }

        function z(b) {
            var c, d = {
                url: this.content,
                type: this.options.ajax.type,
                data: this.options.ajax.data || {},
                dataType: this.options.ajax.dataType || "html"
            };
            if (!(this.getState("xhr") || this.options.ajax.cache && this.getState("updated"))) {
                if (this.options.ajax.cache && (c = i.get(d)))return this.afterAjaxUpdate(c, {
                    callback: a.proxy(function () {
                        this.getState("visible") && this.options.onShow && this.options.onShow(this.contentElement.firstChild, this.element)
                    }, this)
                }), void 0;
                this.setState("xhr", !0), this.options.spinner && (this.spinner ? this.spinner.play() : (this.spinner = this.insertSpinner(this.options.spinner), this.setState("updated", !1)), this.position(b)), this._cache.xhr && (this._cache.xhr.abort(), this._cache.xhr = null), this._cache.xhr = a.ajax(a.extend({}, d, {
                    success: a.proxy(function (b, c, e) {
                        0 !== e.status && (i.set(d, e.responseText), this.afterAjaxUpdate(e.responseText, {
                            callback: a.proxy(function () {
                                this.setState("xhr", !1), this.getState("visible") && this.options.onShow && this.options.onShow(this.contentElement.firstChild, this.element), this.spinner && (this.spinner.remove(), this.spinner = null)
                            }, this)
                        }))
                    }, this)
                }))
            }
        }

        function A(b) {
            var c = a.extend({spinner: this.options.spinner && this.spinner}, arguments[1] || {});
            this.update(b, c)
        }

        function C() {
            var b = document.createElement("div");
            a(b).data("isSpinner", !0);
            var c = Spinners.create(b, a.extend({}, arguments[0] || {})), d = Spinners.getDimensions(b);
            return a(b).css(k(d)), this.update(b, {
                afterUpdate: !1, callback: function () {
                    c.play()
                }
            }), c
        }

        function E() {
            if (this.getState("build") && !this.options.zIndex) {
                var b = B.getHighestTooltip();
                b && b != this && this.zIndex <= b.zIndex && a(this.container).css({zIndex: this.zIndex = b.zIndex + 1})
            }
        }

        function F() {
            var a = u.get(this.element);
            a && (a.refresh(), this.visible() && this.position())
        }

        function G(a) {
            if (Tipped.support.cssTransitions) {
                a = a || 0;
                var b = this.container.style;
                b.MozTransitionDuration = a + "ms", b.webkitTransitionDuration = a + "ms", b.OTransitionDuration = a + "ms", b.transitionDuration = a + "ms"
            }
        }

        function H(b) {
            this.clearTimer("hide"), this.clearTimer("fadeTransition"), this.getState("visible") || this.getTimer("show") || this.setTimer("show", a.proxy(function () {
                this.clearTimer("show"), this.show(b)
            }, this), this.options.showDelay || 1)
        }

        function I(b) {
            if (this.clearTimer("hide"), this.clearTimer("fadeTransition"), !this.visible()) {
                if ("function" == a.type(this.content) || "function" == a.type(this._cache.contentFunction)) {
                    "function" != a.type(this._cache.contentFunction) && (this._cache.contentFunction = this.content);
                    var c = this._cache.contentFunction(this.element) || !1;
                    if (c != this._cache.fnCallContent && (this._cache.fnCallContent = c, this.setState("updated", !1), this._restoreInlineContent()), this.content = c, !c)return
                }
                this.options.hideOthers && B.hideAll(), this.setState("visible", !0), this.options.ajax ? this.ajaxUpdate(b) : this.getState("updated") || this.update(this.content), this.getState("skinned") && this.position(b), this.raise(), this.options.hideAfter && d.defer(a.proxy(function () {
                    this.setActive()
                }, this)), "function" == a.type(this.options.onShow) && (!this.options.ajax || this.options.ajax && this.options.ajax.cache && this.getState("updated")) && this.options.onShow(this.contentElement.firstChild, this.element), Tipped.support.cssTransitions && (this.options.fadeIn || this.options.fadeOut) && (this.setFadeDuration(this.options.fadeIn), a(this.container).addClass("t_visible").removeClass("t_hidden")), a(this.container).show()
            }
        }

        function J() {
            this.clearTimer("show"), this.getState("visible") && (this.setState("visible", !1), Tipped.support.cssTransitions && (this.options.fadeIn || this.options.fadeOut) ? (this.setFadeDuration(this.options.fadeOut), a(this.container).removeClass("t_visible").addClass("t_hidden"), this.setTimer("fadeTransition", a.proxy(this._hide, this), this.options.fadeOut)) : this._hide(), this._cache.xhr && (this._cache.xhr.abort(), this._cache.xhr = null, this.setState("xhr", !1)))
        }

        function K() {
            this.getState("build") && (a(this.container).css({
                left: "-10000px",
                top: "-10000px"
            }), B.resetZ(), "function" != a.type(this.options.onHide) || this.spinner || this.options.onHide(this.contentElement.firstChild, this.element))
        }

        function L() {
            this.clearTimer("show"), !this.getTimer("hide") && this.getState("visible") && this.setTimer("hide", a.proxy(function () {
                this.clearTimer("hide"), this.clearTimer("fadeTransition"), this.hide()
            }, this), this.options.hideDelay || 1)
        }

        function M(a) {
            this[this.visible() ? "hide" : "show"](a)
        }

        function N() {
            return this.getState("visible")
        }

        function O() {
            this.setState("active", !0), this.getState("visible") && this.raise(), this.options.hideAfter && this.clearTimer("idle")
        }

        function P() {
            this.setState("active", !1), this.options.hideAfter && this.setTimer("idle", a.proxy(function () {
                this.clearTimer("idle"), this.getState("active") || this.hide()
            }, this), this.options.hideAfter)
        }

        var D = function (b) {
            if (this.visible()) {
                var c;
                if ("mouse" == this.options.target) {
                    var e = B.Position.isPointerEvent(b), f = B.Position.mouseBuffer;
                    if (e)f.x || f.y ? (this._cache.event = {x: f.x, y: f.y}, c = null) : c = b; else {
                        if (f.x || f.y)this._cache.event = {x: f.x, y: f.y}; else if (!this._cache.event) {
                            var g = B.Position.getAbsoluteOffset(this.element);
                            this._cache.event = {x: g.left, y: g.top}
                        }
                        c = null
                    }
                } else c = this.target;
                if (B.Position.set(this, this.options.hook.tooltip, c, this.options.hook.target), b && B.Position.isPointerEvent(b)) {
                    var h = {
                        width: a(this.container).outerWidth(),
                        height: a(this.container).outerHeight()
                    }, i = d.pointer(b), g = d.element.cumulativeOffset(this.container);
                    i.x >= g.left && i.x <= g.left + h.width && i.y >= g.top && i.y <= g.top + h.height && d.defer(a.proxy(function () {
                        this.clearTimer("hide")
                    }, this))
                }
            }
        };
        return {
            build: t,
            _preBuild: r,
            _buildSkin: s,
            createPreBuildObservers: m,
            createPostBuildObservers: n,
            show: I,
            hide: J,
            _hide: K,
            toggle: M,
            visible: N,
            showDelayed: H,
            hideDelayed: L,
            setFadeDuration: G,
            setState: j,
            getState: l,
            setActive: O,
            setIdle: P,
            getTimer: c,
            setTimer: b,
            clearTimer: e,
            clearTimers: f,
            setEvent: g,
            clearEvents: h,
            setHookPositionAndStemCorrection: o,
            setHookPosition: p,
            resetHookPosition: q,
            refresh: F,
            update: y,
            ajaxUpdate: z,
            afterAjaxUpdate: A,
            insertSpinner: C,
            position: D,
            raise: E,
            _restoreInlineContent: w,
            remove: x
        }
    }()), Tipped.init()
}(jQuery);

//eval(function (p, a, c, k, e, r) {
//    e = function (c) {
//        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
//    };
//    if (!''.replace(/^/, String)) {
//        while (c--)r[e(c)] = k[c] || e(c);
//        k = [function (e) {
//            return r[e]
//        }];
//        e = function () {
//            return '\\w+'
//        };
//        c = 1
//    }
//    ;
//    while (c--)if (k[c])p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
//    console.log(p);
//    return p
//}('!12(a){12 c(a,b){14 c=[a,b];1b c.17=a,c.18=b,c}12 f(a){1K.5A&&5A[5A.6H?"6H":"8o"](a)}12 j(a){11.1h=a}12 k(a){14 b={};28(14 c 5B a)b[c]=a[c]+"2z";1b b}12 l(a,b){1b 1d.8p(a*a+b*b)}12 m(a){1b 2H*a/1d.32}12 n(a){1b a*1d.32/2H}12 o(a){1b 1/1d.4H(a)}12 v(b){1g(b){11.1h=b,u.1z(b);14 c=11.2g();11.1a=a.1m({},c.1a),11.2A=1,11.1q={},11.1W=a(b).1Y("2t-1W"),u.33(11),11.2b=11.1a.1v.1E,11.6I=11.1a.1n&&11.2b,11.3e={x:0,y:0},11.3o={18:0,17:0},11.1R()}}12 x(b,c){11.1h=b,11.1h&&c&&(11.1a=a.1m({34:3,1B:{x:0,y:0},1F:"#4I",1N:.5,2O:1},22[2]||{}),11.2A=11.1a.2O,11.1q={},11.1W=a(b).1Y("2t-1W"),w.33(11),11.1R())}12 z(b){11.1h=b,11.1h&&(11.1a=a.1m({34:5,1B:{x:0,y:0},1F:"#4I",1N:.5,2O:1},22[1]||{}),11.2A=11.1a.2O,11.1W=a(b).1Y("2t-1W"),y.33(11),11.1R())}12 A(b,c){28(14 d 5B c)c[d]&&c[d].3H&&c[d].3H===5C?(b[d]=a.1m({},b[d])||{},A(b[d],c[d])):b[d]=c[d];1b b}12 C(b,c){1g(11.1h=b,11.1h){14 e=a(b).1Y("2t-1W");e&&B.1z(b),e=h(),a(b).1Y("2t-1W",e),11.1W=e;14 f;"8q"!=a.1r(c)||d.2m(c)?f=22[2]||{}:(f=c,c=1s),11.1a=B.6J(f);14 g=b.6K("5D");1g(!c){14 i=b.6K("1Y-2t");i?c=i:g&&(c=g)}g&&(a(b).1Y("5E",g),b.8r("5D","")),11.2I=c,11.2n=11.1a.2n||+B.1a.4J,11.1q={2J:{15:1,19:1},5F:[],3f:[],2u:{4K:!1,2o:!1,1O:!1,3g:!1,1R:!1,4L:!1,5G:!1,3I:!1},5H:""};14 j=11.1a.1D;11.1D="2P"==j?"2P":"4M"!=j&&j?d.2m(j)?j:j&&1y.6L(j)||11.1h:11.1h,11.6M(),B.33(11)}}14 b=6N.3J.8s,d={6O:12(c,d){14 e=c;1b 12(){14 c=[a.1w(e,11)].6P(b.5I(22));1b d.5J(11,c)}},2m:12(a){1b a&&1==a.8t},4N:12(a,c){14 d=b.5I(22,2);1b 8u(12(){1b a.5J(a,d)},c)},48:12(a){1b d.4N.5J(11,[a,1].6P(b.5I(22,1)))},5K:12(a){1b{x:a.5L,y:a.6Q}},1h:{4O:12(a){14 b=0,d=0;8v b+=a.4P||0,d+=a.4Q||0,a=a.4R;8w(a);1b c(d,b)},4S:12(b){14 e=a(b).1B(),f=d.1h.4O(b),g={18:a(1K).4P(),17:a(1K).4Q()};1b e.17+=f.17-g.17,e.18+=f.18-g.18,c(e.17,e.18)},4T:12(){12 a(a){28(14 b=a;b&&b.4R;)b=b.4R;1b b}1b 12(b){14 c=a(b);1b!(!c||!c.35)}}()}},e=12(a){12 b(b){14 c=2K 5M(b+"([\\\\d.]+)").8x(a);1b c?5N(c[1]):!0}1b{3p:!(!1K.8y||-1!==a.3q("5O"))&&b("8z "),5O:a.3q("5O")>-1&&(!!1K.5P&&5P.6R&&5N(5P.6R())||7.55),5Q:a.3q("6S/")>-1&&b("6S/"),4U:a.3q("4U")>-1&&-1===a.3q("8A")&&b("8B:"),6T:!!a.3h(/8C.*8D.*8E/),4V:a.3q("4V")>-1&&b("4V/")}}(8F.8G),g={36:{49:{5R:"1.4.4",5S:1K.49&&49.8H.8I}},6U:12(){12 b(b){28(14 c=b.3h(a),d=c&&c[1]&&c[1].2Q(".")||[],e=0,f=0,g=d.1Z;g>f;f++)e+=2B(d[f]*1d.6V(10,6-2*f));1b c&&c[3]?e-1:e}14 a=/^(\\d+(\\.?\\d+){0,3})([A-6W-8J-]+[A-6W-8K-9]+)?/;1b 12(a){11.36[a].6X||(11.36[a].6X=!0,(!11.36[a].5S||b(11.36[a].5S)<b(11.36[a].5R)&&!11.36[a].6Y)&&(11.36[a].6Y=!0,f("1S 8L "+a+" >= "+11.36[a].5R)))}}()},h=12(){14 a=0,b="8M";1b 12(c){28(c=c||b,a++;1y.6L(c+a);)a++;1b c+a}}(),i=12(){14 b=[];1b{1u:12(c){28(14 d=1s,e=0;e<b.1Z;e++)b[e]&&b[e].4a==c.4a&&b[e].1r.6Z()==c.1r.6Z()&&a.70(b[e].1Y||{})==a.70(c.1Y||{})&&(d=b[e].4W);1b d},4X:12(c,d){11.1z(c.4a),b.2p(a.1m({},c,{4W:d}))},1z:12(a){28(14 c=0;c<b.1Z;c++)b[c]&&b[c].4a==a&&3K b[c]},71:12(){b=[]}}}();a.1m(1S,12(){1b{2C:{3i:12(){14 a=1y.25("3i");1b!(!a.3r||!a.3r("2d"))}(),3s:12(){72{1b!!("8N"5B 1K||1K.73&&1y 8O 73)}74(a){1b!1}}(),4b:12(){14 b=["8P","75","8Q"],c=!!1K.75;1b a.1x(b,12(a,b){72{1y.8R(b),c=!0}74(d){}}),c}()},3t:12(){(11.2C.3i||e.3p)&&(g.6U("49"),B.3u.1j&&(a(B.3u.1j).1z(),B.3u.1j=1s),a(1y).8S(12(){B.76(),B.77()}))},4Y:12(a,b,c){1b j.4Y(a,b,c),11.1u(a)},1u:12(a){1b 2K j(a)},5T:12(a){1b B.5T(a)},1X:12(a){1b 11.1u(a).1X(),11},1L:12(a){1b 11.1u(a).1L(),11},37:12(a){1b 11.1u(a).37(),11},2R:12(a){1b 11.1u(a).2R(),11},1z:12(a){1b 11.1u(a).1z(),11},4Z:12(){1b B.4Z(),11},5U:12(a){1b B.5U(a),11},5V:12(a){1b B.5V(a),11},1O:12(b){1g(d.2m(b))1b B.5W(b);1g("5X"!=a.1r(b)){14 c=a(b),e=0;1b a.1x(c,12(a,b){B.5W(b)&&e++}),e}1b B.3L().1Z},5Y:12(){1b B.5Y(),11}}}()),a.1m(j,{4Y:12(b,c){1g(b){14 e=22[2]||{},f=[];1b B.78(),d.2m(b)?f.2p(2K C(b,c,e)):a(b).1x(12(a,b){f.2p(2K C(b,c,e))}),f}}}),a.1m(j.3J,{4c:12(){1b B.2h.51={x:0,y:0},B.1u(11.1h)},1X:12(){1b a.1x(11.4c(),12(a,b){b.1X()}),11},1L:12(){1b a.1x(11.4c(),12(a,b){b.1L()}),11},37:12(){1b a.1x(11.4c(),12(a,b){b.37()}),11},2R:12(){1b a.1x(11.4c(),12(a,b){b.2R()}),11},1z:12(){1b B.1z(11.1h),11}});14 p={52:12(){14 b;1b b=e.6T?{15:1K.5Z,19:1K.60}:{19:a(1K).19(),15:a(1K).15()}}},q={3v:1d.1G(1d.53(1K.3v?5N(1K.3v)||1:1,2)),3t:12(){12 a(a){14 b=a.3r("2d");b.8T(q.3v,q.3v)}1b 1K.54&&!1S.2C.3i&&e.3p?12(b){54.8U(b),a(b)}:12(b){a(b)}}(),3w:12(b,c){a(b).3j({15:c.15*11.3v,19:c.19*11.3v}).1p(k(c))},79:12(b){14 c=a.1m({18:0,17:0,15:0,19:0,1o:0},22[1]||{}),d=c,e=d.17,f=d.18,g=d.15,h=d.19,i=d.1o;1b i?(b.2i(),b.3x(e+i,f),b.29(e+g-i,f+i,i,n(-90),n(0),!1),b.29(e+g-i,f+h-i,i,n(0),n(90),!1),b.29(e+i,f+h-i,i,n(90),n(2H),!1),b.29(e+i,f+i,i,n(-2H),n(-90),!1),b.2j(),b.38(),3y 0):(b.7a(e,f,g,h),3y 0)},7b:12(b,c){28(14 d=a.1m({x:0,y:0,1F:"#4I"},22[2]||{}),e=0,f=c.1Z;f>e;e++)28(14 g=0,h=c[e].1Z;h>g;g++){14 i=2B(c[e].3z(g))*(1/9);b.2S=t.2T(d.1F,i),i&&b.7a(d.x+g,d.y+e,1,1)}},4d:12(b,c){14 d;1g("2v"==a.1r(c))d=t.2T(c);1I 1g("2v"==a.1r(c.1F))d=t.2T(c.1F,"2D"==a.1r(c.1N)?c.1N:1);1I 1g(a.61(c.1F)){14 e=a.1m({3M:0,3N:0,3O:0,3P:0},22[2]||{});d=q.7c.7d(b.8V(e.3M,e.3N,e.3O,e.3P),c.1F,c.1N)}1b d}};q.7c={7d:12(b,c){28(14 d="2D"==a.1r(22[2])?22[2]:1,e=0,f=c.1Z;f>e;e++){14 g=c[e];("5X"==a.1r(g.1N)||"2D"!=a.1r(g.1N))&&(g.1N=1),b.8W(g.1e,t.2T(g.1F,g.1N*d))}1b b}};14 r={7e:["3Q","4e","3R","3S","4f","4g","4h","4i","4j","4k","4l","3T"],4m:{7f:/^(18|17|1T|1Q)(18|17|1T|1Q|2w|2U)$/,1M:/^(18|1T)/,39:/(2w|2U)/,7g:/^(18|1T|17|1Q)/},7h:12(){14 a={18:"19",17:"15",1T:"19",1Q:"15"};1b 12(b){1b a[b]}}(),39:12(a){1b!!a.3A().3h(11.4m.39)},7i:12(a){1b!11.39(a)},2L:12(a){1b a.3A().3h(11.4m.1M)?"1M":"2c"},62:12(a){14 b=1s,c=a.3A().3h(11.4m.7g);1b c&&c[1]&&(b=c[1]),b},2Q:12(a){1b a.3A().3h(11.4m.7f)}},s={63:12(a){14 b=a.1a.1n;1b{15:b.15,19:b.19}},4n:12(b,c){14 d=a.1m({3U:"1G"},22[2]||{}),e=b.1a.1n,f=e.15,g=e.19,h=11.56(f,g,c);1b d.3U&&(h.15=1d[d.3U](h.15),h.19=1d[d.3U](h.19)),{15:h.15,19:h.19}},56:12(a,b,c){14 d=m(1d.7j(.5*(b/a))),e=2H-d,f=1d.4H(n(e-90))*c,g=a+2*f,h=g*b/a;1b{15:g,19:h}},3V:12(a,b){14 c=11.4n(a,b),d=11.63(a),f=(r.39(a.2b),1d.1G(c.19+b));1b a.1a.1n.1B||0,a.1a.1o&&a.1a.1o.2x||0,{2E:{1c:{15:1d.1G(c.15),19:1d.1G(f)}},1k:{1c:c},1n:{1c:{15:d.15,19:d.19}}}},64:12(b,c,d){14 f=b.1a,g={18:0,17:0},h={18:0,17:0},i=a.1m({},c),j=b.1k,k=k||11.3V(b,b.1k),l=k.2E.1c;d&&(l.19=d,j=0);14 m=r.2Q(b.2b),n=r.2L(b.2b);1g(b.1a.1n){14 o=r.62(b.2b);1g("18"==o?g.18=l.19-j:"17"==o&&(g.17=l.19-j),"1M"==n){1V(m[2]){1i"2w":1i"2U":h.17=.5*i.15;1C;1i"1Q":h.17=i.15}"1T"==m[1]&&(h.18=i.19-j+l.19)}1I{1V(m[2]){1i"2w":1i"2U":h.18=.5*i.19;1C;1i"1T":h.18=i.19}"1Q"==m[1]&&(h.17=i.15-j+l.19)}i[r.7h(o)]+=l.19-j}1I 1g("1M"==n){1V(m[2]){1i"2w":1i"2U":h.17=.5*i.15;1C;1i"1Q":h.17=i.15}"1T"==m[1]&&(h.18=i.19)}1I{1V(m[2]){1i"2w":1i"2U":h.18=.5*i.19;1C;1i"1T":h.18=i.19}"1Q"==m[1]&&(h.17=i.15)}14 p=f.1o&&f.1o.2x||0,q=f.1k&&f.1k.2x||0;1g(b.1a.1n){14 t=p&&"1l"==f.1o.1e?p:0,u=p&&"1k"==f.1o.1e?p:p+q,v=q+t+.5*k.1n.1c.15-.5*k.1k.1c.15,w=u>v?u-v:0,x=1d.1G(q+t+.5*k.1n.1c.15+w);1g("1M"==n)1V(m[2]){1i"17":h.17+=x;1C;1i"1Q":h.17-=x}1I 1V(m[2]){1i"18":h.18+=x;1C;1i"1T":h.18-=x}}14 y;1g(f.1n&&(y=f.1n.1B)){14 z=s.65(y,b.6I,c,k.1k.1c,q,p);1g(y=z.1B,z.4o,"1M"==n)1V(m[2]){1i"17":h.17+=y.x;1C;1i"1Q":h.17-=y.x}1I 1V(m[2]){1i"18":h.18+=y.y;1C;1i"1T":h.18-=y.y}}14 B;1g(f.1n&&(B=f.1n.8X))1g("1M"==n)1V(m[1]){1i"18":h.18-=B;1C;1i"1T":h.18+=B}1I 1V(m[1]){1i"17":h.17-=B;1C;1i"1Q":h.17+=B}1b{1c:i,1e:{18:0,17:0},1l:{1e:g,1c:c},1n:{1c:l},2M:h}},65:12(b,c,d,e,f,g){14 h=r.2L(c),i=a.1m({},b),j={x:0,y:0},k=0;1b"1M"==h&&(k=d.15-e.15-2*f-2*g)<2*b.x&&(j.x=i.x,/(1Q)$/.3k(c)&&(j.x*=-1),i.x=0),"2c"==h&&(k=d.19-e.19-2*f-2*g)<2*b.y&&(j.y=i.y,/(1T)$/.3k(c)&&(j.y*=-1),i.y=0),{1B:i,4o:j}}},t=12(){12 d(a){14 b=a;1b b.7k=a[0],b.7l=a[1],b.7m=a[2],b}12 e(a){1b 2B(a,16)}12 f(a){14 b=2K 6N(3);1g(0==a.3q("#")&&(a=a.57(1)),a=a.3A(),""!=a.66(c,""))1b 1s;3==a.1Z?(b[0]=a.3z(0)+a.3z(0),b[1]=a.3z(1)+a.3z(1),b[2]=a.3z(2)+a.3z(2)):(b[0]=a.57(0,2),b[1]=a.57(2,4),b[2]=a.57(4));28(14 f=0;f<b.1Z;f++)b[f]=e(b[f]);1b d(b)}12 g(a,b){14 c=f(a);1b c[3]=b,c.1N=b,c}12 h(b,c){1b"5X"==a.1r(c)&&(c=1),"8Y("+g(b,c).8Z()+")"}12 i(a){1b"#"+(j(a)[2]>50?"4I":"91")}12 j(a){1b k(f(a))}12 k(a){14 f,g,h,a=d(a),b=a.7k,c=a.7l,e=a.7m,i=b>c?b:c;e>i&&(i=e);14 j=c>b?b:c;1g(j>e&&(j=e),h=i/92,g=0!=i?(i-j)/i:0,0==g)f=0;1I{14 k=(i-b)/(i-j),l=(i-c)/(i-j),m=(i-e)/(i-j);f=b==i?m-l:c==i?2+k-m:4+l-k,f/=6,0>f&&(f+=1)}f=1d.26(7n*f),g=1d.26(67*g),h=1d.26(67*h);14 n=[];1b n[0]=f,n[1]=g,n[2]=h,n.93=f,n.94=g,n.95=h,n}14 b="96",c=2K 5M("["+b+"]","g");1b{97:f,2T:h,7o:i}}(),u={58:{},1u:12(b){1g(!b)1b 1s;14 c=1s,d=a(b).1Y("2t-1W");1b d&&(c=11.58[d]),c},33:12(a){11.58[a.1W]=a},1z:12(a){14 b=11.1u(a);b&&(3K 11.58[b.1W],b.1z())}};a.1m(v.3J,12(){12 b(){11.1q.1v={};14 b=11.2b;a.1x(r.7e,a.1w(12(b,c){14 d,e=11.1q.1v[c]={};11.2b=c;14 f=11.2q();d=f,e.2M=d.2M;14 g=d.1J.1c,h={18:d.1J.1e.18,17:d.1J.1e.17};1g(e.1J={1c:g,1e:h},e.1E={1c:d.23.1c},11.1t){14 i=11.1t.2q(),j=i.23.1e,k=e.1J.1e;a.1m(!0,e,{2M:i.2M,1J:{1e:{18:k.18+j.18,17:k.17+j.17}},1E:{1c:i.1E.1c}})}},11)),11.2b=b}12 c(){11.3a(),11.1a.1t&&(w.1z(11.1h),11.1a.1A&&11.1a.1A.1t&&y.1z(11.1h)),11.2V&&(11.2V.1z(),11.2V=1s),11.1j&&(a(11.1j).1z(),11.1j=1s)}12 d(){11.1J&&(11.1A&&(a(11.1A).1z(),11.1A=1s,11.68=1s,11.69=1s),a(11.1J).1z(),11.1n=1s,11.1l=1s,11.1J=1s,11.1q={})}12 f(){14 a=11.2g();11.2J=a.1q.2J;14 b=a.1a;11.1o=b.1o&&b.1o.2x||0,11.1k=b.1k&&b.1k.2x||0,11.2e=b.2e;14 c=1d.53(11.2J.19,11.2J.15);11.1o>c/2&&(11.1o=1d.6a(c/2)),"1k"==11.1a.1o.1e&&11.1o>11.1k&&(11.1k=11.1o),11.1q={1a:{1o:11.1o,1k:11.1k,2e:11.2e}}}12 g(){11.3a(),1K.54&&1K.54.98(1y);14 b=11.2g(),c=11.1a;11.1J=a("<2k>").20("99")[0],a(b.59).21(11.1J),11.5a(),11.7p(b),c.1A&&(11.7q(b),c.1A.1t&&(11.2W?(11.2W.1a=c.1A.1t,11.2W.1R()):11.2W=2K z(11.1h,a.1m({2O:11.2A},c.1A.1t)))),e.3p&&e.3p<7&&a(b.1j).6b(11.2V=a("<9a>").20("9b").3j({9c:0,4p:"9d:\'\';"})),11.5b(),c.1t&&(11.1t?(11.1t.1a=c.1t,11.1t.1R()):11.1t=2K x(11.1h,11,a.1m({2O:11.2A},c.1t))),11.7r()}12 h(){14 b=11.2g(),c=a(b.1j),d=a(b.1j).6c(".7s").7t()[0];1g(d){a(d).1p({15:"6d",19:"6d"});14 e=2B(c.1p("18")),f=2B(c.1p("17")),g=2B(c.1p("15"));c.1p({17:"-7u",18:"-7u",15:"9e",19:"6d"}),b.1H("1O")||a(b.1j).1X();14 h=B.3u.6e(d);b.1a.3l&&"2D"==a.1r(b.1a.3l)&&h.15>b.1a.3l&&(a(d).1p({15:b.1a.3l+"2z"}),h=B.3u.6e(d)),b.1H("1O")||a(b.1j).1L(),b.1q.2J=h,c.1p({17:f+"2z",18:e+"2z",15:g+"2z"}),11.1R()}}12 i(a,b,c){14 d=!1;11.4q(a)&&(d=!0),11.7v(b)&&(d=!0),c&&11.7w(c)&&(d=!0),d&&11.1R()}12 j(a){14 b=!1;1b(11.3o.17!=a.17||11.3o.18!=a.18)&&(b=!0,11.3o=a),b}12 l(a){14 b=!1;1b(11.3e.x!=a.x||11.3e.y!=a.y)&&(b=!0,11.3e=a),b}12 m(a){14 c=!1;1b 11.2b!=a&&(c=!0,11.2b=a),c}12 o(){1b B.1u(11.1h)[0]}12 p(){1b s.3V(11,11.1k)}12 u(){14 b=11.2g().1a.1A,c=b.3B+2*b.1k;a(11.68).1p({17:-1*c+"2z"}),a(11.69).1p({17:0})}12 v(){14 b=11.2g().1a.1A,c=b.3B+2*b.1k;a(11.68).1p({17:0}),a(11.69).1p({17:c+"2z"})}12 A(b){14 c=b.1a.1A,d={15:c.3B+2*c.1k,19:c.3B+2*c.1k};a(b.1j).21(a(11.1A=1y.25("2k")).20("6f").1p(k(d)).21(a(11.7x=1y.25("2k")).20("9f").1p(k(d)))),11.6g(b,"6h"),11.6g(b,"6i"),1S.2C.3s||e.4V||a(11.1A).3W("4r",a.1w(11.7y,11)).3W("5c",a.1w(11.7z,11))}12 C(b,c){14 d=b.1a.1A,e=d.3B,f=d.1k||0,g=d.x.3B,h=d.x.2x,j=(d.x.9g,d.2u[c||"6h"]),l={15:e+2*f,19:e+2*f};g>=e&&(g=e-2);14 m;a(11.7x).21(a(11[c+"7A"]=1y.25("2k")).20("9h").1p(a.1m(k(l),{17:("6i"==c?l.15:0)+"2z"}))),a(1y.35).21(a(m=1y.25("3i"))),q.3w(m,l),q.3t(m);14 o=m.3r("2d");o.2O=11.2A,a(11[c+"7A"]).21(m),o.9i(l.15/2,l.19/2),o.2S=q.4d(o,j.1l,{3M:0,3N:0-e/2,3O:0,3P:0+e/2}),o.2i(),o.29(0,0,e/2,0,2*1d.32,!0),o.2j(),o.38(),f&&(o.2S=q.4d(o,j.1k,{3M:0,3N:0-e/2-f,3O:0,3P:0+e/2+f}),o.2i(),o.29(0,0,e/2,1d.32,0,!1),o.1f((e+f)/2,0),o.29(0,0,e/2+f,0,1d.32,!0),o.29(0,0,e/2+f,1d.32,0,!0),o.1f(e/2,0),o.29(0,0,e/2,0,1d.32,!1),o.2j(),o.38());14 p=g/2,r=h/2;1g(r>p){14 s=r;r=p,p=s}o.2S=t.2T(j.x.1F||j.x,j.x.1N||1),o.5d(n(45)),o.2i(),o.3x(0,0),o.1f(0,p);28(14 u=0;4>u;u++)o.1f(0,p),o.1f(r,p),o.1f(r,p-(p-r)),o.1f(p,r),o.1f(p,0),o.5d(n(90));o.2j(),o.38()}12 D(b){14 l,m,o,p,q,c=a.1m({1n:!1,3C:1s,9j:1s,2i:!1,2j:!1,3D:1s,3E:1s,1o:0,1k:0,5e:0,3b:{x:0,y:0}},22[1]||{}),d=c.3D,e=c.3E,f=c.3b,g=c.1k,h=c.1o,i=c.3C,j=d.1l.1e,k=d.1l.1c,t={x:1d.2X(11.3e.x),y:1d.2X(11.3e.y)},u={x:0,y:0},v={x:0,y:0};1g(e){l=e.1n.1c,m=e.2E.1e,o=e.2E.1c,p=o.15-l.15;14 w=c.5e,x=g+h+.5*l.15-.5*e.1k.1c.15;q=1d.1G(w>x?w-x:0);14 y=s.65(f,i,k,e.1k.1c,g,h);f=y.1B,v=y.4o,u={x:1d.1U(k.15-2*1d.1U(q,f.x||0)-e.1k.1c.15-(2*h||0),0),y:1d.1U(k.19-2*1d.1U(q,f.y||0)-e.1k.1c.19-(2*h||0),0)},r.39(i)&&(u.x*=.5,u.y*=.5),t.x=1d.53(t.x,u.x),t.y=1d.53(t.y,u.y),r.39(i)&&(11.3e.x<0&&t.x>0&&(t.x*=-1),11.3e.y<0&&t.y>0&&(t.y*=-1)),11.3o&&11.3o.3F&&a.1x(11.3o.3F,12(b,c){a.1x("18 1Q 1T 17".2Q(" "),12(a,b){c==b&&2K 5M("("+b+")$").3k(i)&&(t[/^(17|1Q)$/.3k(b)?"x":"y"]=0)})})}14 z,A;1g(h?(z=j.17+g+h,A=j.18+g):(z=j.17+g,A=j.18+g),f&&f.x&&/^(3Q|3T)$/.3k(i)&&(z+=f.x),c.2i&&b.2i(),b.3x(z,A),c.1n)1V(i){1i"3Q":z=j.17+g,h&&(z+=h),z+=1d.1U(q,f.x||0),z+=t.x,b.1f(z,A),A-=l.19,z+=.5*l.15,b.1f(z,A),A+=l.19,z+=.5*l.15,b.1f(z,A);1C;1i"4e":1i"5f":z=j.17+.5*k.15-.5*l.15,z+=t.x,b.1f(z,A),A-=l.19,z+=.5*l.15,b.1f(z,A),A+=l.19,z+=.5*l.15,b.1f(z,A),z=j.17+.5*k.15-.5*o.15,b.1f(z,A);1C;1i"3R":z=j.17+k.15-g-l.15,h&&(z-=h),z-=1d.1U(q,f.x||0),z-=t.x,b.1f(z,A),A-=l.19,z+=.5*l.15,b.1f(z,A),A+=l.19,z+=.5*l.15,b.1f(z,A)}1g(h?h&&(b.29(j.17+k.15-g-h,j.18+g+h,h,n(-90),n(0),!1),z=j.17+k.15-g,A=j.18+g+h):(z=j.17+k.15-g,A=j.18+g,b.1f(z,A)),c.1n)1V(i){1i"3S":A=j.18+g,h&&(A+=h),A+=1d.1U(q,f.y||0),A+=t.y,b.1f(z,A),z+=l.19,A+=.5*l.15,b.1f(z,A),z-=l.19,A+=.5*l.15,b.1f(z,A);1C;1i"4f":1i"5g":A=j.18+.5*k.19-.5*l.15,A+=t.y,b.1f(z,A),z+=l.19,A+=.5*l.15,b.1f(z,A),z-=l.19,A+=.5*l.15,b.1f(z,A);1C;1i"4g":A=j.18+k.19-g,h&&(A-=h),A-=l.15,A-=1d.1U(q,f.y||0),A-=t.y,b.1f(z,A),z+=l.19,A+=.5*l.15,b.1f(z,A),z-=l.19,A+=.5*l.15,b.1f(z,A)}1g(h?h&&(b.29(j.17+k.15-g-h,j.18+k.19-g-h,h,n(0),n(90),!1),z=j.17+k.15-g-h,A=j.18+k.19-g):(z=j.17+k.15-g,A=j.18+k.19-g,b.1f(z,A)),c.1n)1V(i){1i"4h":z=j.17+k.15-g,h&&(z-=h),z-=1d.1U(q,f.x||0),z-=t.x,b.1f(z,A),z-=.5*l.15,A+=l.19,b.1f(z,A),z-=.5*l.15,A-=l.19,b.1f(z,A);1C;1i"4i":1i"5h":z=j.17+.5*k.15+.5*l.15,z+=t.x,b.1f(z,A),z-=.5*l.15,A+=l.19,b.1f(z,A),z-=.5*l.15,A-=l.19,b.1f(z,A);1C;1i"4j":z=j.17+g+l.15,h&&(z+=h),z+=1d.1U(q,f.x||0),z+=t.x,b.1f(z,A),z-=.5*l.15,A+=l.19,b.1f(z,A),z-=.5*l.15,A-=l.19,b.1f(z,A)}1g(h?h&&(b.29(j.17+g+h,j.18+k.19-g-h,h,n(90),n(2H),!1),z=j.17+g,A=j.18+k.19-g-h):(z=j.17+g,A=j.18+k.19-g,b.1f(z,A)),c.1n)1V(i){1i"4k":A=j.18+k.19-g,h&&(A-=h),A-=1d.1U(q,f.y||0),A-=t.y,b.1f(z,A),z-=l.19,A-=.5*l.15,b.1f(z,A),z+=l.19,A-=.5*l.15,b.1f(z,A);1C;1i"4l":1i"5i":A=j.18+.5*k.19+.5*l.15,A+=t.y,b.1f(z,A),z-=l.19,A-=.5*l.15,b.1f(z,A),z+=l.19,A-=.5*l.15,b.1f(z,A);1C;1i"3T":A=j.18+g+l.15,h&&(A+=h),A+=1d.1U(q,f.y||0),A+=t.y,b.1f(z,A),z-=l.19,A-=.5*l.15,b.1f(z,A),z+=l.19,A-=.5*l.15,b.1f(z,A)}1b h?h&&(b.29(j.17+g+h,j.18+g+h,h,n(-2H),n(-90),!1),z=j.17+g+h,A=j.18+g,z+=1,b.1f(z,A)):(z=j.17+g,A=j.18+g,b.1f(z,A)),c.2j&&b.2j(),{x:z,y:A,1n:t,5j:v,3b:f}}12 E(b){14 o,p,q,r,s,t,c=a.1m({1n:!1,3C:1s,2i:!1,2j:!1,3D:1s,3E:1s,1o:0,1k:0,7B:0,3b:{x:0,y:0},5k:1s},22[1]||{}),d=c.3D,e=c.3E,g=(c.7B,c.3b),h=c.1k,i=c.1o&&c.1o.2x||0,j=c.7C,k=c.3C,l=d.1l.1e,m=d.1l.1c,u=c.5k&&c.5k.1n||{x:0,y:0};1g(e){o=e.1n.1c,p=e.2E.1e,q=e.2E.1c,r=e.1k.1c,s=q.15-o.15;14 v=h+j+.5*o.15-.5*r.15;t=1d.1G(i>v?i-v:0)}14 w=l.17+h+j,x=l.18+h;j&&(w+=1),a.1m({},{x:w,y:x}),c.2i&&b.2i();14 z=a.1m({},{x:w,y:x});1g(x-=h,b.1f(w,x),i?i&&(b.29(l.17+i,l.18+i,i,n(-90),n(-2H),!0),w=l.17,x=l.18+i):(w=l.17,x=l.18,b.1f(w,x)),c.1n)1V(k){1i"3T":x=l.18+h,j&&(x+=j),x-=.5*r.15,x+=.5*o.15,x+=1d.1U(t,g.y||0),x+=u.y,b.1f(w,x),w-=r.19,x+=.5*r.15,b.1f(w,x),w+=r.19,x+=.5*r.15,b.1f(w,x);1C;1i"4l":1i"5i":x=l.18+.5*m.19-.5*r.15,x+=u.y,b.1f(w,x),w-=r.19,x+=.5*r.15,b.1f(w,x),w+=r.19,x+=.5*r.15,b.1f(w,x);1C;1i"4k":x=l.18+m.19-h-r.15,j&&(x-=j),x+=.5*r.15,x-=.5*o.15,x-=1d.1U(t,g.y||0),x-=u.y,b.1f(w,x),w-=r.19,x+=.5*r.15,b.1f(w,x),w+=r.19,x+=.5*r.15,b.1f(w,x)}1g(i?i&&(b.29(l.17+i,l.18+m.19-i,i,n(-2H),n(-9k),!0),w=l.17+i,x=l.18+m.19):(w=l.17,x=l.18+m.19,b.1f(w,x)),c.1n)1V(k){1i"4j":w=l.17+h,j&&(w+=j),w-=.5*r.15,w+=.5*o.15,w+=1d.1U(t,g.x||0),w+=u.x,b.1f(w,x),x+=r.19,w+=.5*r.15,b.1f(w,x),x-=r.19,w+=.5*r.15,b.1f(w,x);1C;1i"4i":1i"5h":w=l.17+.5*m.15-.5*r.15,w+=u.x,b.1f(w,x),x+=r.19,w+=.5*r.15,b.1f(w,x),x-=r.19,w+=.5*r.15,b.1f(w,x),w=l.17+.5*m.15+r.15,b.1f(w,x);1C;1i"4h":w=l.17+m.15-h-r.15,j&&(w-=j),w+=.5*r.15,w-=.5*o.15,w-=1d.1U(t,g.x||0),w-=u.x,b.1f(w,x),x+=r.19,w+=.5*r.15,b.1f(w,x),x-=r.19,w+=.5*r.15,b.1f(w,x)}1g(i?i&&(b.29(l.17+m.15-i,l.18+m.19-i,i,n(90),n(0),!0),w=l.17+m.15,x=l.18+m.15+i):(w=l.17+m.15,x=l.18+m.19,b.1f(w,x)),c.1n)1V(k){1i"4g":x=l.18+m.19-h,x+=.5*r.15,x-=.5*o.15,j&&(x-=j),x-=1d.1U(t,g.y||0),x-=u.y,b.1f(w,x),w+=r.19,x-=.5*r.15,b.1f(w,x),w-=r.19,x-=.5*r.15,b.1f(w,x);1C;1i"4f":1i"5g":x=l.18+.5*m.19+.5*r.15,x+=u.y,b.1f(w,x),w+=r.19,x-=.5*r.15,b.1f(w,x),w-=r.19,x-=.5*r.15,b.1f(w,x);1C;1i"3S":x=l.18+h,j&&(x+=j),x+=r.15,x-=.5*r.15-.5*o.15,x+=1d.1U(t,g.y||0),x+=u.y,b.1f(w,x),w+=r.19,x-=.5*r.15,b.1f(w,x),w-=r.19,x-=.5*r.15,b.1f(w,x)}1g(i?i&&(b.29(l.17+m.15-i,l.18+i,i,n(0),n(-90),!0),w=l.17+m.15-i,x=l.18):(w=l.17+m.15,x=l.18,b.1f(w,x)),c.1n)1V(k){1i"3R":w=l.17+m.15-h,w+=.5*r.15-.5*o.15,j&&(w-=j),w-=1d.1U(t,g.x||0),w-=u.x,b.1f(w,x),x-=r.19,w-=.5*r.15,b.1f(w,x),x+=r.19,w-=.5*r.15,b.1f(w,x);1C;1i"4e":1i"5f":w=l.17+.5*m.15+.5*r.15,w+=u.x,b.1f(w,x),x-=r.19,w-=.5*r.15,b.1f(w,x),x+=r.19,w-=.5*r.15,b.1f(w,x),w=l.17+.5*m.15-r.15,b.1f(w,x),b.1f(w,x);1C;1i"3Q":w=l.17+h+r.15,w-=.5*r.15,w+=.5*o.15,j&&(w+=j),w+=1d.1U(t,g.x||0),w+=u.x,b.1f(w,x),x-=r.19,w-=.5*r.15,b.1f(w,x),x+=r.19,w-=.5*r.15,b.1f(w,x)}b.1f(z.x,z.y-h),b.1f(z.x,z.y),c.2j&&b.2j()}12 F(b){14 c=11.2q(),d=11.1a.1n&&11.4s(),e=11.2b&&11.2b.3A(),f=11.1o,h=11.1k,i=11.2e,k=({15:2*h+2*i+11.2J.15,19:2*h+2*i+11.2J.19},b.1a.1n&&b.1a.1n.1B||{x:0,y:0}),l=0,m=0;f&&(l="1l"==11.1a.1o.1e?f:0,m="1k"==11.1a.1o.1e?f:l+h),a(1y.35).21(11.2Y=1y.25("3i")),q.3w(11.2Y,c.1J.1c),q.3t(11.2Y);14 n=11.2Y.3r("2d");n.2O=11.2A,a(11.1J).21(11.2Y),n.2S=q.4d(n,11.1a.1l,{3M:0,3N:c.1l.1e.18+h,3O:0,3P:c.1l.1e.18+c.1l.1c.19-h}),n.9l=0;14 o;o=11.6j(n,{2i:!0,2j:!0,1k:h,1o:l,5e:m,3D:c,3E:d,1n:11.1a.1n,3C:e,3b:k}),n.38();28(14 p=["9m","7D","9n","7D","9o"],r=0,s=p.1Z,u=0,v=p.1Z;v>u;u++)r=1d.1U(r,p[u].1Z);14 w={17:5,18:5},x=b.2Z.3X;1g(x&&(x=a(x),w.17=2B(x.1p("2e-17"))||0,w.18=2B(x.1p("2e-18"))||0),q.7b(n,p,{x:c.1l.1e.17+c.1l.1c.15-h-(w.17||0)-r,y:c.1l.1e.18+c.1l.1c.19-h-(w.18||0)-s,1F:t.7o(a.61(11.1a.1l.1F)?11.1a.1l.1F[11.1a.1l.1F.1Z-1].1F:11.1a.1l.1F)}),h){14 y=q.4d(n,11.1a.1k,{3M:0,3N:c.1l.1e.18,3O:0,3P:c.1l.1e.18+c.1l.1c.19});n.2S=y,o=11.6j(n,{2i:!0,2j:!1,1k:h,1o:l,5e:m,3D:c,3E:d,1n:11.1a.1n,3C:e,3b:k}),11.7E(n,{2i:!1,2j:!0,1k:h,7C:l,1o:{2x:m,1e:11.1a.1o.1e},3D:c,3E:d,1n:11.1a.1n,3C:e,3b:o.3b,5k:o}),n.38()}11.3G=o}12 G(){14 i,a=11.2g(),b=11.2J,c=a.1a,d=11.1o,f=11.1k,g=11.2e,h={15:2*f+2*g+b.15,19:2*f+2*g+b.19};1g(11.1a.1n){14 j=11.4s();i=j.2E.1c}14 k=s.64(11,h),l=k.1c,m=k.1e,h=k.1l.1c,o=k.1l.1e;k.1n.1c;14 r,t,u,q={18:0,17:0},v={15:l.15,19:l.19};1g(c.1A){14 w=d;"1l"==c.1o.1e&&(w+=f);14 x=w-1d.9p(n(45))*w,y="1Q";11.2b.3A().3h(/^(3R|3S)$/)&&(y="17");14 z=c.1A.3B+2*c.1A.1k,r={15:z,19:z};1g(q.17=o.17-z/2+("17"==y?x:h.15-x),q.18=o.18-z/2+x,"17"==y){1g(q.17<0){14 A=1d.2X(q.17);v.15+=A,m.17+=A,q.17=0}}1I{14 B=q.17+z-v.15;B>0&&(v.15+=B)}1g(q.18<0){14 C=1d.2X(q.18);v.19+=C,m.18+=C,q.18=0}1g(11.1a.1A.1t){14 D=11.1a.1A.1t,E=D.34,F=D.1B;1g(t={15:r.15+2*E,19:r.19+2*E},u={18:q.18-E+F.y,17:q.17-E+F.x},"17"==y){1g(u.17<0){14 A=1d.2X(u.17);v.15+=A,m.17+=A,q.17+=A,u.17=0}}1I{14 B=u.17+t.15-v.15;B>0&&(v.15+=B)}1g(u.18<0){14 C=1d.2X(u.18);v.19+=C,m.18+=C,q.18+=C,u.18=0}}}14 G=k.2M;G.18+=m.18,G.17+=m.17;14 H={17:1d.1G(m.17+o.17+11.1k+11.1a.2e),18:1d.1G(m.18+o.18+11.1k+11.1a.2e)},I={1E:{1c:{15:1d.1G(v.15),19:1d.1G(v.19)}},23:{1c:{15:1d.1G(v.15),19:1d.1G(v.19)}},1J:{1c:l,1e:{18:1d.26(m.18),17:1d.26(m.17)}},1l:{1c:{15:1d.1G(h.15),19:1d.1G(h.19)},1e:{18:1d.26(o.18),17:1d.26(o.17)}},2M:{18:1d.26(G.18),17:1d.26(G.17)},2I:{1e:H}};1b 11.1a.1A&&(I.1A={1c:{15:1d.1G(r.15),19:1d.1G(r.19)},1e:{18:1d.26(q.18),17:1d.26(q.17)}},11.1a.1A.1t&&(I.2W={1c:{15:1d.1G(t.15),19:1d.1G(t.19)},1e:{18:1d.26(u.18),17:1d.26(u.17)}})),I}12 H(){14 b=11.2q(),c=11.2g();a(c.1j).1p(k(b.1E.1c)),a(c.59).1p(k(b.23.1c)),11.2V&&11.2V.1p(k(b.1E.1c)),a(11.1J).1p(a.1m(k(b.1J.1c),k(b.1J.1e))),11.1A&&(a(11.1A).1p(k(b.1A.1e)),b.2W&&a(11.2W.1j).1p(k(b.2W.1e))),a(c.2Z).1p(k(b.2I.1e))}12 I(a){11.2A=a||0,11.1t&&(11.1t.2A=11.2A)}12 J(a){11.7F(a),11.1R()}1b{5a:f,7r:b,1R:g,1z:c,3a:d,2g:o,2R:h,5l:i,7w:j,7v:l,4q:m,7q:A,6g:C,7p:F,6j:D,7E:E,7y:u,7z:v,4s:p,2q:G,5b:H,7F:I,9q:J}}());14 w={3m:{},1u:12(b){1g(!b)1b 1s;14 c=1s,d=a(b).1Y("2t-1W");1b d&&(c=11.3m[d]),c},33:12(a){11.3m[a.1W]=a},1z:12(a){14 b=11.1u(a);b&&(3K 11.3m[b.1W],b.1z())},4t:12(a){1b 1d.32/2-1d.6V(a,1d.4H(a)*1d.32)}};w.4u={4n:12(a,b){14 c=u.1u(a.1h),d=c.4s().1k.1c,e=11.56(d.15,d.19,b,{3U:!1});1b{15:e.15,19:e.19}},9r:12(a,b,c){14 d=.5*a,e=m(1d.9s(d/l(d,b))),f=2H-e-90,g=o(n(f))*c,h=2*(d+g),i=h/a*b;1b{15:h,19:i}},56:12(a,b,c){14 d=m(1d.7j(.5*(b/a))),e=2H-d,f=1d.4H(n(e-90))*c,g=a+2*f,h=g*b/a;1b{15:g,19:h}},3V:12(b){14 c=u.1u(b.1h),d=b.1a.34,e=r.7i(c.2b),g=(r.2L(c.2b),w.4u.4n(b,d)),h={2E:{1c:{15:1d.1G(g.15),19:1d.1G(g.19)},1e:{18:0,17:0}}};1g(d){h.30=[];28(14 i=0;d>=i;i++){14 j=w.4u.4n(b,i,{3U:!1}),k={1e:{18:h.2E.1c.19-j.19,17:e?d-i:(h.2E.1c.15-j.15)/2},1c:j};h.30.2p(k)}}1I h.30=[a.1m({},h.2E)];1b h},5d:12(a,b,c){s.5d(a,b.3n(),c)}},a.1m(x.3J,12(){12 b(){1b B.1u(11.1h)[0]}12 c(){1b u.1u(11.1h)}12 d(){11.3a()}12 e(){11.1j&&(a(11.1j).1z(),11.1n=1s,11.1l=1s,11.1J=1s,11.1j=1s,11.1q={})}12 f(){}12 g(){11.3a(),11.5a();14 b=11.2g(),c=11.3n();11.1j=a("<2k>").20("9t")[0],a(b.1j).6b(11.1j),c.2V&&a(b.1j).6b(c.2V),c.2q(),a(11.1j).1p({18:0,17:0}),11.7G(),11.5b()}12 h(){1b 11.1a.1N/(11.1a.34+1)}12 i(){14 b=11.3n(),c=b.2q(),d=11.2g(),e=11.2q(),f=11.1a.34,g=w.4u.3V(11),h=b.2b,i=r.62(h),j={18:f,17:f};1g(d.1a.1n){14 l=g.30[g.30.1Z-1];"17"==i&&(j.17+=1d.1G(l.1c.19)),"18"==i&&(j.18+=1d.1G(l.1c.19))}14 m=b.1q.1a,n=m.1o,o=m.1k;"1l"==d.1a.1o.1e&&n&&(n+=o);14 p=e.1J.1c;a(11.1j).21(a(11.1J=1y.25("2k")).20("9u").1p(k(p))).1p(k(p)),a(1y.35).21(a(11.2Y=1y.25("3i"))),q.3w(11.2Y,e.1J.1c),q.3t(11.2Y);14 s=11.2Y.3r("2d");s.2O=11.2A,a(11.1J).21(11.2Y);28(14 u=f+1,v=0;f>=v;v++)s.2S=t.2T(11.1a.1F,w.4t(v*(1/u))*(11.1a.1N/u)),q.79(s,{15:c.1l.1c.15+2*v,19:c.1l.1c.19+2*v,18:j.18-v,17:j.17-v,1o:n+v});1g(b.1a.1n){14 x={x:j.17,y:j.18},y=g.30[0].1c,z=b.1a.1n,A=o;A+=.5*z.15;14 B=b.1a.1o&&"1l"==b.1a.1o.1e?b.1a.1o.2x||0:0;B&&(A+=B);14 C=o+B+.5*z.15-.5*y.15,D=1d.1G(n>C?n-C:0),E=b.3G&&b.3G.1n||{x:0,y:0},F=b.3G&&b.3G.5j||{x:0,y:0};1g(A+=1d.1U(D,b.1a.1n.1B&&b.1a.1n.1B[i&&/^(17|1Q)$/.3k(i)?"y":"x"]||0),"18"==i||"1T"==i){1V(h){1i"3Q":1i"4j":x.x+=A+E.x-F.x;1C;1i"4e":1i"5f":1i"4i":1i"5h":x.x+=.5*c.1l.1c.15+E.x;1C;1i"3R":1i"4h":x.x+=c.1l.1c.15-(A-E.x+F.x)}"1T"==i&&(x.y+=c.1l.1c.19);28(14 v=0,G=g.30.1Z;G>v;v++){s.2S=t.2T(11.1a.1F,w.4t(v*(1/u))*(11.1a.1N/u));14 f=g.30[v];s.2i(),"18"==i?(s.3x(x.x,x.y-v),s.1f(x.x-.5*f.1c.15,x.y-v),s.1f(x.x,x.y-v-f.1c.19),s.1f(x.x+.5*f.1c.15,x.y-v)):(s.3x(x.x,x.y+v),s.1f(x.x-.5*f.1c.15,x.y+v),s.1f(x.x,x.y+v+f.1c.19),s.1f(x.x+.5*f.1c.15,x.y+v)),s.2j(),s.38()}}1I{1V(h){1i"3T":1i"3S":x.y+=A+E.y-F.y;1C;1i"4l":1i"5i":1i"4f":1i"5g":x.y+=.5*c.1l.1c.19+E.y;1C;1i"4k":1i"4g":x.y+=c.1l.1c.19-(A-E.y+F.y)}"1Q"==i&&(x.x+=c.1l.1c.15);28(14 v=0,G=g.30.1Z;G>v;v++){s.2S=t.2T(11.1a.1F,w.4t(v*(1/u))*(11.1a.1N/u));14 f=g.30[v];s.2i(),"17"==i?(s.3x(x.x-v,x.y),s.1f(x.x-v,x.y-.5*f.1c.15),s.1f(x.x-v-f.1c.19,x.y),s.1f(x.x-v,x.y+.5*f.1c.15)):(s.3x(x.x+v,x.y),s.1f(x.x+v,x.y-.5*f.1c.15),s.1f(x.x+v+f.1c.19,x.y),s.1f(x.x+v,x.y+.5*f.1c.15)),s.2j(),s.38()}}}}12 j(){14 b=11.3n();b.2J,b.1o;14 e=b.2q(),g=(11.2g(),11.1a.34),h=a.1m({},e.1l.1c);h.15+=2*g,h.19+=2*g;14 i,k;1g(b.1a.1n){14 l=w.4u.3V(11);i=l.2E.1c,k=i.19}14 m=s.64(b,h,k),n=m.1c,o=m.1e,h=m.1l.1c,p=m.1l.1e,r=e.1J.1e,t=e.1l.1e,u={18:r.18+t.18-(p.18+g)+11.1a.1B.y,17:r.17+t.17-(p.17+g)+11.1a.1B.x},v=e.2M,x=e.23.1c,y={18:0,17:0};1g(u.18<0){14 z=1d.2X(u.18);y.18+=z,u.18=0,v.18+=z}1g(u.17<0){14 A=1d.2X(u.17);y.17+=A,u.17=0,v.17+=A}14 B={19:1d.1U(n.19+u.18,x.19+y.18),15:1d.1U(n.15+u.17,x.15+y.17)},C={17:1d.1G(y.17+e.1J.1e.17+e.1l.1e.17+b.1k+b.2e),18:1d.1G(y.18+e.1J.1e.18+e.1l.1e.18+b.1k+b.2e)},D={1E:{1c:B},23:{1c:x,1e:y},1j:{1c:n,1e:u},1J:{1c:n,1e:{18:1d.26(o.18),17:1d.26(o.17)}},1l:{1c:{15:1d.1G(h.15),19:1d.1G(h.19)},1e:{18:1d.26(p.18),17:1d.26(p.17)}},2M:v,2I:{1e:C}};1b D}12 l(){14 b=11.2q(),c=11.3n(),d=11.2g();1g(a(d.1j).1p(k(b.1E.1c)),a(d.59).1p(a.1m(k(b.23.1e),k(b.23.1c))),c.2V&&c.2V.1p(k(b.1E.1c)),d.1a.1A){14 e=c.2q(),f=b.23.1e,g=e.1A.1e;1g(a(c.1A).1p(k({18:f.18+g.18,17:f.17+g.17})),d.1a.1A.1t){14 h=e.2W.1e;a(c.2W.1j).1p(k({18:f.18+h.18,17:f.17+h.17}))}}a(11.1j).1p(a.1m(k(b.1j.1c),k(b.1j.1e))),a(11.1J).1p(k(b.1J.1c)),a(d.2Z).1p(k(b.2I.1e))}1b{5a:f,1z:d,3a:e,1R:g,2g:b,3n:c,2q:j,7H:h,7G:i,5b:l}}());14 y={3m:{},1u:12(b){1g(!b)1b 1s;14 c=a(b).1Y("2t-1W");1b c?11.3m[c]:1s},33:12(a){11.3m[a.1W]=a},1z:12(a){14 b=11.1u(a);b&&(3K 11.3m[b.1W],b.1z())}};a.1m(z.3J,12(){12 b(){1b B.1u(11.1h)[0]}12 c(){1b u.1u(11.1h)}12 d(){1b 11.1a.1N/(11.1a.34+1)}12 e(){11.3a()}12 f(){11.1j&&(a(11.1j).1z(),11.1j=1s)}12 g(){11.3a();14 c=(11.2g(),11.3n()),d=c.2q().1A.1c,e=a.1m({},d),f=11.1a.34;e.15+=2*f,e.19+=2*f,a(c.1A).6k(a(11.1j=1y.25("2k")).20("9v")),a(1y.35).21(a(11.4v=1y.25("3i"))),q.3w(11.4v,e),q.3t(11.4v);14 g=11.4v.3r("2d");g.2O=11.2A,a(11.1j).21(11.4v);28(14 h=e.15/2,i=e.19/2,j=d.19/2,k=f+1,l=0;f>=l;l++)g.2S=t.2T(11.1a.1F,w.4t(l*(1/k))*(11.1a.1N/k)),g.2i(),g.29(h,i,j+l,n(0),n(7n),!0),g.2j(),g.38()}1b{1R:g,1z:e,3a:f,2g:b,3n:c,7H:d}}());14 B={2r:{},1a:{3Y:"6l",4J:9w},7I:12(){14 b=["2s"];1S.2C.3s&&(b.2p("7J"),11.4w&&a(1y.35).4x("2s",11.4w),11.4w=1s),a.1x(b,12(b,c){a(1y.6m).9x(".3c .6f, .3c .7K-1E",c)}),11.4y&&(a(1K).4x("3w",11.4y),11.4y=1s),a(1y).4x("4z",B.2h.6n)},77:12(){12 b(){11.7I();14 b=["2s"];1S.2C.3s&&(b.2p("7J"),11.4w=12(){1b 3y 0},a(1y.35).3W("2s",11.4w)),a.1x(b,12(b,c){a(1y.6m).9y(".3c .6f, .3c .7K-1E",c,12(b){b.9z(),b.9A(),B.6o(a(b.1D).5m(".3c")[0]).1L()})}),11.4y=a.1w(11.7L,11),a(1K).3W("3w",11.4y),a(1y).3W("4z",B.2h.6n)}1b b}(),7L:12(){11.5n&&(1K.6p(11.5n),11.5n=1s),11.5n=d.4N(a.1w(12(){14 b=11.3L();a.1x(b,12(a,b){b.1e()})},11),9B)},5o:12(b){14 d,c=a(b).1Y("2t-1W");1g(!c){14 e=11.6o(a(b).5m(".3c")[0]);e&&e.1h&&(c=a(e.1h).1Y("2t-1W"))}1b c&&(d=11.2r[c])?d:3y 0},5T:12(a){14 b;1b d.2m(a)&&(b=11.5o(a)),b&&b.1h},1u:12(b){14 c=[];1g(d.2m(b)){14 e=11.5o(b);e&&(c=[e])}1I a.1x(11.2r,12(d,e){e.1h&&a(e.1h).7M(b)&&c.2p(e)});1b c},6o:12(b){1g(!b)1b 1s;14 c=1s;1b a.1x(11.2r,12(a,d){d.1H("1R")&&d.1j===b&&(c=d)}),c},9C:12(b){14 c=[];1b a.1x(11.2r,12(d,e){e.1h&&a(e.1h).7M(b)&&c.2p(e)}),c},1X:12(b){1g(d.2m(b)){14 c=b,e=11.1u(c)[0];e&&e.1X()}1I a(b).1x(a.1w(12(a,b){14 c=11.1u(b)[0];c&&c.1X()},11))},1L:12(b){1g(d.2m(b)){14 c=11.1u(b)[0];c&&c.1L()}1I a(b).1x(a.1w(12(a,b){14 c=11.1u(b)[0];c&&c.1L()},11))},37:12(b){1g(d.2m(b)){14 c=b,e=11.1u(c)[0];e&&e.37()}1I a(b).1x(a.1w(12(a,b){14 c=11.1u(b)[0];c&&c.37()},11))},4Z:12(){a.1x(11.3L(),12(a,b){b.1L()})},2R:12(b){1g(d.2m(b)){14 c=b,e=11.1u(c)[0];e&&e.2R()}1I a(b).1x(a.1w(12(a,b){14 c=11.1u(b)[0];c&&c.2R()},11))},3L:12(){14 b=[];1b a.1x(11.2r,12(a,c){c.1O()&&b.2p(c)}),b},5W:12(b){14 c=!1;1b d.2m(b)&&a.1x(11.3L()||[],12(a,d){1b d.1h==b?(c=!0,!1):3y 0}),c},7N:12(){14 c,b=0;1b a.1x(11.2r,12(a,d){d.2n>b&&(b=d.2n,c=d)}),c},7O:12(){11.3L().1Z<=1&&a.1x(11.2r,12(b,c){c.1H("1R")&&!c.1a.2n&&a(c.1j).1p({2n:c.2n=+B.1a.4J})})},33:12(a){11.2r[a.1W]=a},4A:12(b){14 c=11.5o(b);1g(c){14 d=a(c.1h).1Y("2t-1W");3K 11.2r[d],c.1L(),c.1z()}},1z:12(b){d.2m(b)?11.4A(b):a(b).1x(a.1w(12(a,b){11.4A(b)},11))},78:12(){a.1x(11.2r,a.1w(12(a,b){b.1h&&!d.1h.4T(b.1h)&&11.4A(b.1h)},11))},76:12(){a.1x(11.2r,a.1w(12(a,b){b.1h&&11.4A(b.1h)},11)),11.2r={}},5U:12(a){11.1a.3Y=a||"6l"},5V:12(a){11.1a.4J=a||0},5Y:12(){a.1x(11.2r,a.1w(12(a,b){b.1q&&b.1q.2o&&(b.1q.2o.6q(),b.1q.2o=1s),b.2a("3g",!1)},11)),i.71()},6J:12(){12 f(d){14 e;1b e="2v"==a.1r(d)?{1h:c.27&&c.27.1h||b.27.1h,2y:d}:A(a.1m({},b.27),d)}12 g(f){1b b=1S.2F.7P,c=A(a.1m({},b),1S.2F.6r),d=1S.2F.6s.7P,e=A(a.1m({},d),1S.2F.6s.6r),g=h,h(f)}12 h(g){g.23=g.23&&1S.2F[g.23]?g.23:1S.2F[B.1a.3Y]?B.1a.3Y:"6l";14 h=g.23?a.1m({},1S.2F[g.23]||1S.2F[B.1a.3Y]):{},i=A(a.1m({},c),h),j=A(a.1m({},i),g);1g(j.2f){14 k=c.2f||{},l=b.2f;"4B"==a.1r(j.2f)&&(j.2f={3Z:k.3Z||l.3Z,1r:k.1r||l.1r}),j.2f=A(a.1m({},l),j.2f)}1g(j.1l&&"2v"==a.1r(j.1l)&&(j.1l={1F:j.1l,1N:1}),j.1k){14 m,n=c.1k||{},o=b.1k;m="2D"==a.1r(j.1k)?{2x:j.1k,1F:n.1F||o.1F,1N:n.1N||o.1N}:A(a.1m({},o),j.1k),j.1k=0===m.2x?!1:m}1g(j.1o){14 p;p="2D"==a.1r(j.1o)?{2x:j.1o,1e:c.1o&&c.1o.1e||b.1o.1e}:A(a.1m({},b.1o),j.1o),j.1o=0===p.2x?!1:p}14 q,s=s=j.1v&&j.1v.1D||"2v"==a.1r(j.1v)&&j.1v||c.1v&&c.1v.1D||"2v"==a.1r(c.1v)&&c.1v||b.1v&&b.1v.1D||b.1v,t=j.1v&&j.1v.1E||c.1v&&c.1v.1E||b.1v&&b.1v.1E||B.2h.6t(s);1g(j.1v?"2v"==a.1r(j.1v)?q={1D:j.1v,1E:B.2h.7Q(j.1v)}:(q={1E:t,1D:s},j.1v.1E&&(q.1E=j.1v.1E),j.1v.1D&&(q.1D=j.1v.1D)):q={1E:t,1D:s},"2P"==j.1D){14 u=r.2L(q.1D);q.1D="1M"==u?q.1D.66(/(17|1Q)/,"2w"):q.1D.66(/(18|1T)/,"2w")}j.1v=q;14 v;1g("2P"==j.1D?(v=a.1m({},b.1B),a.1m(v,1S.2F.6r.1B||{}),g.23&&a.1m(v,(1S.2F[g.23]||1S.2F[B.1a.3Y]).1B||{}),v=B.2h.7R(b.1B,b.1v,q.1D,!0),g.1B&&(v=a.1m(v,g.1B||{})),j.40=0):v={x:j.1B.x,y:j.1B.y},j.1B=v,j.1A&&j.7S){14 w=a.1m({},1S.2F.6s[j.7S]),x=A(a.1m({},e),w);1g(x.2u&&a.1x(["6h","6i"],12(b,c){14 f=x.2u[c],g=e.2u&&e.2u[c];1g(f.1l){14 h=g&&g.1l;1g("2D"==a.1r(f.1l))f.1l={1F:h&&h.1F||d.2u[c].1l.1F,1N:f.1l};1I 1g("2v"==a.1r(f.1l)){14 i=h&&"2D"==a.1r(h.1N)&&h.1N||d.2u[c].1l.1N;f.1l={1F:f.1l,1N:i}}1I f.1l=A(a.1m({},d.2u[c].1l),f.1l)}1g(f.1k){14 j=g&&g.1k;f.1k="2D"==a.1r(f.1k)?{1F:j&&j.1F||d.2u[c].1k.1F,1N:f.1k}:A(a.1m({},d.2u[c].1k),f.1k)}}),x.1t){14 z=e.1t&&e.1t.3H&&e.1t.3H==5C?e.1t:d.1t;x.1t.3H&&x.1t.3H==5C&&(z=A(z,x.1t)),x.1t=z}j.1A=x}1g(j.1t){14 C;C="4B"==a.1r(j.1t)?c.1t&&"4B"==a.1r(c.1t)?b.1t:c.1t?c.1t:b.1t:A(a.1m({},b.1t),j.1t||{}),"2D"==a.1r(C.1B)&&(C.1B={x:C.1B,y:C.1B}),j.1t=C}1g(j.1n){14 D={};D="4B"==a.1r(j.1n)?A({},b.1n):A(A({},b.1n),a.1m({},j.1n)),"2D"==a.1r(D.1B)&&(D.1B={x:D.1B,y:D.1B}),j.1n=D}1g(j.31&&("2v"==a.1r(j.31)?j.31={5p:j.31,7T:!0}:"4B"==a.1r(j.31)&&(j.31=j.31?{5p:"52",7T:!0}:!1)),j.27&&"2s-9D"==j.27&&(j.7U=!0,j.27=!1),j.27)1g(a.61(j.27)){14 E=[];a.1x(j.27,12(a,b){E.2p(f(b))}),j.27=E}1I j.27=[f(j.27)];1b j.2N&&"2v"==a.1r(j.2N)&&(j.2N=[""+j.2N]),j.2e=0,j.1P&&(1K.6u||(j.1P=!1)),j}14 b,c,d,e;1b g}()};B.2h=12(){12 c(c){14 d=r.2Q(c),e=d[1],f=d[2],g=r.2L(c),h=a.1m({1M:!0,2c:!0},22[1]||{});1b"1M"==g?(h.2c&&(e=b[e]),h.1M&&(f=b[f])):(h.2c&&(f=b[f]),h.1M&&(e=b[e])),e+f}12 f(a){14 d=r.2Q(a);1b c(d[1]+b[d[2]])}12 h(b,c){a(b.1j).1p({18:c.18+"2z",17:c.17+"2z"})}12 j(a,b,d,e){14 g=y(a,b,d,e),h=d&&"2v"==7V d.1r?d.1r:"";1g(/9E$/.3k(h),1===g.41.42)1b l(a,g),g;14 m=b,n=e,o={1M:!g.41.1M,2c:!g.41.2c},p={1M:!1,2c:!1},q=r.2L(b);1b((p.2c="1M"==q&&o.2c)||(p.1M="2c"==q&&o.1M))&&(m=c(b,p),n=c(e,p),g=y(a,m,d,n),1===g.41.42)?(l(a,g),g):(g=k(g,a),l(a,g),g)}12 k(a,b){14 c=z(b),d=c.1c,e=c.1e,f=u.1u(b.1h).1q.1v[a.1v.1E].1E.1c,g=a.1e,h={18:0,17:0,3F:[]};1b e.17>g.17&&(h.17=e.17-g.17,h.3F.2p("17"),a.1e.17=e.17),e.18>g.18&&(h.18=g.18-e.18,h.3F.2p("18"),a.1e.18=e.18),e.17+d.15<g.17+f.15&&(h.17=e.17+d.15-(g.17+f.15),h.3F.2p("1Q"),a.1e.17=e.17+d.15-f.15),e.18+d.19<g.18+f.19&&(h.18=e.18+d.19-(g.18+f.19),h.3F.2p("1T"),a.1e.18=e.18+d.19-f.19),a.7W=h,a}12 l(a,b){a.5l(b.1v.1E,b.41.4o,b.7W),h(a,b.1e)}12 m(a){1b a&&(/^2P|2s|3s$/.3k("2v"==7V a.1r&&a.1r||"")||a.5L>=0)}12 n(a,b,c){1b a>=b&&c>=a}12 o(a,b,c,d){14 e=n(a,c,d),f=n(b,c,d);1g(e&&f)1b b-a;1g(e&&!f)1b d-a;1g(!e&&f)1b b-c;14 g=n(c,a,b),h=n(d,a,b);1b g&&h?d-c:g&&!h?b-c:!g&&h?d-a:0}12 q(a,b){1b o(a.1e.17,a.1e.17+a.1c.15,b.1e.17,b.1e.17+b.1c.15)*o(a.1e.18,a.1e.18+a.1c.19,b.1e.18,b.1e.18+b.1c.19)}12 s(a,b){14 c=a.1c.15*a.1c.19;1b c?q(a,b)/c:0}12 t(a,b){14 c=r.2Q(b),d=r.2L(b),e={17:0,18:0};1g("1M"==d){1V(c[2]){1i"2w":1i"2U":e.17=.5*a.15;1C;1i"1Q":e.17=a.15}"1T"==c[1]&&(e.18=a.19)}1I{1V(c[2]){1i"2w":1i"2U":e.18=.5*a.19;1C;1i"1T":e.18=a.19}"1Q"==c[1]&&(e.17=a.15)}1b e}12 v(b){14 c=d.1h.4S(b),e=d.1h.4O(b),f={18:a(1K).4P(),17:a(1K).4Q()};1b c.17+=-1*(e.17-f.17),c.18+=-1*(e.18-f.18),c}12 y(b,e,f,g){14 h,i,j,k=u.1u(b.1h),l=k.1a,n=l.1B,o=m(f);1g(o||!f){1g(j={15:24,19:24},o){14 p=d.5K(f);h={18:p.y-.5*j.19+6,17:p.x-.5*j.15+6}}1I{14 q=b.1q.2y;h={18:(q?q.y:0)-.5*j.19+6,17:(q?q.x:0)-.5*j.15+6}}b.1q.2y={x:h.17,y:h.18}}1I h=v(f),j={15:a(f).7X(),19:a(f).7Y()};1g(l.1n&&"2P"!=l.1D){14 y=r.2Q(g),A=r.2Q(e),C=r.2L(g),D=k.1q.1a,E=k.4s().1k.1c,F=D.1o,G=D.1k,H=F&&"1l"==l.1o.1e?F:0,I=F&&"1k"==l.1o.1e?F:F+G,J=G+H+.5*l.1n.15-.5*E.15,K=I>J?I-J:0;4C=1d.1G(G+H+.5*l.1n.15+K+l.1n.1B["1M"==C?"x":"y"]),"1M"==C&&"17"==y[2]&&"17"==A[2]||"1Q"==y[2]&&"1Q"==A[2]?(j.15-=2*4C,h.17+=4C):("2c"==C&&"18"==y[2]&&"18"==A[2]||"1T"==y[2]&&"1T"==A[2])&&(j.19-=2*4C,h.18+=4C)}i=a.1m({},h);14 L=o?c(l.1v.1E):l.1v.1D,M=t(j,L),N=t(j,g);({18:h.18+M.18+n.y,17:h.17+M.17+n.x}),h={17:h.17+N.17,18:h.18+N.18};14 P=a.1m({},n);P=x(P,L,g,"2P"==k.1a.1D),h.18+=P.y,h.17+=P.x;14 k=u.1u(b.1h),Q=k.1q.1v,R=a.1m({},Q[e]),S={x:0,y:0},y=r.2Q(g);1g("2w"!=y[2]){14 C=C=r.2L(g),T=B.2h.6t(g,"2c"==C?{1M:!0,2c:!1}:{1M:!1,2c:!0});e==T&&(S.y=k.3G.5j.y,S.x=k.3G.5j.x)}14 U={18:h.18-R.2M.18-S.y,17:h.17-R.2M.17-S.x};R.1E.1e=U;14 V={1M:!0,2c:!0},W={x:0,y:0};1g(b.1a.31){14 X=z(b),Y=b.1a.1t?w.1u(b.1h):k,Z=Y.2q().1E.1c;V.42=s({1c:Z,1e:U},X),V.42<1&&((U.17<X.1e.17||U.17+Z.15>X.1e.17+X.1c.15)&&(V.1M=!1,W.x=U.17<X.1e.17?U.17-X.1e.17:U.17+Z.15-(X.1e.17+X.1c.15)),(U.18<X.1e.18||U.18+Z.19>X.1e.18+X.1c.19)&&(V.2c=!1,W.y=U.18<X.1e.18?U.18-X.1e.18:U.18+Z.19-(X.1e.18+X.1c.19)))}1I V.42=1;V.4o=W;14 $=Q[e].1J,7Z=s({1c:j,1e:i},{1c:$.1c,1e:{18:U.18+$.1e.18,17:U.17+$.1e.17}});1b{1e:U,42:{1D:7Z},41:V,1v:{1E:e,1D:g}}}12 z(b){14 c={18:a(1K).4P(),17:a(1K).4Q()},e=b.1a,f=e.1D;("2P"==f||"4M"==f)&&(f=b.1h);14 g=a(f).5m(e.31.5p).7t()[0];1g(!g||"52"==e.31.5p)1b{1c:p.52(),1e:c};14 h=d.1h.4S(g),i=d.1h.4O(g);1b h.17+=-1*(i.17-c.17),h.18+=-1*(i.18-c.18),{1c:{15:a(g).5Z(),19:a(g).60()},1e:h}}14 b={17:"1Q",1Q:"17",18:"1T",1T:"18",2w:"2w",2U:"2U"};e.3p&&e.3p<9||e.4U&&e.4U<2||e.5Q&&e.5Q<9F;14 x=12(){14 a=[[-1,-1],[0,-1],[1,-1],[-1,0],[0,0],[1,0],[-1,1],[0,1],[1,1]],b={3T:0,3Q:0,4e:1,5f:1,3R:2,3S:2,4f:5,5g:5,4g:8,4h:8,4i:7,5h:7,4j:6,4k:6,4l:3,5i:3};1b 12(c,d,e,f){14 g=a[b[d]],h=a[b[e]],i=[1d.6a(.5*1d.2X(g[0]-h[0]))?-1:1,1d.6a(.5*1d.2X(g[1]-h[1]))?-1:1];1b r.39(d)||!r.39(e)||f||("1M"==r.2L(e)?i[0]=0:i[1]=0),{x:i[0]*c.x,y:i[1]*c.y}}}();1b{1u:y,4X:j,6t:c,7Q:f,80:v,7R:x,6v:m}}(),B.2h.51={x:0,y:0},B.2h.6n=12(a){B.2h.51={x:a.5L,y:a.6Q}},B.3u=12(){12 b(){a(1y.35).21(a(1y.25("2k")).20("9G").21(a(1y.25("2k")).20("3c").21(a(11.1j=1y.25("2k")).20("81"))))}12 c(b){1b{15:a(b).5Z(),19:a(b).60()}}12 e(b){14 d=c(b),e=b.4R;1b e&&a(e).1p({15:d.15+"2z"})&&c(b).19>d.19&&d.15++,a(e).1p({15:"67%"}),d}12 f(b,c,e){(!11.1j||11.1j&&!d.1h.4T(11.1j))&&11.1R();14 f=b.1a,g=a.1m({1P:!1},22[3]||{});!f.82&&!d.2m(c)||a(c).1Y("83")||(f.82&&"2v"==a.1r(c)&&(b.3d=a("#"+c)[0],c=b.3d),!b.43&&c&&d.1h.4T(c)&&(a(b.3d).1Y("84",a(b.3d).1p("85")),b.43=1y.25("2k"),a(b.3d).6k(a(b.43).1L())));14 h=1y.25("2k");a(11.1j).21(a(h).20("7s 9H").21(c)),d.2m(c)&&a(c).1X(),f.23&&a(h).20("9I"+b.1a.23);14 i=a(h).6c("86[4p]").9J(12(){1b!(a(11).3j("19")&&a(11).3j("15"))});1g(i.1Z>0&&!b.1H("3I")){b.2a("3I",!0),f.1P&&(g.1P||b.1P||(b.1P=b.6w(f.1P)),b.1H("1O")&&(b.1e(),a(b.1j).1X()),b.1P.6x());14 j=0,k=1d.1U(9K,9L*(i.1Z||0));b.2l("3I"),b.44("3I",a.1w(12(){i.1x(12(){11.6y=12(){}}),j>=i.1Z||(11.5q(b,h),e&&e())},11),k),a.1x(i,a.1w(12(c,d){14 f=2K 9M;f.6y=a.1w(12(){f.6y=12(){};14 c=f.15,g=f.19,k=a(d).3j("15"),l=a(d).3j("19");k&&l||(!k&&l?(c=1d.26(l*c/g),g=l):!l&&k&&(g=1d.26(k*g/c),c=k),a(d).3j({15:c,19:g}),j++),j==i.1Z&&(b.2l("3I"),b.1P&&(b.1P.1z(),b.1P=1s),b.1H("1O")&&a(b.1j).1L(),11.5q(b,h),e&&e())},11),f.4p=d.4p},11))}1I 11.5q(b,h),e&&e()}12 g(b,c){14 d=e(c),f={15:d.15-(2B(a(c).1p("2e-17"))||0)-(2B(a(c).1p("2e-1Q"))||0),19:d.19-(2B(a(c).1p("2e-18"))||0)-(2B(a(c).1p("2e-1T"))||0)};b.1a.3l&&"2D"==a.1r(b.1a.3l)&&f.15>b.1a.3l&&(a(c).1p({15:b.1a.3l+"2z"}),d=e(c)),b.1q.2J=d,a(b.2Z).87(c)}1b e=d.6O(e,12(a,b){14 c=a(b);1b c.19+=13,c}),{1R:b,46:f,5q:g,6e:e}}(),a.1m(C.3J,12(){12 b(a,b,c){11.1q.3f[a]=d.4N(b,c)}12 c(a){1b 11.1q.3f[a]}12 e(a){11.1q.3f[a]&&(1K.6p(11.1q.3f[a]),3K 11.1q.3f[a])}12 f(){a.1x(11.1q.3f,12(a,b){1K.6p(b)}),11.1q.3f=[]}12 g(b,c,d,e){c=c;14 f=a.1w(d,e||11);11.1q.5F.2p({1h:b,88:c,89:f}),a(b).3W(c,f)}12 h(){a.1x(11.1q.5F,12(b,c){a(c.1h).4x(c.88,c.89)})}12 j(a,b){11.1q.2u[a]=b}12 l(a){1b 11.1q.2u[a]}12 m(){11.2G(11.1h,"4r",11.5r),11.2G(11.1h,"5c",a.1w(12(a){11.6z(a)},11)),11.1a.2N&&a.1x(11.1a.2N,a.1w(12(b,c){14 d=!1;"2s"==c&&(11.1a.27&&a.1x(11.1a.27,12(a,b){1b"4M"==b.1h&&"2s"==b.2y?(d=!0,!1):3y 0}),11.2a("5G",d)),11.2G(11.1h,c,"2s"==c?d?11.37:11.1X:a.1w(12(){11.8a()},11))},11)),11.1a.27?a.1x(11.1a.27,a.1w(12(b,c){14 d;1V(c.1h){1i"4M":1g(11.1H("5G")&&"2s"==c.2y)1b;d=11.1h;1C;1i"1D":d=11.1D}d&&11.2G(d,c.2y,"2s"==c.2y?11.1L:a.1w(12(){11.6A()},11))},11)):11.1a.8b&&11.1a.2N&&!a.6B("2s",11.1a.2N)>-1&&11.2G(11.1h,"5c",a.1w(12(){11.2l("1X")},11));14 b=!1;!11.1a.9N&&11.1a.2N&&((b=a.6B("4z",11.1a.2N)>-1)||a.6B("5s",11.1a.2N)>-1)&&"2P"==11.1D&&11.2G(11.1h,b?"4z":"5s",12(a){11.1H("4L")&&11.1e(a)})}12 n(){11.2G(11.1j,1S.2C.3s?"5s":"4r",11.5r),11.2G(11.1j,"5c",11.6z),11.2G(11.1j,1S.2C.3s?"5s":"4r",a.1w(12(){11.5t("4D")||11.1X()},11)),11.1a.27&&a.1x(11.1a.27,a.1w(12(b,c){14 d;1V(c.1h){1i"1E":d=11.1j}d&&11.2G(d,c.2y,c.2y.3h(/^(2s|4z|4r)$/)?11.1L:a.1w(12(){11.6A()},11))},11))}12 o(a,b,c){14 d=u.1u(11.1h);d&&d.5l(a,b,c)}12 p(a){14 b=u.1u(11.1h);b&&b.4q(a)}12 q(){11.4q(11.1a.1v.1E)}12 r(){a(11.1j=1y.25("2k")).20("3c"),11.8c()}12 s(){11.1R();14 a=u.1u(11.1h);a?a.1R():(2K v(11.1h),11.2a("4L",!0))}12 t(){11.1H("1R")||(a(1y.35).21(a(11.1j).1p({17:"-5u",18:"-5u",2n:11.2n}).21(a(11.59=1y.25("2k")).20("9O")).21(a(11.2Z=1y.25("2k")).20("81"))),a(11.1j).20("9P"+11.1a.23),11.1a.7U&&(a(11.1h).20("8d"),11.2G(1y.6m,"2s",a.1w(12(b){1g(11.1O()){14 c=a(b.1D).5m(".3c, .8d")[0];(!c||c&&c!=11.1j&&c!=11.1h)&&11.1L()}},11))),1S.2C.4b&&(11.1a.4E||11.1a.40)&&(11.5v(11.1a.4E),a(11.1j).20("6C")),11.8e(),11.2a("1R",!0),B.33(11))}12 w(){14 c;11.2I,11.43&&11.3d&&((c=a(11.3d).1Y("84"))&&a(11.3d).1p({85:c}),a(11.43).6k(11.3d).1z(),11.43=1s)}12 x(){d.48(a.1w(12(){11.8f()},11)),11.8g(),11.6D(),d.48(a.1w(12(){a(11.1j).6c("86[4p]").4x("9Q")},11)),u.1z(11.1h),11.1H("1R")&&11.1j&&(a(11.1j).1z(),11.1j=1s);14 c,b="5E";(c=a(11.1h).1Y(b))&&a(11.1h).3j("5D",c).8h("5E"),a(11.1h).8h("2t-1W")}12 y(b){14 c=a.1m({4F:11.1a.4F,1P:!1},22[1]||{});11.1R(),11.1H("1O")&&a(11.1j).1L(),B.3u.46(11,b,a.1w(12(){14 b=11.1H("1O");b||11.2a("1O",!0),11.8i(),b||11.2a("1O",!1),11.1H("1O")&&(a(11.1j).1L(),11.1e(),11.5w(),a(11.1j).1X()),11.2a("3g",!0),c.4F&&c.4F(11.2Z.3X,11.1h),c.4G&&c.4G()},11),{1P:c.1P})}12 z(b){14 c,d={4a:11.2I,1r:11.1a.2f.1r,1Y:11.1a.2f.1Y||{},8j:11.1a.2f.8j||"87"};1g(!(11.1H("2o")||11.1a.2f.3Z&&11.1H("3g"))){1g(11.1a.2f.3Z&&(c=i.1u(d)))1b 11.6E(c,{4G:a.1w(12(){11.1H("1O")&&11.1a.47&&11.1a.47(11.2Z.3X,11.1h)},11)}),3y 0;11.2a("2o",!0),11.1a.1P&&(11.1P?11.1P.6x():(11.1P=11.6w(11.1a.1P),11.2a("3g",!1)),11.1e(b)),11.1q.2o&&(11.1q.2o.6q(),11.1q.2o=1s),11.1q.2o=a.2f(a.1m({},d,{9R:a.1w(12(b,c,e){0!==e.9S&&(i.4X(d,e.4W),11.6E(e.4W,{4G:a.1w(12(){11.2a("2o",!1),11.1H("1O")&&11.1a.47&&11.1a.47(11.2Z.3X,11.1h),11.1P&&(11.1P.1z(),11.1P=1s)},11)}))},11)}))}}12 A(b){14 c=a.1m({1P:11.1a.1P&&11.1P},22[1]||{});11.46(b,c)}12 C(){14 b=1y.25("2k");a(b).1Y("83",!0);14 c=6u.4Y(b,a.1m({},22[0]||{})),d=6u.63(b);1b a(b).1p(k(d)),11.46(b,{4F:!1,4G:12(){c.6x()}}),c}12 E(){1g(11.1H("1R")&&!11.1a.2n){14 b=B.7N();b&&b!=11&&11.2n<=b.2n&&a(11.1j).1p({2n:11.2n=b.2n+1})}}12 F(){14 a=u.1u(11.1h);a&&(a.2R(),11.1O()&&11.1e())}12 G(a){1g(1S.2C.4b){a=a||0;14 b=11.1j.9T;b.9U=a+"5x",b.9V=a+"5x",b.9W=a+"5x",b.9X=a+"5x"}}12 H(b){11.2l("1L"),11.2l("4D"),11.1H("1O")||11.5t("1X")||11.44("1X",a.1w(12(){11.2l("1X"),11.1X(b)},11),11.1a.8b||1)}12 I(b){1g(11.2l("1L"),11.2l("4D"),!11.1O()){1g("12"==a.1r(11.2I)||"12"==a.1r(11.1q.5y)){"12"!=a.1r(11.1q.5y)&&(11.1q.5y=11.2I);14 c=11.1q.5y(11.1h)||!1;1g(c!=11.1q.5H&&(11.1q.5H=c,11.2a("3g",!1),11.6D()),11.2I=c,!c)1b}11.1a.9Y&&B.4Z(),11.2a("1O",!0),11.1a.2f?11.8k(b):11.1H("3g")||11.46(11.2I),11.1H("4L")&&11.1e(b),11.5w(),11.1a.5z&&d.48(a.1w(12(){11.5r()},11)),"12"==a.1r(11.1a.47)&&(!11.1a.2f||11.1a.2f&&11.1a.2f.3Z&&11.1H("3g"))&&11.1a.47(11.2Z.3X,11.1h),1S.2C.4b&&(11.1a.4E||11.1a.40)&&(11.5v(11.1a.4E),a(11.1j).20("8l").8m("6C")),a(11.1j).1X()}}12 J(){11.2l("1X"),11.1H("1O")&&(11.2a("1O",!1),1S.2C.4b&&(11.1a.4E||11.1a.40)?(11.5v(11.1a.40),a(11.1j).8m("8l").20("6C"),11.44("4D",a.1w(11.6F,11),11.1a.40)):11.6F(),11.1q.2o&&(11.1q.2o.6q(),11.1q.2o=1s,11.2a("2o",!1)))}12 K(){11.1H("1R")&&(a(11.1j).1p({17:"-5u",18:"-5u"}),B.7O(),"12"!=a.1r(11.1a.8n)||11.1P||11.1a.8n(11.2Z.3X,11.1h))}12 L(){11.2l("1X"),!11.5t("1L")&&11.1H("1O")&&11.44("1L",a.1w(12(){11.2l("1L"),11.2l("4D"),11.1L()},11),11.1a.9Z||1)}12 M(a){11[11.1O()?"1L":"1X"](a)}12 N(){1b 11.1H("1O")}12 O(){11.2a("4K",!0),11.1H("1O")&&11.5w(),11.1a.5z&&11.2l("6G")}12 P(){11.2a("4K",!1),11.1a.5z&&11.44("6G",a.1w(12(){11.2l("6G"),11.1H("4K")||11.1L()},11),11.1a.5z)}14 D=12(b){1g(11.1O()){14 c;1g("2P"==11.1a.1D){14 e=B.2h.6v(b),f=B.2h.51;1g(e)f.x||f.y?(11.1q.2y={x:f.x,y:f.y},c=1s):c=b;1I{1g(f.x||f.y)11.1q.2y={x:f.x,y:f.y};1I 1g(!11.1q.2y){14 g=B.2h.80(11.1h);11.1q.2y={x:g.17,y:g.18}}c=1s}}1I c=11.1D;1g(B.2h.4X(11,11.1a.1v.1E,c,11.1a.1v.1D),b&&B.2h.6v(b)){14 h={15:a(11.1j).7X(),19:a(11.1j).7Y()},i=d.5K(b),g=d.1h.4S(11.1j);i.x>=g.17&&i.x<=g.17+h.15&&i.y>=g.18&&i.y<=g.18+h.19&&d.48(a.1w(12(){11.2l("1L")},11))}}};1b{1R:t,6M:r,8i:s,8c:m,8e:n,1X:I,1L:J,6F:K,37:M,1O:N,8a:H,6A:L,5v:G,2a:j,1H:l,5r:O,6z:P,5t:c,44:b,2l:e,8g:f,2G:g,8f:h,5l:o,4q:p,a0:q,2R:F,46:y,8k:z,6E:A,6w:C,1e:D,5w:E,6D:w,1z:x}}()),1S.3t()}(49);', 62, 621, '|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||this|function||var|width||left|top|height|options|return|dimensions|Math|position|lineTo|if|element|case|container|border|background|extend|stem|radius|css|_cache|type|null|shadow|get|hook|proxy|each|document|remove|closeButton|offset|break|target|tooltip|color|ceil|getState|else|bubble|window|hide|horizontal|opacity|visible|spinner|right|build|Tipped|bottom|max|switch|uid|show|data|length|addClass|append|arguments|skin||createElement|round|hideOn|for|arc|setState|_hookPosition|vertical||padding|ajax|getTooltip|Position|beginPath|closePath|div|clearTimer|isElement|zIndex|xhr|push|getOrderLayout|tooltips|click|tipped|states|string|middle|size|event|px|_globalAlpha|parseInt|support|number|box|Skins|setEvent|180|content|contentDimensions|new|getOrientation|anchor|showOn|globalAlpha|mouse|split|refresh|fillStyle|hex2fill|center|iframeShim|closeButtonShadow|abs|bubbleCanvas|contentElement|blurs|containment|PI|add|blur|body|scripts|toggle|fill|isCenter|cleanup|cornerOffset|t_Tooltip|inlineContent|_stemCorrection|timers|updated|match|canvas|attr|test|maxWidth|shadows|getSkin|_adjustment|IE|indexOf|getContext|touch|init|UpdateQueue|devicePixelRatio|resize|moveTo|void|charAt|toLowerCase|diameter|hookPosition|layout|stemLayout|sides|_corrections|constructor|preloading_images|prototype|delete|getVisible|x1|y1|x2|y2|topleft|topright|righttop|lefttop|math|getLayout|bind|firstChild|defaultSkin|cache|fadeOut|contained|overlap|inlineMarker|setTimer||update|onShow|defer|jQuery|url|cssTransitions|items|createFillStyle|topmiddle|rightmiddle|rightbottom|bottomright|bottommiddle|bottomleft|leftbottom|leftmiddle|regex|getBorderDimensions|correction|src|setHookPosition|mouseenter|getStemLayout|transition|Stem|closeButtonCanvas|_void|unbind|_onWindowResizeHandler|mousemove|_remove|boolean|sideOffset|fadeTransition|fadeIn|afterUpdate|callback|cos|000|startingZIndex|active|skinned|self|delay|cumulativeScrollOffset|scrollTop|scrollLeft|parentNode|cumulativeOffset|isAttached|Gecko|Chrome|responseText|set|create|hideAll||mouseBuffer|viewport|min|G_vmlCanvasManager||getCenterBorderDimensions|substring|skins|skinElement|prepare|order|mouseleave|rotate|borderRadius|topcenter|rightcenter|bottomcenter|leftcenter|corner|corrections|setHookPositionAndStemCorrection|closest|_resizeTimer|_getTooltip|selector|_updateTooltip|setActive|touchmove|getTimer|10000px|setFadeDuration|raise|ms|contentFunction|hideAfter|console|in|Object|title|tipped_restore_title|events|toggles|fnCallContent|call|apply|pointer|pageX|RegExp|parseFloat|Opera|opera|WebKit|required|available|findElement|setDefaultSkin|setStartingZIndex|isVisibleByElement|undefined|clearAjaxCache|innerWidth|innerHeight|isArray|getSide|getDimensions|getBubbleLayout|nullifyCornerOffset|replace|100|defaultCloseButton|hoverCloseButton|floor|prepend|find|auto|getMeasureElementDimensions|t_Close|drawCloseButtonState|default|hover|_drawBackgroundPath|before|dark|documentElement|_mouseBufferHandler|getByTooltipElement|clearTimeout|abort|reset|CloseButtons|getInversedPosition|Spinners|isPointerEvent|insertSpinner|play|onload|setIdle|hideDelayed|inArray|t_hidden|_restoreInlineContent|afterAjaxUpdate|_hide|idle|warn|_stemPosition|createOptions|getAttribute|getElementById|_preBuild|Array|wrap|concat|pageY|version|AppleWebKit|MobileSafari|check|pow|Za|checked|notified|toUpperCase|param|clear|try|DocumentTouch|catch|TransitionEvent|removeAll|startDelegating|removeDetached|drawRoundedRectangle|fillRect|drawPixelArray|Gradient|addColorStops|positions|toOrientation|side|toDimension|isCorner|atan|red|green|blue|360|getSaturatedBW|drawBubble|drawCloseButton|createHookCache|t_ContentContainer|first|25000px|setStemCorrection|setAdjustment|closeButtonShift|closeButtonMouseover|closeButtonMouseout|CloseButton|stemOffset|backgroundRadius|60060600006060606006|_drawBorderPath|setGlobalAlpha|drawBackground|getBlurOpacity|stopDelegating|touchstart|close|onWindowResize|is|getHighestTooltip|resetZ|base|getTooltipPositionFromTarget|adjustOffsetBasedOnHooks|closeButtonSkin|flip|hideOnClickOutside|typeof|adjustment|outerWidth|outerHeight|_|getAbsoluteOffset|t_Content|inline|isSpinner|tipped_restore_inline_display|display|img|html|eventName|handler|showDelayed|showDelay|createPreBuildObservers|t_hideOnClickOutside|createPostBuildObservers|clearEvents|clearTimers|removeData|_buildSkin|dataType|ajaxUpdate|t_visible|removeClass|onHide|log|sqrt|object|setAttribute|slice|nodeType|setTimeout|do|while|exec|attachEvent|MSIE|KHTML|rv|Apple|Mobile|Safari|navigator|userAgent|fn|jquery|z_|z0|requires|_t_uid_|ontouchstart|instanceof|WebKitTransitionEvent|OTransitionEvent|createEvent|ready|scale|initElement|createLinearGradient|addColorStop|spacing|rgba|join||fff|255|hue|saturation|brightness|0123456789abcdef|hex2rgb|init_|t_Bubble|iframe|t_iframeShim|frameBorder|javascript|15000px|t_CloseButtonShift|lineCap|t_CloseState|translate|stemCorrection|270|lineWidth|6660066660666660066|60060666006060606006|6660066660606060066|sin|setOpacity|getCenterBorderDimensions2|acos|t_Shadow|t_ShadowBubble|t_CloseButtonShadow|999999|undelegate|delegate|preventDefault|stopPropagation|200|getBySelector|outside|move|530|t_UpdateQueue|t_clearfix|t_Content_|filter|8e3|750|Image|fixed|t_Skin|t_Tooltip_|load|success|status|style|MozTransitionDuration|webkitTransitionDuration|OTransitionDuration|transitionDuration|hideOthers|hideDelay|resetHookPosition'.split('|'), 0, {}));