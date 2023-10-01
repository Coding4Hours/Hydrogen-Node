import _browser_ from "../objects/browser.js";

function tabAdd (data) {
  // create random ID for tab
  const id = Math.floor(Math.random()*100000).toString();
  // setup iframe
  const iframe = document.createElement("iframe");
  iframe.classList.add("browser-tab-content-iframe");
  iframe.setAttribute("sandbox", "allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts");
  iframe.setAttribute("referrerpolicy", "no-referrer");
  iframe.setAttribute("tabId", id);
  iframe.setAttribute("loading", true);

  // iframe load/unload events
  iframe.onload = () => {
    iframe.setAttribute("loading", false);
    iframe.contentWindow.onunload = () => {
      iframe.setAttribute("loading", true);
    }
  }

  // iframe url
  let url = data.detail.tabEl.getAttribute("url");
  iframe.src = url === "/newtab.html" ? url : "/service/" + _browser_.encodeUrl(url);

  // add iframe element to document
  document.querySelector(".browser-tab-content").appendChild(iframe);

  // update loop
  let title = "";
  let favicon = "";
  const loop = setInterval(() => {
    // parse url
    const newUrl = _browser_.decodeUrl(iframe.contentWindow.location.href.split("/service/")[1]);

    // update url
    try {
      if (newUrl !== url) {
        url = newUrl;
        data.detail.tabEl.setAttribute("url", newUrl);
      }
      
    } catch {}

    // update title
    try {
      if (iframe.contentDocument.title !== title) {
        title = iframe.contentDocument.title;
        _browser_.chromeTabs.updateTab(data.detail.tabEl, {
          title: iframe.contentDocument.title
        });
      }
    } catch {}

    // update favicon
    try {
      const icon = (iframe.contentDocument.querySelector("link[rel='icon']") || {href: ""}).href.includes("data:image/png;base64,") ? (iframe.contentDocument.querySelector("link[rel='icon']") || {href: ""}).href : "https://www.google.com/s2/favicons?domain=" + (new URL(newUrl).protocol === "http:" ? "https://" + new URL(newUrl).hostname : new URL(newUrl).origin);
      if(icon !== favicon) {
        favicon = icon;
        _browser_.chromeTabs.updateTab(data.detail.tabEl, {
          favicon: favicon
        });
      }
    } catch {}

    // update history
    try {
      let tab = _browser_.tabs.get(id);
      let link = _browser_.decodeUrl(iframe.contentWindow.location.href.split("/service/")[1]); 
      if(link !== tab.history[tab.historyIndex]) {
        if(iframe.getAttribute("historyChange")) return;
        if(link !== "about:blank" && link && !iframe.contentWindow.location.href.includes("/newtab.html")) {
          if(tab.history.length > tab.historyIndex) {
            tab.history.length = tab.historyIndex + 1;
            tab.history.push(link);
            tab.historyIndex++;
          } else {
            tab.history.push(link);
            tab.historyIndex++;
          }
          _browser_.tabs.set(id, tab);
        }
      }
    } catch {}
  }, 10);

  // add tab to tab list
  data.detail.tabEl.setAttribute("tabId", id);
  _browser_.tabs.set(id, {
    id: id,
    tabEl: data.detail.tabEl,
    content: iframe,
    updateLoop: loop,
    history: [""],
    historyIndex: 0
  });
}

export default tabAdd;