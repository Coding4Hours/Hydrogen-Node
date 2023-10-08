        const select = document.querySelector('select');
        select.addEventListener('change', event => {
        const option = event.target.value;

        if (option === 'blob') {
          let htmll=document.querySelector("html"),html=htmll.innerHTML;
          html+="</html>",html="<!doctype html> <html> "+html;
          let htmlA=Array(html);
          const blob=new Blob(htmlA,{type:"text/html"});
          let blobUrl=URL.createObjectURL(blob);
          open(blobUrl),URL.revokeObjectURL(blobUrl);
        } else if (option === 'popup') {
         var myWindow1 = window.open('about:blank',height='300',width='500');
        var iframe = win.document.createElement("iframe");
        iframe.src = window.location.href
        window.location.replace('https://google.com/');
        } else if (option === 'ab') {
        var url = window.location.href;
        var urlObj = new window.URL(window.location.href);
        win = window.open();
        win.document.body.style.margin = "0";
        win.document.body.style.height = "100vh";
        var iframe = win.document.createElement("iframe");
        iframe.style.border = "none";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.margin = "0";
        iframe.referrerpolicy = "no-referrer";
        iframe.allow = "fullscreen"; 
        iframe.src = url.toString(); 
        win.document.body.appendChild(iframe);
        window.location.replace("https://google.com/");
        }
          select.option = "Open in...";
          });
