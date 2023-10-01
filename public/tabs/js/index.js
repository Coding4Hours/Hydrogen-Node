import activeTabChange from "./events/activeTabChange.js";
import tabAdd from "./events/tabAdd.js";
import tabRemove from "./events/tabRemove.js";
import _browser_ from "./objects/browser.js";




// event handlers
document.addEventListener("activeTabChange", activeTabChange);
document.addEventListener("tabAdd", tabAdd);
document.addEventListener("tabRemove", tabRemove);



// click events
document.querySelector("#pageReload").addEventListener("click", () => {
  const iframe = document.querySelector(".browser-tab-content-iframe[active]");
  if (iframe) {
    if (iframe.getAttribute("loading") === "true") {
      iframe.contentWindow.stop();
      iframe.setAttribute("loading", false);
      iframe.setAttribute("sandbox", "");
      iframe.setAttribute("id", "newtab-frame");
    } else {
      iframe.contentWindow.location.reload();
      iframe.setAttribute("id", "newtab-frame");
      iframe.setAttribute("sandbox", "allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts");
    }
  }
});

document.querySelector("#pageBack").addEventListener("click", () => {
  const iframe = document.querySelector(".browser-tab-content-iframe[active]");
  const tabId = iframe.getAttribute("tabId");
  const tab = _browser_.tabs.get(tabId);
  console.log(tab.historyIndex);
  if (tab.history.length > 0 && tab.historyIndex > 0) {
    iframe.contentWindow.history.back();
    iframe.setAttribute("historyChange", true);
    setTimeout(() => {
      iframe.removeAttribute("historyChange");
      console.log(iframe.contentWindow.location.href);
    }, 50);
    tab.historyIndex--;
    _browser_.tabs.set(tabId, tab);
  }
});

document.querySelector("#pageForward").addEventListener("click", () => {
  const iframe = document.querySelector(".browser-tab-content-iframe[active]");
  const tabId = iframe.getAttribute("tabId");
  const tab = _browser_.tabs.get(tabId);
  if (tab.history.length > 0 && tab.historyIndex < tab.history.length - 1) {
    iframe.contentWindow.history.forward();
    tab.historyIndex++;
    _browser_.tabs.set(tabId, tab);
  }
});


// global loop
let loading = false;
setInterval(() => {
  const iframe = document.querySelector(".browser-tab-content-iframe[active]");
  const tabId = iframe.getAttribute("tabId");
  const tab = _browser_.tabs.get(tabId);
  if (iframe) {
    // update address bar
    const url = tab.history[tab.historyIndex];
    if (document.querySelector(".addressbar-urlbar").innerText !== url) {
      document.querySelector(".addressbar-urlbar").innerText = url ?? "";
    }

    // update reload/stop loading button
    if (iframe.getAttribute("loading") !== loading.toString()) {
      loading = (iframe.getAttribute("loading") === "true");
      let element = document.querySelector("#pageReload svg");
      element.innerHTML = loading ?
        "<path stroke-width='0px' stroke-linecap='round' shape-rendering='geometricPrecision' d='M 16 18.37 L 6.86 27.51 C 6.21 28.16 5.15 28.16 4.49 27.51 C 3.84 26.85 3.84 25.79 4.49 25.14 L 13.63 16 L 4.49 6.86 C 3.84 6.21 3.84 5.15 4.49 4.49 C 5.15 3.84 6.21 3.84 6.86 4.49 L 16 13.63 L 25.14 4.49 C 25.79 3.84 26.85 3.84 27.51 4.49 C 28.16 5.15 28.16 6.21 27.51 6.86 L 18.37 16 L 27.51 25.14 C 28.16 25.79 28.16 26.85 27.51 27.51 C 26.85 28.16 25.79 28.16 25.14 27.51 Z'></path>" :
        "<path stroke-width='0px' stroke-linecap='round' shape-rendering='geometricPrecision' d='M 25.1 20.15 L 25.08 20.14 C 23.51 23.59 20.04 26 16 26 C 10.48 26 6 21.52 6 16 C 6 10.48 10.48 6 16 6 C 19.02 6 21.72 7.34 23.55 9.45 L 23.55 9.45 L 19 14 L 25.8 14 L 28.83 14 L 30 14 L 30 3 L 25.67 7.33 C 23.3 4.67 19.85 3 16 3 C 8.82 3 3 8.82 3 16 C 3 23.18 8.82 29 16 29 C 21.27 29 25.8 25.86 27.84 21.34 C 27.96 21.13 28.03 20.88 28.03 20.61 C 28.03 19.78 27.36 19.11 26.53 19.11 C 25.87 19.11 25.3 19.55 25.1 20.15 Z'></path>";
    }

    // update back button
    if (tab.history.length > 0 && tab.historyIndex > 0) {
      document.querySelector("#pageBack svg").classList.remove("browser-bar-btn-disabled");
      document.querySelector("#pageBack svg").classList.add("browser-bar-btn-enabled");
    } else {
      document.querySelector("#pageBack svg").classList.add("browser-bar-btn-disabled");
      document.querySelector("#pageBack svg").classList.remove("browser-bar-btn-enabled");
    }

    // update forward button
    if (tab.history.length > 0 && tab.historyIndex < tab.history.length - 1) {
      document.querySelector("#pageForward svg").classList.remove("browser-bar-btn-disabled");
      document.querySelector("#pageForward svg").classList.add("browser-bar-btn-enabled");
    } else {
      document.querySelector("#pageForward svg").classList.add("browser-bar-btn-disabled");
      document.querySelector("#pageForward svg").classList.remove("browser-bar-btn-enabled");
    }
  }
}, 10);

_browser_.chromeTabs.addTab();

var addressbar = document.querySelector(".addressbar-urlbar")

addressbar.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  try {
    new URL(addressbar.value)
    navigator.serviceWorker.register('./loadsw.js', {
      scope: __uv$config.prefix
    }).then(() => {
      document.querySelector(".browser-tab-content-iframe[active]").src = __uv$config.prefix + __uv$config.encodeUrl(addressbar.value);
    });
  } catch (e) {
    navigator.serviceWorker.register('./sw.js', {
      scope: __uv$config.prefix
    }).then(() => {
      document.querySelector(".browser-tab-content-iframe[active]").src = __uv$config.prefix + __uv$config.encodeUrl(`https://www.bing.com/search?q=${addressbar.value}`);
    });
  }
})