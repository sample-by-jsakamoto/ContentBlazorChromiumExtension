(function () {
    const bootjsonUrl = document.currentScript.getAttribute("bootjsonUrl");
    const hostMatche = bootjsonUrl.match(/^[a-z\-]+:\/\/[^:/]+(:\d+)?/i);
    const host = hostMatche[0];
    const subPath = host.startsWith("chrome-extension://") ? "/wwwroot/" : "/";

    Blazor.start({
        loadBootResource: function (type, name, defaultUri, integrity) {
            const matches = defaultUri.match(/^([a-z\-]+:\/\/[^:/]+(:\d+)?\/?)?(.+)$/i);
            const uri = host + subPath + matches[3];
            return uri;
        }
    });
})();