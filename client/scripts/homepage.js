'use strict';

/* Initializes Homepage Slider */
$(document).ready(function () {
    jQuery('.tp-banner').show().revolution({
        dottedOverlay: 'none',
        delay: 16000,
        startwidth: 1170,
        startheight: 700,
        hideThumbs: 200,

        thumbWidth: 100,
        thumbHeight: 50,
        thumbAmount: 5,

        navigationType: 'none',
        navigationArrows: 'solo',
        navigationStyle: 'preview4',

        touchenabled: 'on',
        onHoverStop: 'on',

        swipe_velocity: 0.7,
        swipe_min_touches: 1,
        swipe_max_touches: 1,
        drag_block_vertical: false,

       /* parallax: 'mouse',
        parallaxBgFreeze: 'off',
        parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],*/

        parallax:"scroll",
        parallaxBgFreeze:"off",
        parallaxLevels:[40,25,15,20,25,30,35,40,45,50],


        keyboardNavigation: 'off',

        navigationHAlign: 'center',
        navigationVAlign: 'bottom',
        navigationHOffset: 0,
        navigationVOffset: 20,

        soloArrowLeftHalign: 'left',
        soloArrowLeftValign: 'center',
        soloArrowLeftHOffset: 20,
        soloArrowLeftVOffset: 0,

        soloArrowRightHalign: 'right',
        soloArrowRightValign: 'center',
        soloArrowRightHOffset: 20,
        soloArrowRightVOffset: 0,

        shadow: 0,
        fullWidth: 'off',
        fullScreen: 'on',

        spinner: 'spinner4',

        stopLoop: 'off',
        stopAfterLoops: -1,
        stopAtSlide: -1,

        shuffle: 'off',

        autoHeight: 'off',
        forceFullWidth: 'off',
        fullScreenAlignForce:'on',

        hideThumbsOnMobile: 'off',
        hideNavDelayOnMobile: 1500,
        hideBulletsOnMobile: 'off',
        hideArrowsOnMobile: 'off',
        hideThumbsUnderResolution: 0,

        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLilmit: 0,
        startWithSlide: 0
    });
});


/* Opacity scroll */
$(window).scroll(function() {
    var st = $(this).scrollTop();
    $('.opacity_scroll').each(function() {
        $(this).css({'opacity': (1 - st / $(this).offset().top)});
    });
});

/* Sticky header */
$(function() {
    var header = $('.l-header'),
        sticky_navigation_offset_top = $('.sticky-header').offset().top;

    var StickyNavigation = function(){
        var scroll_top = $(window).scrollTop();

        if (scroll_top > sticky_navigation_offset_top) {
            header.addClass('opaque-header');
            header.addClass('shrinked-header');
            header.css({
                'position': 'fixed',
                'top':0,
                'left':0,
                'width':'100%',
                '-moz-box-shadow': '0 2px 6px rgba(0,0,0,0.05) !important',
                '-webkit-box-shadow': '0 2px 6px rgba(0,0,0,0.05) !important',
                'box-shadow': '0 2px 6px rgba(0,0,0,0.05) !important'
            });
        } else {
            header.removeClass('opaque-header');
            header.removeClass('shrinked-header');
            header.css({
                'top':0,
                'position':'absolute',
                '-moz-box-shadow': '0 2px 6px rgba(0,0,0,0.05) !important',
                '-webkit-box-shadow': '0 2px 6px rgba(0,0,0,0.05) !important',
                'box-shadow': '0 2px 6px rgba(0,0,0,0.05) !important'
            });
        }
    };

    StickyNavigation();

    $(window).scroll(function() {
        StickyNavigation();
    });
});
