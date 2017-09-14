$( document ).ready(function() {
    InitSlider();
});

// resize
$( window ).resize(function() {
    InitSlider();
});


// scroll
$(window).scroll(function() {
});



function InitSlider() {
    var swiper = new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 4,
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 20,
    });

}