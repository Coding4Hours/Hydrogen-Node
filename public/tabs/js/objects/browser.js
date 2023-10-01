import ChromeTabs from "../chrome-tabs.js";

const chromeTabs = new ChromeTabs();
chromeTabs.init(document.querySelector(".chrome-tabs"));

const _browser_ = {
  tabs: new Map(),
  chromeTabs: chromeTabs,
  encodeUrl: __uv$config.encodeUrl,
  decodeUrl: __uv$config.decodeUrl
}

export default _browser_;