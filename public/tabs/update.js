var urlbarInput = document.getElementById("urlbar");
urlbarInput.value = "";
window.onload = async function () {
  async function checkSomething() {
    return new Promise((resolve) => {
      const iframe = document.querySelector(".browser-tab-content-iframe[active]");
      const currentURL = iframe.contentWindow.location.href;
      var urlbarInput = document.getElementById("urlbar");
      var index = currentURL.indexOf("/service/");

      if (index !== -1) {
        var textAfterService = currentURL.substring(index + 9);
        var currentpageurl = __uv$config.decodeUrl(textAfterService);
        if (urlbarInput) {
          var newText = currentpageurl;
          urlbarInput.value = newText;
        }
      } else {
        urlbarInput.value = "";
      }

      resolve();
    });
  }

  const interval = 1000;
  const intervalId = setInterval(async () => {
    await checkSomething();
  }, interval);
};

