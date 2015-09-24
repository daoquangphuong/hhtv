try {
    (function () {
        if (win.needReload) {
            window.location.reload();
            return;
        }
        win.needReload = true;
        resource_manage.register();
        var head = window.document.head;
        resource_manage.req_resource('view/layout/head.html')
            .then(function (content) {
                head.innerHTML = content;
                var body = document.createElement('body');
                body.setAttribute('ng-controller', 'controller');
                body.setAttribute('ng-app', 'application');
                window.document.body = body;
                return resource_manage.req_resource('view/layout/body.html')
                    .then(function (content) {
                        body.innerHTML = content;
                        return Q.all([
                            resource_manage.load_css_list(head),
                            resource_manage.load_js_list(head),
                            resource_manage.load_directive_list(head),
                            resource_manage.load_controller_list(head)
                        ]);
                    })
                    .spread(function () {
                        var DOMContentLoaded_event = document.createEvent("Event");
                        DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true);
                        window.document.dispatchEvent(DOMContentLoaded_event);
                    })
            })
            .catch(function (err) {
                win.console.error(err);
            });
    }).call();
}
catch (err) {
    win.console.error(err);
}
