(function () {
    const hostMatche = document.currentScript.src.match(/^[a-z\-]+:\/\/[^:/]+(:\d+)?/i);
    const host = hostMatche[0];
    chrome.runtime.getURL = chrome.runtime.getURL || function (path) { return host + "/" + path.replace(/^(wwwroot)?\//ig, ""); }
})();