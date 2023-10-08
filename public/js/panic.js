var eventKey = localStorage.getItem("eventKey") || prompt('What panic key do you want?');
var panicLink = localStorage.getItem("panicLink") || prompt('What panic link do you want?');
document.addEventListener("keydown", function(event) {
  if (event.key === eventKey) {
    if (window.self !== window.top) {
      window.parent.window.location.replace(panicLink);
    } else {
      window.parent.window.location.replace(panicLink);
    }
  }
});

var eventKeyInput = document.getElementById("eventKeyInput");
eventKeyInput.addEventListener("input", function() {
  eventKey = eventKeyInput.value;
});

var linkInput = document.getElementById("linkInput");
linkInput.addEventListener("input", function() {
  panicLink = linkInput.value;
});

function saveEventKey() {
  eventKey = eventKeyInput.value;
  localStorage.setItem("eventKey", eventKey);
  localStorage.setItem("panicLink", panicLink);
}
