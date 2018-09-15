console.log('reading');

// Carousel Gallery

(function () {
  var slideSpeed = 0.06;
  var enableAutoSlide = true;
  var autoSlideRate = 4000;
  var imageFitPercentage = 80;

  var sliders;
  var images = [];
  var currentSlide = 0;

  initSlider();

  function initSlider() {
    sliders = document.getElementsByClassName('carousel-slideshow');
    for(var i = 0; i < sliders.length; i++)
      buildSlider(sliders[i]);
  }

  function buildSlider(slider) {
    var imgSrc = [];
    stashImageSources(slider.children, imgSrc);
    slider.innerHTML = '';
    addArrows(slider);
    createInitSlide(slider, imgSrc[0]);
    loadStoredImages(imgSrc);
  }

  function stashImageSources(images, imgSrc) {
    for(var i = 0; i < images.length; i++) {
      imgSrc.push(images[i].src);
      images[i].src = '';
    }
  }

  function addArrows(slider) {
    addClassDiv(slider, 'slider-arrow-box-left');
    addClassDiv(slider, 'slider-arrow-box-right');
    addClassDiv(slider.children[0], 'left-slider-arrow');
    addClassDiv(slider.children[1], 'right-slider-arrow');
    addPrevListener(slider);
    addNextListener(slider);
    if(enableAutoSlide) startAutoSlide(slider);
  }

  function addClassDiv(parent, className) {
    var div = document.createElement('div');
    addClass(div, className);
    parent.appendChild(div);
  }

  function addClass(element, className) {
    var classes = element.className.split(' ');
    if(classes.indexOf(className) == -1)
      element.className += ' ' + className;
  }

  function addPrevListener(slider) {
    slider.children[0].onmousedown = function() {
      if(!slider.animRunning) prevSlide(slider);
    };
  }

  function addNextListener(slider) {
    slider.children[1].onmousedown = function() {
      if(!slider.animRunning) nextSlide(slider);
    };
  }

  function createInitSlide(slider, src) {
    var initSlide = createSlide(slider, src);
    slider.appendChild(initSlide);
    fitImageToSlider(initSlide, slider);
  }

  function createSlide(slider, src) {
    var slide = document.createElement('img');
    slide.setAttribute('src', src);
    addClass(slide, 'slide');
    return slide;
  }

  function fitImageToSlider(slide, slider) {
    slide.style.height = imageFitPercentage + '%';
    if(slide.clientWidth >= slider.clientWidth) {
      slide.style.width = imageFitPercentage + '%';
      slide.style.height = 'auto';
    }
    slide.style.marginLeft = ((slider.clientWidth - slide.clientWidth)/2) + 'px';
    slide.style.marginTop = ((slider.clientHeight - slide.clientHeight)/2) + 'px';
  }

  function loadStoredImages(imgSrc) {
    for(var i = 0; i < imgSrc.length; i++) {
      images[i] = new Image;
      images[i].src = imgSrc[i];
    }
  }

  function nextSlide(slider) {
    if(enableAutoSlide) resetAutoSlide(slider);
    currentSlide = carouselIncrement(currentSlide, 0, images.length-1);
    var nextSrc = images[currentSlide].src;
    var nextSlide = createSlide(slider, nextSrc);
    nextSlide.style.position = 'absolute';
    nextSlide.style.left = '100%';
    slider.appendChild(nextSlide);
    fitImageToSlider(nextSlide, slider);
    slideToNext(slider);
  }

  function resetAutoSlide(slider) {
    if(slider.autoSlideTimer != undefined)
      clearTimeout(slider.autoSlideTimer);
    startAutoSlide(slider);
  }

  function startAutoSlide(slider) {
    slider.autoSlideTimer = setTimeout(function() {
      if(!slider.animRunning) nextSlide(slider);
    }, autoSlideRate);
  }

  function carouselIncrement(variable, min, max) {
    if(variable + 1 > max) return min;
    else return ++variable;
  }

  function slideToNext(slider) {
    var oldSlide = slider.children[2];
    var newSlide = slider.children[3];
    startNextSlideAnimation(slider, oldSlide, newSlide);
  }

  function startNextSlideAnimation(slider, oldSlide, newSlide) {
    slider.animRunning = true;
    slider.slideInterval = setInterval(function() {
      var newSlidePos = getPxStyle(newSlide, 'left');
      var delta = Math.floor(newSlidePos * slideSpeed);
      if(delta < 4) delta = 4;
      oldSlide.style.left = getPxStyle(oldSlide, 'left') - delta + 'px';
      newSlide.style.left = newSlidePos - delta + 'px';
      if(getPxStyle(newSlide, 'left') <= 0)
        endNextSlideAnimation(slider, oldSlide, newSlide);
    }, 16);
  }

  function getPxStyle(element, style) {
    var style = window.getComputedStyle(element).getPropertyValue(style);
    return parseInt(style.substring(0, style.length - 2));
  }

  function endNextSlideAnimation(slider, oldSlide, newSlide) {
    clearInterval(slider.slideInterval);
    newSlide.style.left = 0 + 'px';
    slider.removeChild(oldSlide);
    newSlide.style.position = 'relative';
    slider.animRunning = false;
  }

  function prevSlide(slider) {
    currentSlide = carouselDecrement(currentSlide, 0, images.length-1);
    var prevSrc = images[currentSlide].src;
    var prevSlide = createSlide(slider, prevSrc);
    prevSlide.style.position = 'absolute';
    prevSlide.style.left = '-100%';
    slider.appendChild(prevSlide);
    fitImageToSlider(prevSlide, slider);
    slideToPrev(slider);
  }

  function carouselDecrement(variable, min, max) {
    if(variable - 1 < min) return max;
    else return --variable;
  }

  function slideToPrev(slider) {
    var oldSlide = slider.children[2];
    var newSlide = slider.children[3];
    startPrevSlideAnimation(slider, oldSlide, newSlide);
  }

  function startPrevSlideAnimation(slider, oldSlide, newSlide) {
    slider.animRunning = true;
    slider.slideInterval = setInterval(function() {
      var newSlidePos = getPxStyle(newSlide, 'left');
      var delta = -Math.floor(newSlidePos * slideSpeed);
      if(delta < 4) delta = 4;
      oldSlide.style.left = getPxStyle(oldSlide, 'left') + delta + 'px';
      newSlide.style.left = newSlidePos + delta + 'px';
      if(getPxStyle(newSlide, 'left') >= 0)
        endNextSlideAnimation(slider, oldSlide, newSlide);
    }, 16);
  }
  
  function endPrevSlideAnimation(slider, oldSlide, newSlide) {
    clearInterval(slider.slideInterval);
    newSlide.style.left = 0 + 'px';
    slider.removeChild(oldSlide);
    newSlide.style.position = 'relative';
    slider.animRunning = false;
  }

  window.onresize = function() {
    sliders = document.getElementsByClassName('carousel-slideshow');
    for(var i = 0; i < sliders.length; i++) {
      var slide = sliders[i].children[2];
      fitImageToSlider(slide, sliders[i]);
    }
  };
})();
