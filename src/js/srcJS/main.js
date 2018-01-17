import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import './browser';
import './validationForm';
import './animationPlugin';

(function ($) {
    "use strict";
    window.mainJS = {

        init: function () {
            $('body')
                .addClass('os-' + window.jscd.os.toLowerCase())
                .addClass('browser-' + window.jscd.browser.toLowerCase())
                .attr('data-os-version', window.jscd.osVersion.toLowerCase());

            $(document).ready(function () {
                mainJS.InitSlider();
                mainJS.initTable();
            });

            // resize
            $(window).resize(function () {
                mainJS.winWidth = $(window).width();
                mainJS.winHeight = $(window).height();
            });

            // scroll
            $(window).scroll(function () {
            });
        },

        initTable: function () {
            jQuery('.content-rules table tr:first-of-type td').each(function () {
                let newIndex = jQuery(this).index() + 1;
                jQuery(this).closest('table').find('tr:not(:first-child)')
                    .find('td:nth-child(' + newIndex + ')').attr('data-title', jQuery(this).text());
            });
        },

        InitSlider: function () {
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

    };

    mainJS.init();

})(jQuery);
