
jQuery(function($){
   var BODY = $("body");
  //menu
  var menuBurger = $(".menu-burger");
  menuBurger.on('click', function(event) {
    event.preventDefault();
    BODY.toggleClass('mobile-menu-open');
  });
  var mobileMenu = $(".mobile-menu");
  mobileMenu.on('click', function(event) {
    event.preventDefault();
    BODY.removeClass("mobile-menu-open");
  });
  var mobileMenuItem = $(".mobile-menu-item");
  mobileMenuItem.on('click', function(event) {
    var thisLala = event.target;
    if(!$(thisLala).data('lang')) event.stopPropagation();        
  });

//paralax
  var header = $("#header");
  var headerWidth = header.outerWidth();
  var headerHeight = header.outerHeight();
  var parallax = $(".parallax");
  var coef = 20;
  header.on('mousemove', function(event) {
    var cordX = event.pageX - headerWidth/2;
    var cordY = event.pageY - headerHeight/2;
    parallax.css({
      "marginLeft": -(cordX+cordY)/coef + "px"
    })
  });

  //parallax banner img + text
    if($('.parallax-js').length > 0){
        var parallaxOffsetTop = ($(window).scrollTop() - $(".parallax-js").offset().top);
        if($(window).scrollTop() >= $(".parallax-js").offset().top){
            if($(window).width() <= 760){
                $('.parallax-text-js').css('transform', 'translateY(' + (parallaxOffsetTop * 0.3) + 'px)');
            }else{
                $('.parallax-text-js').css('transform', 'translateY(' + (parallaxOffsetTop * 0.6) + 'px)');
            }
            $('.parallax-img-js').css('transform', 'translateY(' + (parallaxOffsetTop * 0.3) + 'px)');
        }else{
            $('.parallax-img-js').css('transform', 'translateY(' + (0) + 'px)');
            $('.parallax-text-js').css('transform', 'translateY(' + (0) + 'px)');
        }
    }

  // Для свайпера стоп при наведении
  $('.slider-content').on('mouseover',function() { swipers.stopAutoplay(); }); $('.slider-content').on('mouseout',function() { swipers.startAutoplay(); });

  //Табы по индексу
    function initCreateTabs(tabsItemClass, TabsContentItemClass) {
        if($(tabsItemClass).length>0 && $(TabsContentItemClass).length>0){
            $(tabsItemClass).on('click', function (event) {
                event.preventDefault();
                $(this).addClass('active').siblings().removeClass('active');
                var index = $(tabsItemClass).index($(this));
                $(TabsContentItemClass).eq(index).addClass('active').siblings().removeClass('active');
            });
        }
    }
    initCreateTabs('.tabs-js .item','.tabs-content-js .item');


// Возвращает высоту самого высокого div-а

    function maxHeight($blockClass) {
        var max = 0;
        $($blockClass).each(function() {
            max = Math.max( max, $(this).height() );
        });

        return max;
    };
    console.log(maxHeight('.items-js'));
// Возвращает высоту самого высокого div-а

  // Время для переключения баннеров
  var timers = [$("#t13"),$("#t1")];
  var iter = 0;
  var count = 1;
  count++;
  setInterval(function() { show_timer(); }, 3000);
  function show_timer(){
      for(var i = 0; i<timers.length; i++){
          timers[i].fadeOut(0);
      }
      timers[iter].fadeIn(0);
      iter++;
      if(iter==count){
          iter = 0;   
      }
  }

  // фиксированное меню
  var $window = $(window);
    var $menu = $('#header'); 
    setTimeout(function(){    
      var menuTop = $menu.offset().top;
      $window.on('scroll', function() {
        var windowTop = $window.scrollTop();
        if(windowTop > menuTop){
          $menu.addClass("fixed");
        }else{
          $menu.removeClass("fixed");
        }
      });
    }, 1500);
// фиксированное меню


  // Клавиша для перекручивания вверх скролл top
  $(document).ready(function(e) {
    $(".fixtotop").hide(); 
    $(window).scroll(function(e) { 
      var top = $(document).scrollTop(); 
      if(top >= 1050) $('.fixtotop').fadeIn(); 
      else $('.fixtotop').fadeOut(); 
      e.preventDefault(); 
      return false; 
    }); 
    $(document).on('click', '#totop', function(e) { 
      $('body, html').animate({scrollTop: 0}, 1000); 
      e.preventDefault(); 
      return false; 
    });
    
  });
  // Клавиша для перекручивания вверх скролл top



// Фиксированый блок по отношению к контенту
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
// Фиксированый блок по отношению к контенту


  // клин везде кроме элемента убирать класс
$(document).click(function(e) {
   if (!$(e.target).closest('.callback-container, .callback').length){
    $("body").removeClass('callback-container-open');
   }
  });


// Модальное окно
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

    $(document).keyup(function(e) {
        if (e.keyCode === 27  && $('body').hasClass('active-modal')) {
            modalBlock.removeClass('active');
            $('body').removeClass('active-modal');
        }
    });

   $('.modalclose', modalBlock).on('click', function(e) {
       modalBlock.removeClass('active');
       $('body').removeClass('active-modal');
   });
});
function copyModals(id) {
    getIdCModal = 'onloadmodal'+getRandomInt(1111, 9999);
   $("body").addClass('active-modal').append('<div class="datamodal active" id="'+getIdCModal+'">'+$(id).html()+'</div>');
    if($("#"+getIdCModal).length>0) {
        $('.modalclose', "#"+getIdCModal).on('click', function(e) {
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

  // html  
  <div class="datamodal" id="id-modal-your">
      <div>
        
      </div>
      <div class="modalclose"></div>
  </div>
  <a data-modal="id-modal-your" href="#"></a>

              // or

  <div id="modal-new-your">
      <div class="text">1234</div>
      <div class="modalclose"></div>
  </div>
  <a href="#" data-modal="modal-new-your" data-modalcopy="something">12312412</a>
  // html

// Модальное окно




// swiper slider init
$('.full-width-post-gallery-slider-js').each(function(index, el) {
    var gtop = $(".full-width-post-slider-titles .swiper-container", this);
    var gtmb = $(".full-width-post-slider .swiper-container", this);
    var fullWidthPostSliderTitles = new Swiper(gtop, {

    });
    var fullWidthPostSlider = new Swiper(gtmb, {

    });
    fullWidthPostSliderTitles.params.control = fullWidthPostSlider;
    fullWidthPostSlider.params.control = fullWidthPostSliderTitles;
    // console.log(mySwiper.params.control);
    // fullWidthPostSliderTitles.params.control = mySwiper;
    // mySwiper.params.control = fullWidthPostSliderTitles;

});
// swiper slider init


// Slick slider current init

// <div class="slide-count-wrap">
//     <span class="current current-js">01</span>
//     <span class="slash">/</span>
//     <span class="total total-js">03</span>
// </div>

slider.each(function(index, el) {
    $(el).on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1,
            totalSlides = 0,
            currSlides = 0;

        totalSlides = Math.ceil(slick.slideCount);
        currSlides = Math.ceil(i);
        if (currSlides < 10) {
            currSlides = '0' + currSlides;
        }
        if (totalSlides < 10) {
            totalSlides = '0' + totalSlides;
        }
        $(el).closest('.slider').find('.slider__counter--total').text(totalSlides);
        $(el).closest('.slider').find('.slider__counter--current').text(currSlides);
        $(el).parent().find('.current-js').text(currSlides);
        $(el).parent().find('.total-js').text(totalSlides);
    });
});

// Slick slider current init
// Slick slider init

// function initSlider($sliderClass, $SliderOption) {
//     if($sliderClass.length > 0){
//         $($sliderClass + ':not(.slick-slider)').each(function(index, el) {
//             $(el).slick($SliderOption($(this)));
//         });
//     }
// }
//
// function sliderOption($thisSlider){
//     return {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         prevArrow: $thisSlider.parent().find(".slick-arrow-prev"),
//         nextArrow: $thisSlider.parent().find(".slick-arrow-next"),
//     }
// }
//     initSlider('.slider-js .items', sliderOption);


    function slick($sliderClass, $SliderOptions) {
        if ($sliderClass.length > 0) {
            $($sliderClass + ':not(.slick-slider)').each(function (index, el) {
                $(el).slick(sliderOption[$SliderOptions]($(this)));
            });
        }
    }

    var sliderOption = {
        brandSlider: function ($thisSlider) {
            return {
                slidesToScroll: 1,
                slidesToShow: 3,
                dots: true,
                prevArrow: $thisSlider.parents('.brand-slider-section').find(".slider-arrow-prev"),
                nextArrow: $thisSlider.parents('.brand-slider-section').find(".slider-arrow-next"),
            }
        },
        carSlider: function ($thisSlider) {
            return {
                slidesToScroll: 1,
                slidesToShow: 1,
                centerMode: true,
                prevArrow: $thisSlider.parent().find(".slider-arrow-prev"),
                nextArrow: $thisSlider.parent().find(".slider-arrow-next"),
                dots: true,
                centerPadding: "0px",
            }
        }
    };

    slick('.car-slider-img_js .items', 'carSlider');
    slick('.brand-slider_js .items', 'brandSlider');





//что бы убрать дотсы пишем условие find(options.dots)
&& _.slideCount > _.options.slidesToShow
    // или код
var dotsForAllSlider = $('.slick-slider');
dotsForAllSlider.each(function(index, el) {
    var sliderAllSlides;
    var sliderOption;
    sliderAllSlides = $(el).slick('getSlick').slideCount;
    sliderOption = $(el).slick("slickGetOption", "slidesToShow");

    if(sliderAllSlides <= sliderOption){
        $('.slick-dots').parent().addClass("dots-hide");
    }else{
        $('.slick-dots').parent().removeClass("dots-hide");
    }

    $(window).resize(function(event) {
        sliderAllSlides = $(el).slick('getSlick').slideCount;
        sliderOption = $(el).slick("slickGetOption", "slidesToShow");
        if(sliderAllSlides <= sliderOption){
            $('.slick-dots').parent().addClass("dots-hide");
        }else{
            $('.slick-dots').parent().removeClass("dots-hide");
        }
    });
});

// Slick slider init







// обрезает текст на нужнем количестве строк
(function($) {

    var $ = window.jQuery || this.jQuery;

    $.fn.textCropper = function (max) {
        max = max || 3;

        /**
         * Call function for all elements with current selector
         */
        return this.each(function () {
            var $el = $(this);

            /**
             * Call function asynchronously (at next "tick")
             */
            function cropThisText() {
                var lines = Math.ceil($el.height() / parseInt($el.css('line-height'), 10)),
                    text;

                if (!isNaN(lines) && lines > max) {
                    text = $el.text();
                    $el.text(text.slice(0, Math.floor(text.length * max / lines) - 4) + '...');
                }
                $el.removeClass('hidden');
            };
            cropThisText();
        });
    };

}).call(this);
// обрезает текст на нужнем количестве строк


// Эффект когда ты скролишь //animation-plugin
(function($) {

  var $ = window.jQuery || this.jQuery;

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

jQuery(function($) {
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
});
// Эффект  когда ты скролишь //animation-plugin




//меню   фиксируется  или когда остановиться скролл или скролл вверх
    var header = $(".page-header").outerHeight();
    var $window = $(window),
        lastScrollTop = 0;

    function onScroll (e) {
        var topScroll = $window.scrollTop();
        if ($(document).scrollTop() > header + 150 && lastScrollTop > topScroll) {
            $('.page-header').addClass('fixed');
            setTimeout(function(){
                $('.page-header').addClass('header-menu-fixed');
            }, 300)
        }else{
            $('.page-header').removeClass('fixed').removeClass('header-menu-fixed');
        }
        lastScrollTop = topScroll;


        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function() {
            if ($(document).scrollTop() > header + 150) {
                $('.page-header').addClass('fixed');
                setTimeout(function(){
                    $('.page-header').addClass('header-menu-fixed');
                }, 300)
            }
        }, 200));
    }

    $window.on('scroll', onScroll);
//fixed-menu
//меню   фиксируется  или когда остановиться скролл или скролл вверх



// таблица
function initTable() {
    jQuery('.content-rules table tr:first-of-type td').each(function () {
        var newIndex = jQuery(this).index() + 1;

        jQuery(this).closest('table').find('tr:not(:first-child)')
            .find('td:nth-child(' + newIndex + ')').attr('data-title', jQuery(this).text());
    });


}
// таблица


// keyup
    $(document).keyup(function(e) {
        if (e.keyCode == 38 && $(".main-content").hasClass('open')) {
            console.log("1");
        }
        if (e.keyCode == 40 && $(".main-content").hasClass('open')) {
            console.log("2");
        }
        if (e.keyCode == 39 && $(".main-content").hasClass('open')) {
            console.log("3");
        }
    });
// keyup



// пролистать по нажатия на клаве вниз и в вверх по списку (реализовано на реалии)
    var itemIndex = 0;
    var a = $("li").length;
    $(document).keyup(function(e) {
        if (e.keyCode == 38) {
            console.log(itemIndex);
            if(itemIndex <= a && itemIndex > 0){
                itemIndex = itemIndex - 1
            }

            $("li").eq(itemIndex).addClass("selected").siblings().removeClass("selected");
        } else if (e.keyCode == 40) {
            console.log(itemIndex);
            if(itemIndex < a && itemIndex >= 0){
                itemIndex = itemIndex + 1
            }
            $("li").eq(itemIndex).addClass("selected").siblings().removeClass("selected");

        }
    });
// пролистать по нажатия на клаве вниз и в вверх по списку (реализовано на реалии)



// clear form
$(this).find('input:not([type="hidden"])').val('').prop("checked", false);
$(this).find('textarea').val('');
$(this).find('select').val("").selectric('refresh');
// clear form

// add selectric otion
$('select').selectric('init');
$(window).resize(function() {
    $('select').selectric('init');
});
$('.btn-add-option').on('click', function(event) {
    var value = $(this).parents(".input-cover").find('.add_val').val();
    if(value.length >= 1){
        $(this).parents(".input-cover").find("select").append('<option>' + value + '</option>');
        $(this).parents(".block-add-option").find("input").val('');
    }
    $("select").selectric('refresh');
    var selHeight = $(this).parents(".input-cover").find(".selectric-scroll").outerHeight() + 50;
    if ($(this).parents('.block-add-option').position().top >= 300) {
        $(this).parents(".input-cover").find('.selectric-items').css('height', '280px');
        $(this).parents('.block-add-option').css('top', '332px')
    }else {
        $(this).parents(".input-cover").find('.selectric-items').css('height', 'auto');
        $(this).parents('.block-add-option').css('top', selHeight);
    }
});
// add selectric otion






// Validation by input type
<form action="#" novalidate>
    <input type="text" placeholder="name" required>
    <input type="email" placeholder="Email" required>
    <input type="tel" placeholder="telephone" required>
    <input type="text" placeholder="text" required>
    <input type="submit">
        </form>


    function validateEmail(email) {
        var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return pattern.test(email);
    };

    function validateName(name) {
        var pattern = /^[( )A-Za-zА-Яа-яЁё0-9_-]{3,25}$/;
        return pattern.test(name);
    };

    function validatePhone(phone) {
        var pattern = /^[( )0-9]{9,11}$/;
        return pattern.test(phone);
    };

    function validateText(text) {
        if(text.length <= 3){
            return false;
        }else{
            return true;
        }
    };

    function checkOnChange($this, validate) {
        if (!validate($this.val()) && !$this.val().length <= 2) {
            $this.addClass('disabled');
            $this.removeClass('success');
            $this.parents("form").addClass('not-valid');
        }
        else {
            $this.removeClass('disabled');
            $this.addClass('success');
            $this.parents("form").removeClass('not-valid');
        }
    };

    $( document ).ready(function() {
        InitSlider();
        $("input:not([type='submit'], [type='file'])").each(function(index, el) {
            $(this).on('keyup change blur', function() {
                if($(this).prop("required")){
                    console.log("required");
                    if($(this)[0].type == "email"){
                        checkOnChange($(this), validateEmail);
                    }else if($(this)[0].type == "text"){
                        checkOnChange($(this), validateText);
                    }else if($(this)[0].type == "name"){
                        checkOnChange($(this), validateName);
                    }else if($(this)[0].type == "tel"){
                        checkOnChange($(this), validatePhone);
                    }else{
                        console.log("another-type");
                    }

                }else{
                    console.log("not-required");
                }
            });
        });
        $(document).on('click','input[type="submit"]', function(el) {
            var inputInForm = $(this).parents("form").find("input:not([type='submit'], [type='file'])");
            if ($(el.target).closest('form').length){
                inputInForm.each(function() {
                    $(this).trigger('keyup');
                });
                if( inputInForm.hasClass("disabled") || $('input').parents("form").hasClass('not-valid') ) {
                    $(this).parents("form").submit(function(){
                        return false
                    });
                }else{
                    console.log("form is send");
                }
            }

        });

    });

// Validation by input type End










// Validation by Class
<form action="#" novalidate>
    <input type="text" class="input-name-js" placeholder="name">
        <input type="email" class="input-email-js" placeholder="Email">
        <input type="tel" class="input-phone-js" placeholder="telephone">
        <input type="text" class="input-text-js" placeholder="text">
        <input type="submit" class="btn_submit-js">
        </form>
    function validateEmail(email) {
        var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return pattern.test(email);
    };

    function validateName(name) {
        var pattern = /^[( )A-Za-zА-Яа-яЁё0-9_-]{3,25}$/;
        return pattern.test(name);
    };

    function validatePhone(phone) {
        var pattern = /^[( )0-9]{9,11}$/;
        return pattern.test(phone);
    };

    function validateText(text) {
        if(text.length <= 2){
            return false;
        }else{
            return true;
        }
    };

    function checkOnChange($inputclassjs, validate) {
        $(document).on("keyup change blur", $inputclassjs, function () {
            var thisVal = $(this).val();
            if (!validate(thisVal)) {
                $(this).addClass('disabled');
                $(this).removeClass('success');
                $(this).parents("form").addClass('not-valid');
            }
            else {
                $(this).removeClass('disabled');
                $(this).addClass('success');
                $(this).parents("form").removeClass('not-valid');
            }
        });
    };

    checkOnChange('.input-name-js', validateName);
    checkOnChange('.input-phone-js', validatePhone);
    checkOnChange('.input-email-js', validateEmail);
    checkOnChange('.input-text-js', validateText);

    $(document).on('click','input[type="submit"]', function(el) {
        var inputInForm = $(this).parents("form").find("input:not([type='submit'], [type='file'])");
        if ($(el.target).closest('form').length){
            inputInForm.each(function() {
                $(this).trigger('keyup');
            });
            if( inputInForm.hasClass("disabled") || $('input').parents("form").hasClass('not-valid') ) {
                $(this).parents("form").submit(function(){
                    return false
                });
            }else{
                console.log("form is send");
            }
        }

    });
// Validation by Class End










// Validation by plugin
    (function ($) {
        'use strict';
        var validationRules = {
            rulesRequared: function ($this) {
                return $this.data("required");
            },

            rulesEmail: function (email) {
                var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                return pattern.test(email);
            },

            rulesName: function (name) {
                var pattern = /^[( )A-Za-zА-Яа-яЁё0-9_-]{3,25}$/;
                return pattern.test(name);
            },

            rulesPhone: function (phone) {
                var pattern = /^[( )0-9]{9,11}$/;
                return pattern.test(phone);
            },

            rulesText: function (text) {
                if (text.length <= 3) {
                    return false;
                } else {
                    return true;
                }
            },
            rulesPassword: function (password) {
                if (password.length <= 6) {
                    return false;
                } else if (password.length > 10) {
                    return false;
                } else {
                    return true;
                }
            },
            // rulesSelects: function (selects) {
            //     // console.log($(selects));
            //     // console.log($(selects).selector
            //     // );
            //     console.log($(selects).selector.length);
            //
            // },


        };
        var ValidateAction = {
            change: function ($this, validate) {
                if (!validate($this.val()) && !$this.val().length <= 2) {
                    $this.addClass('disabled');
                    $this.removeClass('success');
                    $this.parents("form").addClass('not-valid');
                }
                else {
                    $this.removeClass('disabled');
                    $this.addClass('success');
                }
            },
        };

        var inputType = {
            email: function ($this) {
                ValidateAction.change($this, validationRules.rulesEmail);
            },
            text: function ($this) {
                ValidateAction.change($this, validationRules.rulesText);
            },
            name: function ($this) {
                ValidateAction.change($this, validationRules.rulesName);
            },
            tel: function ($this) {
                ValidateAction.change($this, validationRules.rulesPhone);
            },
            password: function ($this) {
                ValidateAction.change($this, validationRules.rulesPassword);
            },
            checkbox: function ($this) {
                if ($($this).prop("checked") == false) {
                    $this.addClass('disabled');
                    $this.parents("form").addClass('not-valid');

                } else {
                    $this.removeClass('disabled');
                }
                ;
            },
            selects: function ($this) {
                if ($($this).find('option:selected').index() == 0) {
                    $this.parents('.selectric-wrapper').addClass('disabled');
                    $this.parents('.selectric-wrapper').parents("form").addClass('not-valid');
                } else {
                    $this.parents('.selectric-wrapper').removeClass('disabled');
                }
            },
        };


        $.fn.validateInit = function () {
            $("input:not([type='submit'], [type='file']), select").each(function (index, el) {
                var thisel = $(this);
                thisel.on('keyup change blur', function () {
                    if (validationRules.rulesRequared(thisel)) {
                        console.log("required");
                        if (thisel.data('type') == "email") {
                            inputType.email(thisel);
                        } else if (thisel.data('type') == "text") {
                            inputType.text(thisel);
                        } else if (thisel.data('type') == "name") {
                            inputType.name(thisel);
                        } else if (thisel.data('type') == "tel") {
                            inputType.tel(thisel);
                        } else if (thisel.data('type') == "password") {
                            inputType.password(thisel);
                        } else if (thisel.data('type') == "checkbox") {
                            inputType.checkbox(thisel);
                        } else if (thisel.data('type') == "selects") {
                            inputType.selects(thisel);
                        } else {
                            console.log("another-type");
                        }
                    } else {
                        console.log("not-required");
                    }
                });
            });
            $(document).on('click', 'input[type="submit"], button[type="submit"]', function (el) {
                var inputInForm = $(this).parents("form").find("input:not([type='submit'], [type='file']), select");
                if ($(el.target).closest('form').length) {
                    inputInForm.each(function () {
                        $(this).trigger('keyup');
                    });
                    if (inputInForm.hasClass("disabled")) {
                        $(this).parents("form").submit(function () {
                            return false
                        });
                    } else {
                        $('input').parents("form").removeClass('not-valid');
                        console.log("form is send");
                    }
                }

            });
        };
    })(jQuery);

$('form').validateInit();

// Validation by plugin End




// перебор цыфр
function counter() {
    jQuery('.counter_js').each(function () {
        var countTo = jQuery(this).attr('data-count');
        var currentCounter = jQuery(this);
        jQuery({countNum: jQuery(this).text()}).animate({
                countNum: countTo
            },
            {
                duration: 5000,
                easing  : 'swing',
                step    : function () {
                    currentCounter.text(Math.floor(this.countNum));
                },
                complete: function () {
                    currentCounter.text(this.countNum);
                    //alert('finished');
                }
            });
    });
}
// перебор цыфр

// скролл до елемента
    $('.anchors-js .item').on('click', function(event) {
        event.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
        var id = $(this).attr('data-scroll-to');
        if(id.length > 0){
            $('body,html').animate({scrollTop: $(id).offset().top - 20}, 800, function () {
                return false;
            });
        }
    });
// скролл до елемента


// разюросать рандомно по кругу итемы
    var columnistWrap = $('.columnist-cloud');
    var innerDiv = columnistWrap.find('.img-item');
    var count = innerDiv.length;

    var minOffsetOdd = 210;
    var maxOffsetOdd = 260;

    var minOffsetEven = 330;
    var maxOffsetEven = 350;

    var minWidth = 60;
    var maxWidth = 150;


    innerDiv.each(function (i) {

        if (i % 2 == 1) {
            $(this).addClass('odd');
            var randomOffset = Math.floor(Math.random() * (maxOffsetOdd - minOffsetOdd + 1) + minOffsetOdd);
        } else {
            $(this).addClass('even');
            var randomOffset = Math.floor(Math.random() * (maxOffsetEven - minOffsetEven + 1) + minOffsetEven);
        }

        var width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);

        // $(this).attr('data-offset', randomOffset);

        var degree = 360 / count * i;

        $(this).css({
            'transform': 'rotate(' + degree + 'deg)' + 'translate(' + randomOffset + 'px)' + 'rotate(-' + degree + 'deg)',
            'width': width + 'px',
            'height': width + 'px',
            'left': 'calc(50% - ' + width / 2 + 'px',
            'top': 'calc(50% - ' + width / 2 + 'px'
        });
    });
// разюросать рандомно по кругу итемы


// header menu responsive dropdown
    $('.submenu li').each(function(index, el) {
        if ($('ul', this).length) {
            var elm = $('ul:first', this);
            var elmParent = elm.parent();
            var off = elmParent.offset();
            var l = off.left + 40;
            var w = elm.width();
            var wp = elmParent.width();
            var docH = $(window).height();
            var docW = $(window).outerWidth();
            var isEntirelyVisible = (l + w + wp <= docW);
            if (!isEntirelyVisible) {
                $(this).addClass('edge');
                // } else {
                //     $(this).removeClass('edge');
                //     console.log($(this) + ' remove');
            }else{
                $(this).removeClass('edge');
            }
        }
    });
// header menu responsive dropdown



//my-select

// <div class="select-simple with-border select-simple-js">
//         <div class="label icon-slick-arrow-right current-js"><p>Tiffany Sanders</p>
//     </div>
//     <div class="items">
//         <a class="item selected">Tiffany Sanders</a>
//     <a class="item">Michael Crabtree</a>
//     <a class="item">Brenda Radisson</a>
//     <a class="item">Tony Yeung</a>
//     <a class="item">Gerry Granderson</a>
//     </div>
//     </div>


    $(document).on('click', '.select-simple-js .current-js', function (event) {
        $(this).closest('.select-simple-js').toggleClass("active");
    });
    $('.select-simple-js .item').on('click', function (event) {
        $(this).closest('.select-simple-js').removeClass("active");
        $(this).addClass("selected").siblings().removeClass("selected");
        $(this).parents('.select-simple-js').find('.label p').text($(this).text());
    });
    $(document).click(function (e) {
        if (!$(e.target).closest('.select-simple-js').length && $('.select-simple-js').hasClass("active")) {
            $('.select-simple-js').removeClass("active");
        }
    });

//my-select





    // initRating: function () {
    //     $('.rating__button').on('click', function (e) {
    //         e.preventDefault();
    //         var $t = $(this), // the clicked star
    //             $ct = $t.parent(); // the stars container
    //
    //         // add .is--active to the user selected star
    //         $t.siblings().removeClass('is--active').end().toggleClass('is--active');
    //         // add .has--rating to the rating container, if there's a star selected. remove it if there's no star selected.
    //         $ct.find('.rating__button.is--active').length ? $ct.addClass('has--rating') : $ct.removeClass('has--rating');
    //         console.log($(this).data('num'));
    //         $(this).parents('.rating-block').find('.rating-num').text($(this).data('num'));
    //     });
    // },