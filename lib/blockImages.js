var chrome = require('chrome');
var Components = chrome.components;
var Cc = Components.classes;
var Ci = Components.interfaces;
var Cu = Components.utils;
var CC = Components.Constructor;
Cu.import("resource://gre/modules/XPCOMUtils.jsm");
Cu.import("resource://gre/modules/Services.jsm");

let policy =
{
    classDescription: "Test content policy",
    classID: Components.ID("{12345678-1234-1234-1234-123456789abc}"),
    contractID: "@adblockplus.org/test-policy;1",
    xpcom_categories: ["content-policy"],

    init: function () {
        let registrar = Components.manager.QueryInterface(Ci.nsIComponentRegistrar);
        registrar.registerFactory(this.classID, this.classDescription, this.contractID, this);

        let catMan = Cc["@mozilla.org/categorymanager;1"].getService(Ci.nsICategoryManager);
        for each(let category in this.xpcom_categories
        )
        catMan.addCategoryEntry(category, this.contractID, this.contractID, false, true);
    },

    // nsIContentPolicy interface implementation
    shouldLoad: function (contentType, contentLocation, requestOrigin, node, mimeTypeGuess, extra) {
        if (contentType !== 3 && contentType !== 2 && contentType !== 4) {
            return Ci.nsIContentPolicy.ACCEPT;
        }
        if (!contentLocation) {
            return Ci.nsIContentPolicy.ACCEPT;
        }
        var requestURL = contentLocation.spec;
        var refererURL = requestOrigin.spec;
        if (refererURL.indexOf('http://www.hayhaytv.vn') < 0) {
            return Ci.nsIContentPolicy.ACCEPT;
        }
        if (requestURL.indexOf('img.youtube.com') > -1) {
            return Ci.nsIContentPolicy.REJECT;
        }
        if (requestURL.match(/bypass=true$/i)) {
            return Ci.nsIContentPolicy.ACCEPT;
        }
        if (requestURL.indexOf('http://www.hayhaytv.vn/jwplayer/') > -1) {
            return Ci.nsIContentPolicy.ACCEPT;
        }
        if (requestURL.indexOf('http://admicro1.vcmedia.vn') > -1 || requestURL.indexOf('http://media.adnetwork.vn') > -1) {
            return Ci.nsIContentPolicy.REJECT;
        }
        if (!requestURL.match(/^https?:\/\/[^\/]+hayhaytv[^\/]+/i)) {
            return Ci.nsIContentPolicy.ACCEPT;
        }
        //console.log(requestURL);
        return Ci.nsIContentPolicy.REJECT;
    },

    shouldProcess: function (contentType, contentLocation, requestOrigin, node, mimeTypeGuess, extra) {
        //dump("shouldProcess: " + contentType + " " +
        //    (contentLocation ? contentLocation.spec : "null") + " " +
        //    (requestOrigin ? requestOrigin.spec : "null") + " " +
        //    node + " " +
        //    mimeTypeGuess + "\n");
        return Ci.nsIContentPolicy.ACCEPT;
    },

    // nsIFactory interface implementation
    createInstance: function (outer, iid) {
        if (outer)
            throw Cr.NS_ERROR_NO_AGGREGATION;
        return this.QueryInterface(iid);
    },

    // nsISupports interface implementation
    QueryInterface: XPCOMUtils.generateQI([Ci.nsIContentPolicy, Ci.nsIFactory])
};

policy.init();
