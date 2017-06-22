
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

  // Для свайпера стоп при наведении
  $('.slider-content').on('mouseover',function() { swipers.stopAutoplay(); }); $('.slider-content').on('mouseout',function() { swipers.startAutoplay(); });

  //Табы по индексу
  var institutionSmallPictures = $(".institution-small-pictures").find("a");
  var institutionBigPictures = $(".institution-big-pictures").find("img");
  institutionSmallPictures.on('click', function(event) {
      event.preventDefault();
      $(this).addClass('active').siblings().removeClass('active');
      var index = institutionSmallPictures.index($(this));
      institutionBigPictures.eq(index).addClass('active').siblings().removeClass('active');    
  });

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


  // Клавиша для перекручивания вверх
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
  // Клавиша для перекручивания вверх



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
                        if($("main").hasClass("single-full-v2")){
                            stopPosition = sidebarScrollHeight - stickyHeight - singlePreviewHeight -40;
                        } else if($("main").hasClass("single-full")){
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
//   var basket = $(".basket");
//     basket.on('click', function(event) {
//       body.addClass('basket-open');
//     });
    
//   $(document).click(function(e) {
//     var div = $(".basket");
//     if (!div.is(e.target) && div.has(e.target).length === 0) {
//        $('body').removeClass('basket-open');
//     }
//   });


// });



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




// Эффект когда ты скролишь
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

jQuery(function($){
    var $window = $(window);
     var animateItems = $('.animate');
     var af = $window.on('scroll', function() {
         animateItems.each(function(index, el) {
          var thisEl = $(el);
          if(thisEl.visible(true) && !thisEl.hasClass('animated-elem')){
           thisEl.addClass('animated-elem');
          }
         });
     });
// Эффект  когда ты скролишь




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