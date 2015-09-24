(function () {

    //-----------------------
    //Request format
    //-----------------------
    //url
    //headers
    //content
    //contentType
    //response
    //-----------------------
    //Response format
    //-----------------------
    //      text
    //
    //The content of the response as plain text.
    //      json
    //
    //The content of the response as a JavaScript object. The value will be null if the document cannot be processed by JSON.parse.
    //       status
    //
    //The HTTP response status code (e.g. 200).
    //      statusText
    //
    //The HTTP response status line (e.g. OK).
    //      headers
    //
    //The HTTP response headers represented as key/value pairs.
    //------------------------
    //Method
    //------------------------
    //      get()
    //
    //Make a GET request.
    //      head()
    //
    //Make a HEAD request.
    //      post()
    //
    //Make a POST request.
    //      put()
    //
    //Make a PUT request.
    //      delete()
    //
    //Make a DELETE request.
    //------------------------
    var _request = function () {
        var _self = this;
        _self.id = {};
        _self.cur_id = 0;
        _self.register = function () {
            self.port.on('res_request', function (res) {
                var response = res.response;
                _self.id[res.id](response.status, response.headers, response.text, response.json);
            });
            var gm_script = win.gm_script;
            if (!win.hasOwnProperty('gm_script')) {
                gm_script = createObjectIn(win, {defineAs: "gm_script"});
            }
            exportFunction(_self.make_request, win.gm_script, {
                defineAs: "make_request"
            });
        };
        _self.make_request = function (method, params, callback) {
            var id = _self.cur_id++;
            _self.id[id] = callback;
            win.console.info('%cMAKE REQUEST: ', 'font-weight:bold;color:blue', method.toUpperCase(), params);
            self.port.emit('req_request', {id: id, method: method, params: params});
        };
    };

    var request = new _request();
    request.register();
}).call();