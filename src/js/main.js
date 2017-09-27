//= jquery-3.2.1.min.js
//= browser.js
//= validation-form.js
//= swiper.jquery.umd.min.js
//= slick.js


$(document).ready(function() {
    InitSlider();
    initBrowser();

});


// resize
$( window ).resize(function() {
});


// scroll
$(window).scroll(function() {
});



function InitSlider() {
    // var swiper = new Swiper('.swiper-container', {
    //     nextButton: '.swiper-button-next',
    //     prevButton: '.swiper-button-prev',
    //     slidesPerView: 4,
    //     centeredSlides: true,
    //     paginationClickable: true,
    //     spaceBetween: 20,
    // });
}

function initBrowser() {
    $('body')
        .addClass('os-' + window.jscd.os.toLowerCase())
        .addClass('browser-' + window.jscd.browser.toLowerCase())
        .attr('data-os-version', window.jscd.osVersion.toLowerCase());
}



function getSliderSettings(){
    return {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1
    }
}
// $('.slick-slider-js').each(function(index, el) {
//       $(this).slick(getSliderSettings());
// });


