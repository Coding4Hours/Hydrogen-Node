import _browser_ from "../objects/browser.js";

function activeTabChange (data) {
  const id = data.detail.tabEl.getAttribute("tabId");
  const tabs = document.querySelectorAll(".browser-tab-content .browser-tab-content-iframe");
  tabs.forEach((tab) => {
    tab.removeAttribute("active");
  });
  const iframe = document.querySelector(`.browser-tab-content-iframe[tabId='${id}']`);
  iframe.setAttribute("active", "");
}

export default activeTabChange;