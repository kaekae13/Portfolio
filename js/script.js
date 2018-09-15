console.log('reading');

var toggle = document.getElementById('toggle');
var slider = document.querySelector('.slider');

toggle.addEventListener('click', toggleSlider, false);

function toggleSlider(){
    if (slider.classList.contains('opened')) {
        slider.classList.remove('opened');
        slider.classList.add('closed');
        toggle.innerHTML = "&times;";
        toggle.style.color='white';
        toggle.style.fontSize='100px';
    } else {
        slider.classList.remove('closed');
        slider.classList.add('opened');
        toggle.innerHTML = "&#9776;";
        toggle.style.color='#494646';
}
}
