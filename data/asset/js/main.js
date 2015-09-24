var main = new function () {
    this.baseUrl = window.location.protocol + '//' + window.location.host;

    //region Clone Extend
    this.cloneExtend = new function () {
        var exports = this;
        var hop = Object.prototype.hasOwnProperty;

        function replace(a, b) {
            if (!b) {
                return a;
            }
            var key;
            for (key in b) {
                if (hop.call(b, key)) {
                    a[key] = b[key];
                }
            }
            return a;
        }

        exports.replace = replace;
        function add(a, b) {
            if (!b) {
                return a;
            }
            var key;
            for (key in b) {
                if (hop.call(b, key)) {
                    if (typeof a[key] === 'undefined' || a[key] === null) {
                        a[key] = b[key];
                    }
                }
            }
            return a;
        }

        exports.add = add;
        function extend(a, b, context, newobjs, aparent, aname, haveaparent) // context is anti circular references mechanism
        {
            if (a == b) {
                return a;
            }
            if (!b) {
                return a;
            }
            var key, clean_context = false,
                return_sublevel = false,
                b_pos;
            if (!haveaparent) {
                aparent = {
                    'a': a
                };
                aname = 'a';
            }
            if (!context) {
                clean_context = true;
                context = [];
                newobjs = [];
            }
            b_pos = context.indexOf(b);
            if (b_pos == -1) {
                context.push(b);
                newobjs.push([aparent, aname]);
            } else {
                return newobjs[b_pos][0][newobjs[b_pos][1]];
            }
            for (key in b) {
                if (hop.call(b, key)) {
                    if (typeof a[key] === 'undefined') {
                        if (typeof b[key] === 'object') {
                            if (b[key] instanceof Array) // http://javascript.crockford.com/remedial.html
                            {
                                a[key] = extend([], b[key], context, newobjs, a, key, true);
                            } else if (b[key] === null) {
                                a[key] = null;
                            } else if (b[key] instanceof Date) {
                                a[key] = new b[key].constructor();
                                a[key].setTime(b[key].getTime());
                            } else {
                                a[key] = extend({}, b[key], context, newobjs, a, key, true);
                                /*a[key].constructor = b[key].constructor; a[key].prototype = b[key].prototype;*/
                            }
                        } else {
                            a[key] = b[key];
                        }
                    } else if (typeof a[key] === 'object' && a[key] !== null) {
                        a[key] = extend(a[key], b[key], context, newobjs, a, key, true);
                        /*a[key].constructor = b[key].constructor; a[key].prototype = b[key].prototype;*/
                    } else {
                        a[key] = b[key];
                    }
                }
            }
            if (clean_context) {
                context = null;
                newobjs = null;
            }
            if (!haveaparent) {
                aparent = null;
                return a;
            }
            if (typeof a === 'object' && !(a instanceof Array)) {
                /*a.constructor = b.constructor;
                 a.prototype = b.prototype*/
                ;
            }
            return a;
        }

        exports.extend = extend;
        function extenduptolevel(a, b, levels, context, newobjs, aparent, aname, haveaparent) {
            if (a == b) {
                return a;
            }
            if (!b) {
                return a;
            }
            var key, clean_context = false,
                return_sublevel = false;
            if (!haveaparent) {
                aparent = {
                    'a': a
                };
                aname = 'a';
            }
            if (!context) {
                clean_context = true;
                context = [];
                newobjs = [];
            }
            b_pos = context.indexOf(b);
            if (b_pos == -1) {
                context.push(b);
                newobjs.push([aparent, aname]);
            } else {
                return newobjs[b_pos][0][newobjs[b_pos][1]];
            }
            for (key in b) {
                if (hop.call(b, key)) {
                    if (typeof a[key] === 'undefined') {
                        if (typeof b[key] === 'object' && levels > 0) {
                            if (b[key] instanceof Array) // http://javascript.crockford.com/remedial.html
                            {
                                a[key] = extenduptolevel([], b[key], levels - 1, context, newobjs, a, key, true);
                            } else if (b[key] === null) {
                                a[key] = null;
                            } else if (b[key] instanceof Date) {
                                a[key] = new b[key].constructor();
                                a[key].setTime(b[key].getTime());
                            } else {
                                a[key] = extenduptolevel({}, b[key], levels - 1, context, newobjs, a, key, true);
                            }
                        } else {
                            a[key] = b[key];
                        }
                    } else if (typeof a[key] === 'object' && a[key] !== null && levels > 0) {
                        a[key] = extenduptolevel(a[key], b[key], levels - 1, context, newobjs, a, key, true);
                    } else {
                        a[key] = b[key];
                    }
                }
            }
            if (clean_context) {
                context = null;
                newobjs = null;
            }
            if (!haveaparent) {
                aparent = null;
                return a;
            }
            if (typeof a === 'object' && !(a instanceof Array)) {
                /*a.constructor = b.constructor;
                 a.prototype = b.prototype;*/
            }
            return a;
        }

        exports.extenduptolevel = extenduptolevel;
        function clone(obj) {
            if (typeof obj === 'object') {
                if (obj === null) {
                    return null;
                }
                if (obj instanceof Array) {
                    return extend([], obj);
                } else if (obj instanceof Date) {
                    var t = new obj.constructor();
                    t.setTime(obj.getTime());
                    return t;
                } else {
                    return extend({}, obj);
                }
            }
            return obj;
        }

        exports.clone = clone;
        function cloneextend(obj, exteddata) {
            if (typeof obj === 'object') {
                if (obj === null) {
                    return null;
                }
                return extend(clone(obj), exteddata);
            }
            return obj;
        }

        exports.cloneextend = cloneextend;
        function cloneuptolevel(obj, level) // clone only numlevels levels other levels leave references
        {
            if (typeof obj === 'object') {
                if (obj === null) {
                    return null;
                }
                if (obj instanceof Array) {
                    return extenduptolevel([], obj, level);
                }
                return extenduptolevel({}, obj, level);
            }
            return obj;
        }

        exports.cloneuptolevel = cloneuptolevel;
        function foreach(object, block, context) {
            if (object) {
                if (typeof object === "object" && object instanceof Array)
                    return object.forEach(object, block, context)
                else //if (typeof object === "object") // or (object instanceof Function)...
                {
                    if (object)
                        for (var key in object) {
                            if (hop.call(object, key)) {
                                if (block.call(context, object[key], key, object) === false) break;
                            }
                        }
                }
            }
        }

        exports.foreach = foreach;
        function dotpath(data, dotkeys, preserve) {
            if (!preserve)
                data = {};
            var value;
            for (var key in dotkeys) {
                value = data;
                var keys = key.split('.');
                var k = keys.pop();
                while (keys.length) {
                    var next = keys.shift();
                    value = value[next] = value[next] || {};
                }
                value[k] = dotkeys[key]
            }
            return data;
        }

        exports.dotpath = dotpath;
    };
    //endregion

    //region MISC
    this.reload = function () {
        window.location.reload();
    };

    this.redirect = function (link) {
        window.location.href = link;
    };

    this.round = function (value, places) {
        places = Math.pow(10, places);
        return Math.round(value * places) / places;
    };

    //endregion
};