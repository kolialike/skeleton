// ready
$( document ).ready(function() {
    initBrowser();
    initAnimationPlugin();
    animation();
    menuDropdown();
    // fixedMenu();
    imgHiddenText();
    initFliper();
    loginModalSize();
    initBannerSmallSticky();
    buttonScrollTop();
    searchAnimation();
    iniMmodal();
    InitAllSlider();
    initHoverLogo();
    initSingleParallax();
    swiperSingleSliderInit();
    initHeaderSearchHover();
    InitTwoImgDescriptionOpen();
    initResponsiwTwoImgDescription();
    initCreateTabs();
    initImgShare();
    initImgScroll();
    initParallax();
    initTable();

});

// resize
$( window ).resize(function() {
    buttonScrollTop();
    menuDropdown();
    // fixedMenu();
    imgHiddenText();
    initFliper();
    loginModalSize();
    initBannerSmallSticky();
    // InitAllSlider();
    initSingleParallax();
    initResponsiwTwoImgDescription();
});

// scroll
$(window).scroll(function() {
    imgHiddenText();
    initParallax();
});

function initTable() {
    jQuery('.content-rules table tr:first-of-type td').each(function () {
        var newIndex = jQuery(this).index() + 1;

        jQuery(this).closest('table').find('tr:not(:first-child)')
            .find('td:nth-child(' + newIndex + ')').attr('data-title', jQuery(this).text());
    });
}

function initParallax(){
    try {
        var a;
        if ($('.parallax-js').length > 0) {
            var parallaxOffsetTop = ($(window).scrollTop() - $(".parallax-js").offset().top)
            if ($(window).scrollTop() >= $(".parallax-js").offset().top) {
                if ($(window).width() <= 760) {
                    $('.parallax-text-js').css('transform', 'translateY(' + (parallaxOffsetTop * 0.3) + 'px)');
                } else {
                    $('.parallax-text-js').css('transform', 'translateY(' + (parallaxOffsetTop * 0.6) + 'px)');
                }
                $('.parallax-img-js').css('transform', 'translateY(' + (parallaxOffsetTop * 0.6) + 'px)');
            } else {
                $('.parallax-img-js').css('transform', 'translateY(' + (0) + 'px)')
            }
        }
    } catch (e) {
        console.log(e);
    }
};

function initImgScroll() {
    if($('.arrows-navigation-event-photo-js').length > 0){
        var sumSingeImg = $(".single-img-title").length;
        var sumBannerOnScroll = $(".banner-scroll-on-this .a-single").length;

        var clickScroll = false;
        var indexImg = 0;
        var indexBanner = 1;
        var indexGlobal = 0;

        var docTop = $(document).scrollTop();
        var $this;
        var $thisFirst = $(".single-img-title").eq(0);
        var $thisLast = $(".single-img-title").eq(sumSingeImg - 1);

        $(window).on('scroll', function (event) {
            docTop = $(document).scrollTop();
            if (!clickScroll ) {
                $(".single-img-title").each(function (index, el) {
                    $this = $(this);
                    $thisOfsetTop = $this.offset().top;
                    if (docTop >= $thisOfsetTop && docTop < $thisOfsetTop + $this.height()) {
                        $('.arrow-bottom-js').removeClass("disabled");
                        $('.arrow-top-js').removeClass("disabled");
                        $this.addClass("scroll-on-this-js").siblings().removeClass("scroll-on-this-js");
                        indexImg = +($this.attr('id'));
                        if(indexImg != indexGlobal){
                            if(indexGlobal < indexImg){
                                rotateBanner();
                            }else{
                                rotateBanner(false);
                            }
                            indexGlobal = indexImg;
                        }
                    }
                    FirstLastItem()
                });
            }
        });

        function FirstLastItem() {
            if(docTop < $thisFirst.offset().top - 30){
                $thisFirst.addClass("scroll-on-this-js").siblings().removeClass("scroll-on-this-js");
                indexImg = 0;
                $('.arrow-top-js').addClass("disabled");
            } else if (docTop > $thisLast.offset().top) {
                $thisLast.addClass("scroll-on-this-js").siblings().removeClass("scroll-on-this-js");
                indexImg = sumSingeImg + 1;
                $('.arrow-bottom-js').addClass("disabled");
            }
        }
        FirstLastItem();


        $(".arrows-navigation-event-photo-js .arrow-bottom-js").on('click', function (event) {
            clickScroll = true;
            if (indexImg <= sumSingeImg) {
                $('.arrow-top-js').removeClass("disabled");
                indexImg = indexImg + 1;
                indexGlobal = indexImg;
                rotateBanner();
            }
            if(indexImg <= 1){
                $('.arrow-top-js').addClass("disabled");
            }
            $('body, html').animate({scrollTop: $(".single-img-title#" + indexImg).offset().top - 20}, 200, function () {
                clickScroll = false;
                if (indexImg >= sumSingeImg) {
                    $('.arrow-bottom-js').addClass("disabled");
                }
            });
        });
        $(".arrows-navigation-event-photo-js .arrow-top-js").on('click', function (event) {
            clickScroll = true;
            if (indexImg > 1) {
                $('.arrow-bottom-js').removeClass("disabled");
                indexImg = indexImg - 1;
                indexGlobal = indexImg;
                rotateBanner(false);
            }
            if(indexImg >= sumSingeImg){
                $('.arrow-bottom-js').addClass("disabled");
            }

            $('body, html').animate({scrollTop: $(".single-img-title#" + indexImg).offset().top - 20}, 200, function () {
                clickScroll = false;
                if (indexImg <= 1) {
                    $('.arrow-top-js').addClass("disabled");
                }
            });
        });
    }

    function rotateBanner(next = true) {
        if(next){
            if(indexBanner >= sumBannerOnScroll){
                indexBanner = 1
            }else{
                indexBanner = indexBanner + 1;
            }
            $(".banner-scroll-on-this .a-single").eq(indexBanner - 1).addClass("active").siblings().removeClass("active");
        }else{
            if(indexBanner <= 1){
                indexBanner = sumBannerOnScroll
            }else{
                indexBanner = indexBanner -1;
            }
            $(".banner-scroll-on-this .a-single").eq(indexBanner - 1).addClass("active").siblings().removeClass("active");
        }

    }

}



// if($('.banner-scroll-on-this').length > 0){
//     if (indexBanner >= sumBannerOnScroll) {
//         indexBanner = 0;
//     } else {
//         indexBanner = indexBanner + 1;
//     }
//     $(this).parents("body").find(".banner-scroll-on-this .a-single").eq(indexBanner).addClass("active").siblings().removeClass("active");
// }
// if($('.banner-scroll-on-this').length > 0){
//     if (indexBanner <= 0) {
//         indexBanner = sumBannerOnScroll;
//     } else {
//         indexBanner = indexBanner - 1;
//     }
//     $(this).parents("body").find(".banner-scroll-on-this .a-single").eq(indexBanner).addClass("active").siblings().removeClass("active");
// }


function initImgShare() {
    try {
        $(".show-socials-js").each(function (index, el) {
            $(this).on('click', function (event) {
                event.preventDefault();
                $(this).parent().toggleClass("open");
            });
        });
    } catch (e) {
        console.log(e);
    }
}
function initBrowser() {
    $('body')
        .addClass('os-' + window.jscd.os.toLowerCase())
        .addClass('browser-' + window.jscd.browser.toLowerCase())
        .attr('data-os-version', window.jscd.osVersion.toLowerCase());
}



function InitTwoImgDescriptionOpen() {
    try { // $(".open-block-js").on('click', function(event) {
        //     $(this).parents(".two-img-description-js").addClass("show-two-img-description-r");
        //     $(this).addClass("index-img").siblings().removeClass("index-img");
        // });
        $(".arrow-back-js").on('click', function (event) {
            // $(this).parents(".two-img-description-js").removeClass("show-two-img-description-r");
            // $(".open-block-js").each(function(index, el) {
            //       $(this).removeClass("index-img");
            // });
            $(".tabs-js").removeClass("active-block");
            $(".tabs-js .tabs-item-js").removeClass("active");
            $(".tabs-content-js .tabs-content-item-js").removeClass("active");

        });
    } catch (e) {
        console.log(e);
    }
}

function initCreateTabs(tabsItemClass, TabsContentItemClass) {
    try {
        $(tabsItemClass).on('click', function (event) {
            event.preventDefault();
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parent().addClass('active-block');
            var index = $(tabsItemClass).index($(this));
            $(TabsContentItemClass).eq(index).addClass('active').siblings().removeClass('active');
        });
    } catch (e) {
        console.log(e);
    }
}
initCreateTabs('.tabs-js .tabs-item-js','.tabs-content-js .tabs-content-item-js');

function initResponsiwTwoImgDescription() {
    // if($(window).width() <= 600){
    //     $(".two-img-description-js").addClass("show-two-img-description-r");
    // }else{
    //     $(".two-img-description-js").removeClass("show-two-img-description-r");
    // }
}

function initHeaderSearchHover() {
    try {
        $(".search__label-init").hover(function () {
            $(this).parent().addClass("hover");
        }, function () {
            $(this).parent().removeClass("hover")
        });
    } catch (e) {
        console.log(e);
    }
}

// Barger menu toggler
$(function() {
    try {
        $('.barger-menu-toggler').on('click', function () {
            $('.header__top-start').toggleClass('header__top-start--show');
        });
    } catch (e) {
        console.log(e);
    }
    try {
        $(document).click(function (e) {
            if (!$(e.target).closest('.header__inner, .barger-menu').length) {
                $('.header__top-start').removeClass('header__top-start--show');
            }
        });
    } catch (e) {
        console.log(e);
    }
});
// Barger menu toggler end


// Main menu toggler
$(function() {
    try {
        $('.main-menu-toggler').on('click', function () {
            $('.main-menu').toggleClass('main-menu--show');
        });
    } catch (e) {
        console.log(e);
    }
});


// hover logo
function initHoverLogo() {
    // $(".logo").sparkle({
    //     count: 45,
    //     color: ["#000","#fff"],
    //     direction: "up",
    //     time: 0.8,
    //     overlap: -3,
    //     count: 30,
    //     minSize: 4,
    //     maxSize: 7
    // });
    // $('.header__inner a').hover(function(e) {
    //     console.log($(e.target));
    //     if($(e.target).closest('.logo-js').length){
    //         console.log('1');
    //         $(this).closest('.header__inner').addClass("logo-hover");
    //     }
    //     // else{
    //     //     console.log('2');
    //     //     $(this).closest('.header__inner').removeClass("logo-hover");
    //     // }
    //     //
    //     // $(this).closest('.header__inner').addClass("logo-hover");
    // }, function(e) {
    //     if (!$(e.target).closest('.logo-hover').length){
    //         console.log('2');
    //         // $(this).closest('.header__inner').removeClass("logo-hover");
    //     }
    // });
    $('.logo-js').hover(function() {
        $(this).closest('.header__inner').addClass("logo-hover");
        $('.header__top-start').removeClass("header__top-start--show");
    }, function() {
        $(this).closest('.header__inner').removeClass("logo-hover");
    });

}
// hover logo



// modal open + copy
function iniMmodal() {
    var static_modal = "";
    var getIdCModal = false;
    $(document).on('click', '[data-modal]', function(e) {
        e.preventDefault();
        var thisId = $(this).data('modal')?"#"+$(this).data('modal'):$(this).attr('href'),
            modalBlock = $(".datamodal"+thisId);

        if($(this).data('modalcopy')) {
            copyModals(thisId);
            return false;
        }

        static_modal = thisId;
        modalBlock.addClass('active');
        $("body").addClass('active-modal');

        $('.modal-close-js', modalBlock).on('click', function(e) {
            modalBlock.removeClass('active');
            $('body').removeClass('active-modal');
        });

        $(document).keyup(function(e) {
            if (e.keyCode == 27 && $(".datamodal").hasClass('active')) {
                modalBlock.removeClass('active');
                $('body').removeClass('active-modal');
            }
        });
    });
    function copyModals(id) {
        getIdCModal = 'loadmodal'+getRandomInt(1111, 9999);
        $("body").addClass('active-modal').append('<div class="datamodal active" id="'+getIdCModal+'">'+$(id).html()+'</div>');
        if($("#"+getIdCModal).length>0) {
            $('.modal-close-js', "#"+getIdCModal).on('click', function(e) {
                $("#"+getIdCModal).detach();
                $('body').removeClass('active-modal');
                getIdCModal = false;
            });
        }
    }
    function getRandomInt(min, max) {
        min = min || 1;
        max = max || 99999999999;
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
// modal open + copy end



//animation
function initAnimationPlugin() {
    (function(jQuery) {
        var jQuery = window.jQuery || this.jQuery;

        $.fn.visible = function(partial) {

            var $t            = $(this),
                $w            = $(window),
                viewTop       = $w.scrollTop(),
                viewBottom    = viewTop + $w.height(),
                _top          = $t.offset().top,
                _bottom       = _top + $t.height(),
                compareTop    = partial === true ? _bottom : _top,
                compareBottom = partial === true ? _top : _bottom;

            return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

        };

    }).call(this);
}
function animation() {
    try {
        var $window = $(window);
        var animateItems = $('.animate');
        var af = $window.on('scroll', function () {
            animateItems.each(function (index, el) {
                var thisEl = $(el);
                if (thisEl.visible(true) && !thisEl.hasClass('animated-elem')) {
                    thisEl.addClass('animated-elem');
                }
            });
        });
        $window.trigger('scroll');
    } catch (e) {
        console.log(e);
    }

        // jQuery(function($) {
        //     var $window = $(window);
        //     var animateItems = $('.animate');
        //     var af = $window.on('scroll', function () {
        //         animateItems.each(function (index, el) {
        //             var thisEl = $(el);
        //             if (thisEl.visible(true) && !thisEl.hasClass('animated-elem')) {
        //                 thisEl.addClass('animated-elem');
        //             }
        //         });
        //     });
        //     $window.trigger('scroll');
        // });
};
//animation


// menuDropdown
function menuDropdown() {
    try {
        if ($(window).width() < 760) {
            $(".with-dropdown-item").addClass("open");
            $(".with-dropdown-item .arrows").on('click', function (event) {
                // event.preventDefault();
                $(this).parent().toggleClass("open").siblings().removeClass("open");
            });
        }
        else{
            $(".with-dropdown-item").removeClass("open");
        }
    } catch (e) {
        console.log(e);
    }
}
// menuDropdown end


// buttonScrollTop
function buttonScrollTop() {
    $(window).scroll(function(e) {
        try {
            var top = $(document).scrollTop();
            if ($(window).width() > 760 && top >= 1050){
                $('.to-top').addClass("open");
            }else if($(window).width() <= 760 && top >= 400){
                $('.to-top').addClass("open");
            }else {
                $('.to-top').removeClass("open");
            }
            e.preventDefault();
            return false;
        } catch (e) {
            console.log(e);
        }
    });
    $(document).on('click', '.to-top', function(e) {
        e.preventDefault();
        try {
            if ($(window).width() > 760){
                $('body, html').animate({scrollTop: 0}, 800);
                return false;
            }else{
                $('body, html').animate({scrollTop: 50}, 100);
                return false;
            };
        } catch (e) {
            console.log(e);
        }
    });
}
// buttonScrollTop


// fixedMenu
function fixedMenu() {
    try {
        var $window = $(window);
        var $menu = $('.header__inner');
        var $menuTop = $(".header").offset().top;
        $window.on('scroll', function () {
            var windowTop = $window.scrollTop();
            if (windowTop > $menuTop) {
                $menu.addClass("fixed");
            } else {
                $menu.removeClass("fixed");
            }
        });
    } catch (e) {
        console.log(e);
    }
};
// fixedMenu end


// img hidden text
function imgHiddenText() {
    try {
        $('.js-img-desc').each(function () {
            var fillText = $(this).find('.image-fill__text');
            $(this).css('bottom', -fillText.height() - 10);
        })
    } catch (e) {
        console.log(e);
    }
};
// img hidden text end


// Search animation toggler
function searchAnimation() {
    try {
        $('.js-search-toggler').on('click', function () {
            $('.btn-search').toggleClass('search--show');
        });
    } catch (e) {
        console.log(e);
    }
};
// Search animation toggler end









function swiperSingleSliderInit(){
    if($(".single-slider").length > 0){
        $('.banner-small-info').each(function(index, el) {
            $(this).find('.a-single:first-of-type').addClass("active");
        });
        $(document).on('click', ".single-slider .swiper-button-next", function(event) {
            var $this = $(this);
            if($(".a-single").length > 0){
                var imageFillImgLength = $(this).parents(".single-slider").find(".a-single").length -1;
                var imageFillImgActiveIndex = $(this).parents(".single-slider").find(".a-single.active").index();
                var imageFillImgActiveIndexNext = imageFillImgActiveIndex +1;
                if (!$this.hasClass("swiper-button-disabled") && imageFillImgActiveIndex !== imageFillImgLength) {
                    $this.removeClass("not-swipe-slider");
                    $(this).parents(".single-slider").find(".a-single").eq(imageFillImgActiveIndexNext).addClass("active").siblings().removeClass("active");
                }else if(!$this.hasClass("swiper-button-disabled") && imageFillImgActiveIndex == imageFillImgLength) {
                    $this.removeClass("not-swipe-slider");
                    imageFillImgActiveIndexNext = 0;
                    $(this).parents(".single-slider").find(".a-single").eq(imageFillImgActiveIndexNext).addClass("active").siblings().removeClass("active");
                }else if($this.hasClass("swiper-button-disabled") && imageFillImgActiveIndex !== imageFillImgLength && !$this.hasClass("not-swipe-slider")){
                    $(this).parents(".single-slider").find(".a-single").eq(imageFillImgActiveIndexNext).addClass("active").siblings().removeClass("active");
                    $this.addClass("not-swipe-slider");
                }else if($this.hasClass("swiper-button-disabled") && imageFillImgActiveIndex == imageFillImgLength && !$this.hasClass("not-swipe-slider")){
                    imageFillImgActiveIndexNext = 0;
                    $(this).parents(".single-slider").find(".a-single").eq(imageFillImgActiveIndexNext).addClass("active").siblings().removeClass("active");
                    $this.addClass("not-swipe-slider");
                }

            }
            if($(".swiper-slider-decription-to-slide").length > 0 && !$(".swiper-container").hasClass("swiper-container-multirow")){
                var sliderDescItemLength = $(this).parents(".single-slider").find(".swiper-slider-decription-to-slide .item").length -1;
                var sliderDescItemActiveIndex = $(this).parents(".single-slider").find(".swiper-slider-decription-to-slide .item.active").index();
                var sliderDescItemActiveIndexNext = sliderDescItemActiveIndex + 1;
                if (sliderDescItemActiveIndex == sliderDescItemLength) {
                    sliderDescItemActiveIndexNext = sliderDescItemLength;
                }
                $(this).parents(".single-slider").find(".swiper-slider-decription-to-slide .item").eq(sliderDescItemActiveIndexNext).addClass("active").siblings().removeClass("active");
                // $(this).parents(".single-slider").find(".swiper-slider-decription-to-slide .item.active").next().addClass("active").siblings().removeClass("active");
            }
            if($('.swiper-socials .socials').length > 0 && !$(".swiper-container").hasClass("swiper-container-multirow")){
                var socialsItemLength = $(this).parents(".single-slider").find(".swiper-socials .socials .item").length -1;
                var socialsItemActiveIndex = $(this).parents(".single-slider").find(".swiper-socials .socials .item.active").index();
                var socialsItemActiveIndexNext = socialsItemActiveIndex + 1;
                if (socialsItemActiveIndex == socialsItemLength) {
                    socialsItemActiveIndexNext = socialsItemLength;
                }
                $(this).parents(".single-slider").find(".swiper-socials .socials .item").eq(socialsItemActiveIndexNext).addClass("active").siblings().removeClass("active");
                // $(this).parents(".single-slider").find(".swiper-slider-decription-to-slide .item.active").next().addClass("active").siblings().removeClass("active");
            }
        });
        $(document).on('click', ".single-slider .swiper-button-prev", function(event) {
            var $this = $(this);
            if($(".a-single").length > 0){
                var imageFillImgLength = $(this).parents(".single-slider").find(".a-single").length -1;
                var imageFillImgActiveIndex = $(this).parents(".single-slider").find(".a-single.active").index();
                var imageFillImgActiveIndexNext = imageFillImgActiveIndex - 1;
                if (!$this.hasClass("swiper-button-disabled") && imageFillImgActiveIndex !== 0) {
                    $(this).parents(".single-slider").find(".a-single").eq(imageFillImgActiveIndexNext).addClass("active").siblings().removeClass("active");
                    $this.removeClass("not-swipe-slider");
                }else if(!$this.hasClass("swiper-button-disabled") && imageFillImgActiveIndex == 0){
                    imageFillImgActiveIndexNext = imageFillImgLength;
                    $(this).parents(".single-slider").find(".a-single").eq(imageFillImgActiveIndexNext).addClass("active").siblings().removeClass("active");
                    $this.removeClass("not-swipe-slider");
                }else if($this.hasClass("swiper-button-disabled") && imageFillImgActiveIndex !== 0 && !$this.hasClass("not-swipe-slider")){
                    $(this).parents(".single-slider").find(".a-single").eq(imageFillImgActiveIndexNext).addClass("active").siblings().removeClass("active");
                    $this.addClass("not-swipe-slider");
                }else if($this.hasClass("swiper-button-disabled") && imageFillImgActiveIndex !== 0 && !$this.hasClass("not-swipe-slider")){
                    imageFillImgActiveIndexNext = imageFillImgLength;
                    $(this).parents(".single-slider").find(".a-single").eq(imageFillImgActiveIndexNext).addClass("active").siblings().removeClass("active");
                    $this.addClass("not-swipe-slider");
                }
            }
            if($(".swiper-slider-decription-to-slide").length > 0 && !$(".swiper-container").hasClass("swiper-container-multirow")){
                // var sliderDescItemLength = $(this).parents(".single-slider").find(".swiper-slider-decription-to-slide .item").length -1;
                var sliderDescItemActiveIndex = $(this).parents(".single-slider").find(".swiper-slider-decription-to-slide .item.active").index();
                var sliderDescItemActiveIndexNext = sliderDescItemActiveIndex -1;
                if (sliderDescItemActiveIndex == 0) {
                    sliderDescItemActiveIndexNext = 0;
                }
                $(this).parents(".single-slider").find(".swiper-slider-decription-to-slide  .item").eq(sliderDescItemActiveIndexNext).addClass("active").siblings().removeClass("active");
                // $(this).parents(".single-slider").find(".swiper-slider-decription-to-slide .item.active").prev().addClass("active").siblings().removeClass("active");
            }
            if($('.swiper-socials .socials').length > 0 && !$(".swiper-container").hasClass("swiper-container-multirow")){
                // var socialsItemLength = $(this).parents(".single-slider").find(".swiper-socials .socials .item").length -1;
                var socialsItemActiveIndex = $(this).parents(".single-slider").find(".swiper-socials .socials .item.active").index();
                var socialsItemActiveIndexNext = socialsItemActiveIndex -1;
                if (socialsItemActiveIndex == 0) {
                    socialsItemActiveIndexNext = 0;
                }
                $(this).parents(".single-slider").find(".swiper-socials .socials .item").eq(socialsItemActiveIndexNext).addClass("active").siblings().removeClass("active");
                // $(this).parents(".single-slider").find(".swiper-slider-decription-to-slide .item.active").next().addClass("active").siblings().removeClass("active");
            }
        });

        var fashionSwiperSingle;
        swiperSingleSliderOption();
        function swiperSingleSliderOption(){
            if($(".swiper-slider-decription-to-slide").length > 0){
                fashionSwiperSingle = new Swiper('.swiper-slider .swiper-container', {
                    nextButton: '.single-slider .swiper-button-next',
                    prevButton: '.single-slider .swiper-button-prev',
                    pagination: '.swiper-slider-pagination',
                    paginationType: 'fraction',
                    spaceBetween: 0,
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    onlyExternal: true,
                    slidesPerColumn: 1,
                    slidesPerColumnFill: 'row',
                    slideToClickedSlide: true,
                    // loop: true,
                    // loopedSlides: 3,
                    effect: "fade",
                    fade: {
                        crossFade: true
                    },
                    // onClick: function (swiper) {
                    //     console.log("1");
                    //     var clickInd = swiper.clickedIndex;
                    //     console.log(clickInd);
                    //     swiperSingle.slideTo(clickInd, 0, true);
                    // }
                });
            }else{
                fashionSwiperSingle = new Swiper('.swiper-slider .swiper-container', {
                    nextButton: '.single-slider .swiper-button-next',
                    prevButton: '.single-slider .swiper-button-prev',
                    pagination: '.swiper-slider-pagination',
                    paginationType: 'fraction',
                    spaceBetween: 0,
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    slidesPerColumn: 1,
                    slidesPerColumnFill: 'row',
                    slideToClickedSlide: true,
                    // loop: true,
                    // loopedSlides: 3,
                    effect: "fade",
                    fade: {
                        crossFade: true
                    },
                    // onClick: function (swiper) {
                    //     console.log("1");
                    //     var clickInd = swiper.clickedIndex;
                    //     console.log(clickInd);
                    //     swiperSingle.slideTo(clickInd, 0, true);
                    // }
                });
            }
        }
        $(document).on('click', '.more-slides', function(event) {

            if($(".swiper-slider").hasClass("slider-multi-img")){
                fashionSwiperSingle.destroy(true, true);
                $(".swiper-slider").removeClass("slider-multi-img");
                if($(".swiper-slider-decription-to-slide").length > 0){
                    fashionSwiperSingle = new Swiper('.swiper-slider .swiper-container', {
                        nextButton: '.single-slider .swiper-button-next',
                        prevButton: '.single-slider .swiper-button-prev',
                        pagination: '.swiper-slider-pagination',
                        paginationType: 'fraction',
                        spaceBetween: 0,
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                        onlyExternal: true,
                        slidesPerColumn: 1,
                        slidesPerColumnFill: 'row',
                        slideToClickedSlide: true,
                        // loop: true,
                        // loopedSlides: 3,
                        effect: "fade",
                        fade: {
                            crossFade: true
                        },
                        // onClick: function (swiper) {
                        //     console.log("1");
                        //     var clickInd = swiper.clickedIndex;
                        //     console.log(clickInd);
                        //     swiperSingle.slideTo(clickInd, 0, true);
                        // }
                    });
                }else{
                    fashionSwiperSingle = new Swiper('.swiper-slider .swiper-container', {
                        nextButton: '.single-slider .swiper-button-next',
                        prevButton: '.single-slider .swiper-button-prev',
                        pagination: '.swiper-slider-pagination',
                        paginationType: 'fraction',
                        spaceBetween: 0,
                        slidesPerView: 1,
                        slidesPerGroup: 1,
                        slidesPerColumn: 1,
                        slidesPerColumnFill: 'row',
                        slideToClickedSlide: true,
                        // loop: true,
                        // loopedSlides: 3,
                        effect: "fade",
                        fade: {
                            crossFade: true
                        },
                        // onClick: function (swiper) {
                        //     console.log("1");
                        //     var clickInd = swiper.clickedIndex;
                        //     console.log(clickInd);
                        //     swiperSingle.slideTo(clickInd, 0, true);
                        // }
                    });
                }
            }
            else{
                fashionSwiperSingle.destroy(true, true);
                $(".swiper-slider").addClass("slider-multi-img");
                if($(".swiper-slider-decription-to-slide").length > 0){
                    fashionSwiperSingle = new Swiper('.swiper-slider .swiper-container', {
                        nextButton: '.single-slider .swiper-button-next',
                        prevButton: '.single-slider .swiper-button-prev',
                        pagination: '.swiper-slider-pagination',
                        paginationType: 'fraction',
                        slideToClickedSlide: true,
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                        slidesPerColumn: 2,
                        onlyExternal: true,
                        slidesPerColumnFill: 'row',
                        spaceBetween: 20,
                        onClick: function (swiper) {
                            var clickInd = swiper.clickedIndex;
                            if (clickInd != undefined) {
                                fashionSwiperSingle.destroy(true, true);
                                fashionSwiperSingle = new Swiper('.swiper-slider .swiper-container', {
                                    nextButton: '.single-slider .swiper-button-next',
                                    prevButton: '.single-slider .swiper-button-prev',
                                    pagination: '.swiper-slider-pagination',
                                    paginationType: 'fraction',
                                    spaceBetween: 0,
                                    slidesPerView: 1,
                                    slidesPerGroup: 1,
                                    onlyExternal: true,
                                    slidesPerColumn: 1,
                                    slidesPerColumnFill: 'row',
                                    slideToClickedSlide: true,
                                    // loop: true,
                                    // loopedSlides: 3,
                                    effect: "fade",
                                    fade: {
                                        crossFade: true
                                    },
                                    // onClick: function (swiper) {
                                    //     console.log("1");
                                    //     var clickInd = swiper.clickedIndex;
                                    //     console.log(clickInd);
                                    //     swiperSingle.slideTo(clickInd, 0, true);
                                    // }
                                });
                                $(".swiper-slider").removeClass("slider-multi-img");
                                fashionSwiperSingle.slideTo(clickInd, 300, true);
                                $(".swiper-slider-decription-to-slide .item").eq(clickInd).addClass("active").siblings().removeClass("active");
                            }
                        },
                        breakpoints: {
                            760: {
                                spaceBetween: 10
                            }
                        }

                    });
                }else{
                    fashionSwiperSingle = new Swiper('.swiper-slider .swiper-container', {
                        nextButton: '.single-slider .swiper-button-next',
                        prevButton: '.single-slider .swiper-button-prev',
                        pagination: '.swiper-slider-pagination',
                        paginationType: 'fraction',
                        slideToClickedSlide: true,
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                        slidesPerColumn: 3,
                        slidesPerColumnFill: 'row',
                        spaceBetween: 20,
                        onClick: function (swiper) {
                            var clickInd = swiper.clickedIndex;
                            if (clickInd != undefined) {
                                fashionSwiperSingle.destroy(true, true);
                                fashionSwiperSingle = new Swiper('.swiper-slider .swiper-container', {
                                    nextButton: '.single-slider .swiper-button-next',
                                    prevButton: '.single-slider .swiper-button-prev',
                                    pagination: '.swiper-slider-pagination',
                                    paginationType: 'fraction',
                                    spaceBetween: 0,
                                    slidesPerView: 1,
                                    slidesPerGroup: 1,
                                    slidesPerColumn: 1,
                                    slidesPerColumnFill: 'row',
                                    slideToClickedSlide: true,
                                    // loop: true,
                                    // loopedSlides: 3,
                                    effect: "fade",
                                    fade: {
                                        crossFade: true
                                    },
                                    // onClick: function (swiper) {
                                    //     console.log("1");
                                    //     var clickInd = swiper.clickedIndex;
                                    //     console.log(clickInd);
                                    //     swiperSingle.slideTo(clickInd, 0, true);
                                    // }
                                });
                                $(".swiper-slider").removeClass("slider-multi-img");
                                fashionSwiperSingle.slideTo(clickInd, 0, true);
                            }
                        },
                        breakpoints: {
                            760: {
                                slidesPerView: 2,
                                slidesPerGroup: 2,
                                slidesPerColumn: 2,
                                spaceBetween: 10
                            }
                        }

                    });
                }

            }
        });
        $(window).resize(function(event) {
            fashionSwiperSingle.destroy(true, true);
            swiperSingleSliderOption();
        });
    }

    if($('.vote-slider-js').length > 0){
        $('.vote-slider-js').each(function (index) {
            var voteSlider = new Swiper($(this),{
                nextButton: $(this).parent().find('.swiper-button-next'),
                prevButton: $(this).parent().find('.swiper-button-prev'),
                pagination: $(this).parent().find('.swiper-pagination'),
                slidesPerView: 2,
                // centeredSlides: true,
                spaceBetween: 60,
                paginationClickable: true,
                breakpoints: {
                    1023: {
                        spaceBetween: 0,
                    },
                }
            });
        });
    }

}

//slider All init
function InitAllSlider() {

    try {
        if($('.slider-insta-js').length > 0) {
            // var slider =  $('.slider-insta-js .swiper-wrapper');
            //
            // slider.slick({
            //     infinite: true,
            //     slidesToShow: 6,
            //     slidesToScroll: 1,
            //     autoplay: true,
            //     dots: true,
            //     arrows: false,
            //     responsive: [
            //         {
            //             breakpoint: 1200,
            //             settings: {
            //                 slidesToShow: 4,
            //             }
            //         },
            //         {
            //             breakpoint: 900,
            //             settings: {
            //                 slidesToShow: 3,
            //             }
            //         },
            //         {
            //             breakpoint: 760,
            //             settings: {
            //                 slidesToShow: 2,
            //             }
            //         },
            //         {
            //             breakpoint: 500,
            //             settings: {
            //                 slidesToShow: 1,
            //             }
            //         },
            //     ]
            // });
            //

            $('.slider-insta-js').each(function (index) {
                var swiperInsta = new Swiper($(this), {
                    pagination: $(this).parent().find('.swiper-pagination'),
                    slidesPerView: 6,
                    paginationClickable: true,
                    loop: true,
                    loopSlides: 2,
                    autoplay: 5000,
                    autoplayDisableOnInteraction: false,
                    breakpoints: {
                        1200: {
                            slidesPerView: 4
                        },
                        900: {
                            slidesPerView: 3
                        },
                        760: {
                            slidesPerView: 2
                        },
                        500: {
                            slidesPerView: 1
                        }
                    },
                    // onReachBeginning: function(swiper){
                    //     swiper.update();
                    // },
                    onInit: function(swiper){
                        var slidesLength = swiper.container.find('.swiper-slide:not(.swiper-slide-duplicate)').length;
                        var sliderPerViewlength = swiper.params.slidesPerView;
                        if(slidesLength <= sliderPerViewlength){
                            // swiper.params.onlyExternal = true;
                            swiper.container.addClass("swiper-with-out-loop");
                            swiper.update();
                            $(swiper.bullets).trigger('click')
                        }else{
                            swiper.container.removeClass("swiper-with-out-loop");
                            // swiper.params.onlyExternal = false;
                            swiper.update();
                        }
                        jQuery(window).resize(function(event) {
                            sliderPerViewlength = swiper.params.slidesPerView;
                            if(slidesLength <= sliderPerViewlength){
                                swiper.container.addClass("swiper-with-out-loop");
                                swiper.update();
                            }else{
                                swiper.container.removeClass("swiper-with-out-loop");
                                swiper.update();
                            }
                        });
                    },
                });

                // swiperInsta.reInit();
                $(this).on('mouseover',function() { swiperInsta.stopAutoplay(); });
                $(this).on('mouseout',function() { swiperInsta.startAutoplay(); });

            });
        }

    } catch (e) {
        console.log(e);
    }



    try {
        if($('.full-width-post-gallery-slider-js').length > 0){
            $('.full-width-post-gallery-slider-js').each(function(index, el) {
                var gtop = $(".full-width-post-slider-titles .swiper-container", this);
                var gtmb = $(".full-width-post-slider .swiper-container", this);
                var fullWidthPostSliderTitles = new Swiper(gtop, {
                    effect: 'fade',
                    fade: {
                        crossFade: true
                    },
                    loop: true,
                    loopedSlides: 5,
                    slidesPerView: 1,
                    centeredSlides: true,
                });
                var fullWidthPostSlider = new Swiper(gtmb, {
                    effect: 'coverflow',
                    loop: true,
                    loopedSlides: 5,
                    centeredSlides: true,
                    slidesPerView: 3.4,
                    keyboardControl: true,
                    mousewheelControl: true,
                    lazyLoading: true,
                    preventClicks: false,
                    mousewheelForceToAxis: true,
                    preventClicksPropagation: false,
                    lazyLoadingInPrevNext: true,
                    nextButton: $(this).closest('.full-width-post-gallery-slider').find('.swiper-button-next'),
                    prevButton: $(this).closest('.full-width-post-gallery-slider').find('.swiper-button-prev'),
                    pagination: $(this).closest('.full-width-post-gallery-slider').find('.swiper-pagination'),
                    control: $(this).closest('.full-width-post-gallery-slider').find('.swiper-pagination'),
                    paginationClickable: true,
                    coverflow: {
                        rotate: 0,
                        stretch: 0,
                        depth: 250,
                        modifier: 0.7,
                        slideShadows: false,
                    },
                    breakpoints: {
                        760: {
                            slidesPerView: 2
                        }
                    }
                });
                fullWidthPostSliderTitles.params.control = fullWidthPostSlider;
                fullWidthPostSlider.params.control = fullWidthPostSliderTitles;
                // console.log(mySwiper.params.control);
                // fullWidthPostSliderTitles.params.control = mySwiper;
                // mySwiper.params.control = fullWidthPostSliderTitles;

            });
        }
    } catch (e) {
        console.log(e);
    }



    try {
        if($('.full-width-post-slider-2 .swiper-container').length > 0){
            $('.full-width-post-slider-2 .swiper-container').each(function(index, el) {
                var fullWidthPostSlider2 = new Swiper($(this), {
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    // loop: true,
                    // loopedSlides: 5,
                    // loopAdditionalSlides: 9,
                    centeredSlides: true,
                    slidesPerView: 5,
                    keyboardControl: true,
                    mousewheelControl: true,
                    lazyLoading: true,
                    preventClicks: false,
                    mousewheelForceToAxis: true,
                    preventClicksPropagation: false,
                    lazyLoadingInPrevNext: true,
                    breakpoints: {
                        1500: {
                            slidesPerView: 4
                        },
                        1200: {
                            slidesPerView: 3
                        },
                        1023: {
                            slidesPerView: 2
                        },
                        760: {
                            slidesPerView: 1.7
                        }
                    }
                });
            });
        }
    } catch (e) {
        console.log(e);
    }

}
//slider All init end


//paralax
function initSingleParallax() {
    try {
        var $fwindow = $(window);
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        var $contents = [];
        var $backgrounds = [];

        // for each of content parallax element
        $('[data-type="content"]').each(function (index, e) {
            var $contentObj = $(this);

            $contentObj.__speed = ($contentObj.data('speed') || 1);
            $contentObj.__fgOffset = $contentObj.offset().top;
            $contents.push($contentObj);
        });

        // for each of background parallax element
        $('[data-type="background"]').each(function () {
            var $backgroundObj = $(this);

            $backgroundObj.__speed = ($backgroundObj.data('speed') || 1);
            $backgroundObj.__fgOffset = $backgroundObj.offset().top;
            $backgrounds.push($backgroundObj);
        });

        // update positions
        $fwindow.on('scroll resize', function () {
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            $contents.forEach(function ($contentObj) {
                var yPos = $contentObj.__fgOffset - scrollTop / $contentObj.__speed;

                $contentObj.css('top', yPos);
            })

            $backgrounds.forEach(function ($backgroundObj) {
                var yPos = -((scrollTop - $backgroundObj.__fgOffset) / $backgroundObj.__speed);

                $backgroundObj.css({
                    backgroundPosition: '50% ' + yPos + 'px'
                });
            });
        });

        // triggers winodw scroll for refresh
        $fwindow.trigger('scroll');
    } catch (e) {
        console.log(e);
    }
}

//paralax


// bannerSmall sticky
function initBannerSmallSticky() {

    if ($('.sticky-block-js').length) {
        // var bodyTop = $('body').css('padding-top');
        // var bodyTopNum = bodyTop.replace(/\D+/g,"");
        // var headerHeight = $('.header').outerHeight() + +bodyTopNum;
        var headerHeight = 20;
        var winWidth = $(window).width();
        // console.log(headerHeight);

        $('.sticky-block-js').each(function () {
            var widget = $(this),
                widgetParent = widget.parent(),
                stopwidth = widget.data('stopwidth'),
                startwidth = widget.data('startwidth'),
                stoppoint = widget.data('stoppoint'),
                gapbottom = widget.data('gapbottom'),
                gaptop = widget.data('gaptop'),
                widgetParentBig = widget.closest('.'+stoppoint),
                widgetTop, widgetHeight, widgetParentOffset, widgetBottom;
            if (!widgetParentBig.length) return;

            widget.find('.a-single:first-of-type').addClass("active");

            function setDimensions() {
                // widgetTop = widget.offset().top,
                widgetTop = widgetParent.offset().top + parseFloat(widgetParent.css('padding-top')),
                    widgetHeight = widget.outerHeight(),
                    widgetParentOffset = widgetParent.offset().top,
                    //widgetBottom = $('.' + stoppoint).offset().top - gapbottom;
                    widgetBottom = widgetParentBig.outerHeight() + widgetParentBig.offset().top - gapbottom;
            }
            function fixWidget() {
                // if (widget.closest('.section-post__left-sidebar').length) {
                //     console.log(widgetTop + ' ' + widgetHeight + ' ' + widgetParentOffset + ' ' + widgetBottom);
                // }
                if (winWidth <= startwidth && winWidth > stopwidth) {
                    if (($(window).scrollTop() > widgetTop - headerHeight - gaptop) && ($(window).scrollTop() < widgetBottom - widgetHeight - headerHeight - gapbottom )) {
                        widget.removeClass('stopped');
                        widget.addClass('fixed');
                        widget.css({'top': headerHeight + 'px', 'padding-top': gaptop + 'px'});
                    }
                    else if ($(window).scrollTop() >= widgetBottom - widgetHeight - headerHeight - gapbottom ) {
                        widget.removeClass('fixed');
                        widget.addClass('stopped');
                        widget.css({'top': widgetBottom - widgetParentOffset - widgetHeight - gapbottom  + 'px'});
                    }
                    else {
                        widget.removeClass('fixed stopped');
                        widget.css({'top': 0 + 'px', 'padding-top': 0 + 'px'});
                    }
                }
                else {
                    widget.removeClass('fixed stopped');
                    widget.css({'top': 0 + 'px', 'padding-top': 0 + 'px'});
                }

                // Subscribe widget
                // $('.discussions-widget.banner-small-sticky.fixed').outerWidth($('.discussions-widget.banner-small-sticky.fixed').closest('.sidebar').width());
            }


            setDimensions();
            widgetParent.css({'position': 'relative', 'min-height': widgetHeight+gapbottom+gaptop+'px'});
            fixWidget();

            $(window).scroll(function () {
                setDimensions();
                fixWidget();
            });

            $(window).resize(function () {
                setDimensions();
                fixWidget();
                widgetParent.css({'position': 'relative', 'min-height': widgetHeight+gapbottom+gaptop+'px'});
            });
        });


    }
}
// bannerSmall sticky









