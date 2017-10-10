
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
        $(tabsItemClass).on('click', function(event) {
            event.preventDefault();
            $(this).addClass('active').siblings().removeClass('active');
            var index = $(tabsItemClass).index($(this));
            $(TabsContentItemClass).eq(index).addClass('active').siblings().removeClass('active');
        });
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
  $(document).ready(function(e) {

    var stickySidebar = $('.banner-small-sticky > a');

        if (stickySidebar.length > 0) {
            var stickyHeight = stickySidebar.outerHeight(),
                sidebarTop = $('.banner-small-sticky').offset().top;
        }

        $(window).on('scroll', function () {
            if (stickySidebar.length > 0) {
                var scrollTop = $(window).scrollTop();
                if (sidebarTop < scrollTop + 20) {
                    stickySidebar.css({'top': scrollTop - sidebarTop + 20 , 'position':'absolute'});

                    // stop the sticky sidebar at the footer to avoid overlapping
                    var sidebarBottom = stickySidebar.offset().top + stickyHeight,
                        stickyStop = $('.sidebar-scroll-height').offset().top + $('.sidebar-scroll-height').outerHeight();

                    if (stickyStop < sidebarBottom) {
                        var singlePreviewHeight = $(".single-preview:not(.single-preview-img)");
                        var sidebarScrollHeight = $('.sidebar-scroll-height').outerHeight();
                        var stopPosition;
                        if($("main").hasClass("single-full")){
                            stopPosition = sidebarScrollHeight - stickyHeight - singlePreviewHeight - $(".img-fill-subtitle").outerHeight() - 80;
                        } else{
                            stopPosition = sidebarScrollHeight - stickyHeight - 20;
                        }
                        stickySidebar.css({'top': stopPosition, 'position':'absolute'});
                    }
                }
                else {
                    stickySidebar.css({'top': '0', 'position':'relative'});
                }
            }
        });

    }, 200);
});
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
  <div class="datamodal" id="id-modal-number">
      <div>
        
      </div>
      <div class="modalclose"></div>
  </div>
  <a data-modal="id-modal-number" href="#"></a>

              // or

  <div id="modal-new-your">
      <div class="text">1234</div>
      <div class="modalclose"></div>
  </div>
  <a href="#" data-modal="modal-new-your" data-modalcopy="something">12312412</a>
  // html

// Модальное окно




// Slick slider init
function initSlider($sliderClass, $SliderOption) {
    $($sliderClass + ':not(.slick-slider)').each(function(index, el) {
        $(el).slick($SliderOption($(this)));
    });
}
function sliderOption($this){
    return {
        slidesToShow: 2,
        slidesToScroll: 1,
        prevArrow: $this.parent().find(".slider-arrow-prev"),
        nextArrow: $this.parent().find(".slider-arrow-next"),
    }
}
initSlider('.slider-js .items:not(.slick-slider)', sliderOption);
// Slick slider init



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
    var table = jQuery('.single-page table');

    table.find('td')
        .mouseout(function () {
            table.attr('class', jQuery('div').attr('class').replace(/\highlight.*?\b/g, ''));
        })
        .mouseover(function () {
            var index = jQuery(this).index() + 1;
            if (table.find('td:nth-of-type(' + index + '):hover').length != 0) {
                table.addClass('highlight-' + index + '');
            }
        });

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
(function($){
    'use strict';
    var validationRules = {
        rulesRequared : function ($this) {
            return $this.prop("required");
        },

        rulesEmail : function( email ) {
            var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            return pattern.test(email);
        },

        rulesName : function( name ) {
            var pattern = /^[( )A-Za-zА-Яа-яЁё0-9_-]{3,25}$/;
            return pattern.test(name);
        },

        rulesPhone : function( phone ) {
            var pattern = /^[( )0-9]{9,11}$/;
            return pattern.test(phone);
        },

        rulesText : function( text ) {
            if(text.length <= 3){
                return false;
            }else{
                return true;
            }
        },
    };
    var ValidateAction = {
        change : function($this, validate) {
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
        },
    };

    var inputType = {
        email : function($this){
            ValidateAction.change($this, validationRules.rulesEmail);
        },
        text : function($this){
            ValidateAction.change($this, validationRules.rulesText);
        },
        name : function($this){
            ValidateAction.change($this, validationRules.rulesName);
        },
        tel : function($this){
            ValidateAction.change($this, validationRules.rulesPhone);
        },
    };


    $.fn.validateInit = function() {
        // validateInit : function () {
        $("input:not([type='submit'], [type='file'])").each(function(index, el) {
            var thisel = $(this);
            thisel.on('keyup change blur', function() {
                if(validationRules.rulesRequared(thisel)){
                    console.log("required");
                    if(this.type == "email"){
                        inputType.email(thisel);
                    }else if(this.type == "text"){
                        inputType.text(thisel);
                    }else if(this.type == "name"){
                        inputType.name(thisel);
                    }else if(this.type == "tel"){
                        inputType.tel(thisel);
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
    };
})( jQuery );

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