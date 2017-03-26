/* Page scroll */
$(function () {
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this),
            $affixHegiht =  $('#main-navigation').height();

        setTimeout(function() {
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('data-target')).offset().top - 55
            }, 1500, 'easeInOutExpo');
        }, 500);
    });
});

/* Opacity scroll */
$(window).scroll(function() {
    var st = $(this).scrollTop();

    $('.opacity_scroll').each(function() {
        $(this).css({
            'opacity': (1 - st / $(this).offset().top)
        });
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

/* Off-canvas mobile navigation */
$(function() {
    var mobileMenu = $('#mobile-menu'),
        mobileMenuTrigger = $('.l-header-mobile-trigger'),
        mobileMenuClose = $('#mobile-menu-close'),
        bodySlideTrigger = $('.content-slide-trigger'),
        headerSlideTrigger = $('.header-slide-trigger');

    if ($(window).width() > 1020) {
        mobileMenu.removeClass('mm-open');
        bodySlideTrigger.removeClass('slided-content-body');
        headerSlideTrigger.removeClass('slided-content-header');
    }
    if ($(window).width() < 1020) {
        mobileMenuTrigger.show();
    }

    mobileMenuClose.click(function(e){
        mobileMenu.removeClass('mm-open');
        bodySlideTrigger.removeClass('slided-content-body');
        headerSlideTrigger.removeClass('slided-content-header');
    });

    mobileMenuTrigger.click(function(e){
        if(mobileMenu.hasClass('mm-open')) {
            mobileMenu.removeClass('mm-open');
            bodySlideTrigger.removeClass('slided-content-body');
            headerSlideTrigger.removeClass('slided-content-header');
        } else {
            mobileMenu.addClass('mm-open');
            bodySlideTrigger.addClass('slided-content-body');
            headerSlideTrigger.addClass('slided-content-header');
        }
    });

    $(document).on('mousedown touchstart',function (e){
        var container = $('.mm-open');

        if (!container.is(e.target)
            && container.has(e.target).length === 0)
        {
            mobileMenu.removeClass('mm-open');
            bodySlideTrigger.removeClass('slided-content-body');
            headerSlideTrigger.removeClass('slided-content-header');
        }
    });
});

/* Bootstrap tooltips */
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

/*
document.onreadystatechange = function () {
    let state = document.readyState,
        loader = document.getElementById('preloader'),
        content = document.getElementById('content');

    if (state === 'interactive') {
        content.style.visibility = 'hidden';
    } else if (state === 'complete') {
        setTimeout(function(){
            loader.style.visibility = 'hidden';
            content.style.visibility = 'visible';
        }, 0);
    }
};*/
