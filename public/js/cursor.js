  var ring = document.createElement('img');
  ring.id="ring";
  ring.src="/img/ring.gif";
  ring.style.pointerEvents = "none";
  ring.style.userdrag="none";
  ring.style.userselect="none";
  ring.style.display="none";
  ring.style.position="absolute";
  ring.style.width="45px";
  ring.style.height="45px";
  document.body.appendChild(ring);

  var cursor1 = document.createElement('img');
  cursor1.id="cursor1";
  cursor1.src="/img/cursor.png";
  cursor1.style.pointerEvents = "none";
  cursor1.style.userdrag="none";
  cursor1.style.userselect="none";
  cursor1.style.display="none";
  cursor1.style.position="absolute";
  cursor1.style.width="22px";
  cursor1.style.height="25px";
  document.body.appendChild(cursor1);

  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)!=true){ 
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener("mouseleave", (event) => {  
      if (event.clientY<0 || event.clientX<0 || (event.clientX>window.innerWidth || event.clientY>window.innerHeight)) {  
        cursor1.style.display="none";
        ring.style.display="none";
      }  
    });
    window.addEventListener('mousemove', (event) => {
      cursor1.style.display="block";
      ring.style.display="block";
      var toleft=event.clientX-3;
      var totop=event.clientY-5;
      cursor1.style.left=toleft+"px";
      cursor1.style.top=totop+"px";
      function waiting(){
        var toleft2=event.clientX-14.5;
        var totop2=event.clientY-14;
        ring.style.left=toleft2+"px";
        ring.style.top=totop2+"px";
      }
      setTimeout(waiting,15);
    });
  }
  document.onkeypress = function () {cursor1.style.display="none"; ring.style.display="none";};
  function a(e){var n=e.childNodes;for(var i in n){a(n[i]);if(n[i].style) n[i].style.cursor="none";}}a(document);
