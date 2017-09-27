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

    // function initSlider($sliderClass, $SliderOption) {
    //     $($sliderClass + ':not(.slick-slider)').each(function(index, el) {
    //         $(el).slick($SliderOption($(this)));
    //     });
    // }
    // function sliderJsOption($this){
    //     return {
    //         slidesToShow: 2,
    //         slidesToScroll: 1,
    //         prevArrow: $this.parent().find(".slider-arrow-prev"),
    //         nextArrow: $this.parent().find(".slider-arrow-next"),
    //     }
    // }
    // initSlider('.slider-js .items', sliderJsOption);
}

function initBrowser() {
    $('body')
        .addClass('os-' + window.jscd.os.toLowerCase())
        .addClass('browser-' + window.jscd.browser.toLowerCase())
        .attr('data-os-version', window.jscd.osVersion.toLowerCase());
}






