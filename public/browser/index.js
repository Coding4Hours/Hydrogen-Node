document.addEventListener('keydown', function(e){
//Ctrl + Y: New Tab
if (e.ctrlKey && e.keyCode == 89) {
window.parent.newtab()
//Ctrl + Q: Close Tab
} else if (e.ctrlKey && e.keyCode == 81) {
window.parent.removetab(window.parent.currenttab())
}
});

//Ctrl + P: Print
jQuery(document).bind("keyup keydown", function(e){
if(e.ctrlKey && e.keyCode == 80){
print()
return false;
}
});

//Ctrl + R: Reload
jQuery(document).bind("keyup keydown", function(e){
if(e.ctrlKey && e.keyCode == 82){
window.location.reload()
return false;
}
});
