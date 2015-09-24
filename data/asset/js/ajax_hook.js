(function ajax_hook() {
    var send = XMLHttpRequest.prototype.send;
    var open = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function () {
        var self = this;
        self.request = arguments;
        open.apply(self, arguments);
    };

    XMLHttpRequest.prototype.send = function () {
        var self = this;
        self.setRequestHeader('User-Agent', 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:38.0) Gecko/20100101 Firefox/38.0');
        var onload = self.onload;
        self.onload = function () {
            self.response_hook = self.response;
            self.responseText_hook = self.responseText;
            onload.apply(onload, arguments);
        };
        var url_mat = self.request[1].match(/(https?:\/\/.*?)?\/gm_script\/(.*)/);
        if (url_mat) {
            var resource_mat = url_mat[2].match(/resource\/(.*)/);
            if (resource_mat) {
                var resource_name = resource_mat[1];
                gm_script.req_resource(resource_name, function (resource_content) {
                    self.onload = function () {
                        self.response_hook = resource_content;
                        self.responseText_hook = resource_content;
                        onload.apply(onload, arguments);
                    };
                    console.info('>>>>>> Request resource: %c' + resource_name, 'font-weight:bold;color:blue', self.request);
                    self.onload();
                });
                return;
            }
        }
        send.apply(self, arguments);
    };
}).call(null);