console.log('reading');

var thumbnails = document.getElementsByClassName('img');
var background = document.getElementsByClassName('lb-overlay-backgrnd');
var close = document.getElementsByClassName ('lb-close');



thumbnails.addEventListener ("click", function() {
  background.className='displayFade';
  background.style.opacity="0.7";
});


close.addEventListener ("click", function() {
  background.className='displayDisappear';
  background.style.opacity="0";
});
