$(document).ready(function () {
    "use strict";
    InitSlider();
    initBrowser();
    initTable();

});


// resize
$(window).resize(function () {
});


// scroll
$(window).scroll(function () {
});

function initTable() {
    jQuery('.content-rules table tr:first-of-type td').each(function () {
        var newIndex = jQuery(this).index() + 1;

        jQuery(this).closest('table').find('tr:not(:first-child)')
            .find('td:nth-child(' + newIndex + ')').attr('data-title', jQuery(this).text());
    });
}

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
