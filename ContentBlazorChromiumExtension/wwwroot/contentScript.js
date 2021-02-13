async function entryPoint() {

    const appHtmlUrl = chrome.runtime.getURL('wwwroot/app.html');
    const res = await fetch(appHtmlUrl);
    const appHtml = await res.text();

    // Inject the contents of the "app.html" into the current web page DOM.
    const insertionPointElement = document.getElementById('top_nav');
    if (insertionPointElement === null) return;

    insertionPointElement.insertAdjacentHTML("afterend", appHtml);

    const blazorWasmJsUrl = chrome.runtime.getURL('wwwroot/_framework/blazor.webassembly.js');
    const blazorWasmJsScriptElement = document.createElement('script');
    blazorWasmJsScriptElement.src = blazorWasmJsUrl;
    blazorWasmJsScriptElement.setAttribute("autostart", "false");

    blazorWasmJsScriptElement.onload = () => {
        const bootjsonUrl = chrome.runtime.getURL('wwwroot/_framework/blazor.boot.json');
        const loaderUrl = chrome.runtime.getURL('wwwroot/blazor.chromium-ext.loader.js');
        const loaderScriptElement = document.createElement('script');
        loaderScriptElement.src = loaderUrl;
        loaderScriptElement.setAttribute("bootjsonUrl", bootjsonUrl);
        document.body.append(loaderScriptElement);
    };

    document.body.append(blazorWasmJsScriptElement);
}

entryPoint();