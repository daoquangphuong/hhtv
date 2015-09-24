var chrome = require('chrome');
var Components = chrome.components;
if (window === null || typeof window !== 'object') {
    var window = require('sdk/window/utils').getMostRecentBrowserWindow();
}
Components.utils.import("resource://gre/modules/FileUtils.jsm");

var requestResource = {
    getDataURI: function (path) {
        var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
        var scriptableStream = Components.classes["@mozilla.org/scriptableinputstream;1"].getService(Components.interfaces.nsIScriptableInputStream);
        var channel = ioService.newChannel('resource://' + require('sdk/self').name + '/' + path, null, null);
        try {
            var input = channel.open();
        }
        catch (err) {
            return "data:text/plain,NOT FOUND FILE -->> " + path;
        }
        scriptableStream.init(input);
        var str = scriptableStream.read(input.available());
        scriptableStream.close();
        input.close();
        var encoded = window.btoa(str);
        return "data:" + channel.contentType + ";base64," + encoded;
    }
};

module.exports = requestResource;
