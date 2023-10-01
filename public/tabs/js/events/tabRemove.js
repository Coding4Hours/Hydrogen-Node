import _browser_ from "../objects/browser.js";

function tabRemove (data) {
  const id = data.detail.tabEl.getAttribute("tabId");
  const iframe = document.querySelector(`.browser-tab-content-iframe[tabId='${id}']`);
  iframe.parentElement.removeChild(iframe);
  clearInterval(_browser_.tabs.get(id).updateLoop);
  _browser_.tabs.delete(id);
  if(!document.querySelector(".chrome-tab")) {
    _browser_.chromeTabs.addTab();
  }
}

export default tabRemove;