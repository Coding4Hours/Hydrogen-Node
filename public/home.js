function blob() {
  const e=(s)=>s.replace(/[<>'"]/g,(c)=>`\\u${('000'+c.charCodeAt(0).toString(16)).substr(-4)}`);
const l=window.location.href;
const i=`<iframe src="${e(l)}" style="width:100%;height:100%;position:fixed;top:0;left:0;"></iframe>`;
const b=new Blob([i], {type:"text/html"});
window.location.href=URL.createObjectURL(b);
}


function updateTimeAndDate() {
const timeElement = document.querySelector('.time');
const dateElement = document.querySelector('.date');

const date = new Date();

const hour = String(date.getHours()).padStart(2, '0');
const minute = String(date.getMinutes()).padStart(2, '0');
const second = String(date.getSeconds()).padStart(2, '0');
let period = '';
if (hour >= 12) {
  period = 'PM';
} else {
  period = 'AM';
}

const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
const day = String(date.getDate()).padStart(2, '0');
const year = String(date.getFullYear());

const formattedTime = `${hour % 12}:${minute}:${second} ${period}`;
const formattedDate = `${month}. ${day}${getDaySuffix(day)}, ${year}`;

timeElement.textContent = formattedTime;
dateElement.textContent = formattedDate;
}

function getDaySuffix(day) {
if (day >= 11 && day <= 13) {
  return 'th';
}
switch (day % 10) {
  case 1:
    return 'st';
  case 2:
    return 'nd';
  case 3:
    return 'rd';
  default:
    return 'th';
}
}

setInterval(updateTimeAndDate, 1000);
updateTimeAndDate()


window.onhashchange = () => {
      try {
      const rawUrl = window.location.hash.split('#url=[')[1].split('];')[0];
      const decodedUrl = atob(rawUrl);
      window.location.href = decodedUrl;
      } catch {}
  }

  const select = document.querySelector('select');

  select.addEventListener('change', event => {
    const option = event.target.value;
  
    if (option === 'blob') {
      const blob = new Blob([document.documentElement.outerHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.location.replace(url);
      select.option = "Open in...";
    } else if (option === 'popup') {
      url = document.location
      let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

      popupWindow = open('about:blank', 'test', params);
      popupWindow.document.body.innerHTML = `<iframe style="position:absolute;width:100%;height:100%;border:none;top:0;left:0;right:0;bottom:0;" src="${url}"></iframe>`;
      window.location.replace("https://google.com");
      select.option = "Open in...";
    } else if (option === 'ab') {
      const url = 'about:blank';
      const win = window.open(url);
      win.document.body.innerHTML = `<iframe style="position:absolute;width:100%;height:100%;border:none;top:0;left:0;right:0;bottom:0;" src="${window.location.href}"></iframe>`;
    }
    select.option = "Open in...";
  });
