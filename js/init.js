(function ($) {

    $.fn.parallaxCustom = function () {
      var window_width = $(window).width();
      // Parallax Scripts
      return this.each(function(i) {
        var $this = $(this);
        $this.addClass('parallax');

         function updateChildren(elements,percentScrolled,container_height) {
          elements.each(function(el){
            var $this = $(this);
            var top = $this.position().top;
            var height = $this.height();
            var layer = $this.data('layer');
            var parallax = top/2 - (top * percentScrolled);
            $this.css('transform', "translate3D(0%," + (parallax) + "px, 0)");
          });
         }
        function updateParallax(initial) {
          var container_height;

          if (window_width < 601) {
            container_height = ($this.height() > 0) ? $this.height() : $this.children("img").height();
          }
          else {
            container_height = ($this.height() > 0) ? $this.height() : 500;
          }
          var $img = $this.children().first();
          var img_height = $img.height();
          var parallax_dist = img_height - container_height;
          var bottom = $this.offset().top + container_height;
          var top = $this.offset().top;
          var scrollTop = $(window).scrollTop();
          var windowHeight = window.innerHeight;
          var windowBottom = scrollTop + windowHeight;
          var percentScrolled = (windowBottom - top) / (container_height + windowHeight);
          var parallax = Math.round((parallax_dist * percentScrolled));

          if (initial) {
            $img.prop('initial', parallax);
            $img.css('display', 'block');
          }
          if ((bottom > scrollTop) && (top < (scrollTop + windowHeight))) {
            var children = $( $img.parent().parent() ).find('.parallax-children');
            if(children.length) updateChildren(children, percentScrolled);
            $img.data('parallax',parallax);
            if($this.children('video').length && window.innerWidth < 970){
              parallax = 50 + (parallax/100)
              $img.css('transform', "translate3D(-50%,-" + parallax + "%, 0)");
            }else{
              $img.css('transform', "translate3D(-50%," + parallax + "px, 0)");
            }
            if($this.children("video").length && $this.attr('id') !== 'manifeste'){
              $this.children("video").trigger('play');
            }
            actualSection = $($this.parent());
          }else if($this.children("video").length){
            $this.children("video").trigger('pause');         
          }
        }


        // Wait for image load
        $this.children("img").one("load", function() {
          updateParallax(true);
        }).each(function() {
          if (this.complete) $(this).trigger("load");
        });

      
        $this.children("video").one("canplaythrough", function() {
          updateParallax(true);
        }).each(function() {
          if (this.complete) $(this).trigger("load");
        });

        $(window).resize(function() {
            window_width = $(window).width();
            updateParallax(false);
          });

        $(window).scroll(function() {
          window_width = $(window).width();
          updateParallax(false);
        });

      });

    };
}( jQuery ));
;(function ($) {
    $.fn.animOnScroll = function () {
      var $this = this;
      $this.on("click", function(e) {
        e.preventDefault();
        var href = this.href;
        var scrollingTo = href.substr(href.indexOf("#"));
        $(scrollingTo).animatescroll();
        });
    };
}( jQuery ));
;(function ($) {
    $.fn.updateNav = function () {
      var scrollTop = $(window).scrollTop();
      return this.each(function(i) {
        var $this = $(this);
        function checkScroll() {
          var bottom = $this.offset().top + $this.height() - 10;
          var top = $this.offset().top -9;
          if (top <= scrollTop && bottom >= scrollTop){
            if(!($('.nav-wrapper').hasClass('colorized'))){
              $('.nav-wrapper').addClass('colorized');
              $('#logo-container').addClass('colorized');
              $('.nav-section-arrow').addClass('colorized');
            }
          }else if(bottom - 10 < scrollTop){
            if($('.nav-wrapper').hasClass('colorized')){
              $('.nav-wrapper').removeClass('colorized');
              $('#logo-container').removeClass('colorized');
              $('.nav-section-arrow').removeClass('colorized');
            }
          } 
        }
        $(window).scroll(function() {
            scrollTop = $(window).scrollTop();
            checkScroll();
        });
      });
    };
}( jQuery ));
;(function ($) {
    $.fn.slideIn = function () {
      return this.each(function(i) {
        var $this = $(this);
        $this.on("click", function(e) {
          e.preventDefault();
          $('.slid').removeClass('slided');
          var slid = $this.parents().find('.slid'+$this.data('slid'));
          $(slid).addClass('slided');
           $('.nav-section-arrow').addClass('slided');
        });
      });
    };
}( jQuery ));
;(function ($) {
    $.fn.closeSlid = function () {
      return this.each(function(i) {
        var $this = $(this);
        function closeAll () {
          $('.parallax-container').removeClass('slided');
          $('.nav-section-arrow').removeClass('slided');
        }
        $this.on("click", function(e) {
          e.preventDefault();
          closeAll();
        });
        $(window).scroll(function() {
          closeAll();
        });
      });
    };
}( jQuery ));
;(function ($) {
    $.fn.closeNav = function () {
      return this.each(function(i) {
        var $this = $(this);
        $this.on("click", function(e) {
          $('.button-collapse').sideNav('hide');
        });
      });
    };
}( jQuery ));
;(function ($) {
    $.fn.navArrow = function () {
      return this.each(function(i) {
        var $this = $(this);
        var lastSection = $('.section').last().attr('id').replace('section','');
        var firstSection = $('.section').first().attr('id').replace('section','');
        $this.on("click", function(e) {
          var actualId = $(actualSection.find(".section")).attr('id').replace('section','');
          ($this.data('direction')) ? actualId ++ : actualId --;
          if( actualId != undefined && 
            actualId <= lastSection && 
            actualId >= firstSection ) 
          { $('#section'+actualId).animatescroll() }
        });
      });
    };
}( jQuery ));
;(function ($) {
    $.fn.videoPlay = function () {
      return this.each(function(i) {
        var $this = $(this);
        $this.on("click", function(e) {
          var $this = $(this);
          var $parent = $($this.parent());
          var video = $parent.find('video')[0];
          if(!video.played.length || video.paused){
            $(video).trigger('play');
            $this.hide();
          }else{
            $(video).trigger('pause');
            $this.show();
          }
        });
      });
    };
}( jQuery ));
  function video () {
    window.scrollTo(0, 0);
    if(window.innerWidth < 992){
      $('video').each(function  (i) {
        $this = $(this);
            
            $this.children('source').each(function(){
              var newSrc = $(this).attr('src').replace('.','_light.');
              $(this).attr('src',newSrc);
            });
            $this.load();
            $this.on('canplaythrough',function  () {
              canPlay(this);
            });
      });
    }else{
      $('video').each(function  (i) {
        $this = $(this);
        $this.load();
        $this.on('canplaythrough',function  () {
          canPlay(this);
        });
      });
    }
  }
  function canPlay (element) {
    var $video = $('video');
    $(element).parent().removeClass('loading');
    $(element).on('click',function () {
      if(!this.played.length || this.paused){
        $(this).trigger('play');
        if($(this).parent().find('.videoPlay').length){
          $(this).parent().find('.videoPlay').hide();
        }
      }else{
        $(this).trigger('pause');
        if($(this).parent().find('.videoPlay').length){
          $(this).parent().find('.videoPlay').show();
        }
      }
    });
  }

(function($){
  var actualSection;
  $(function(){
    video();
    $('.button-collapse').sideNav();
    $('.nav-arrow').navArrow();
    $('.parallax').parallaxCustom();
    $('.nav-color').updateNav();
    $('.slid-button').slideIn();
    $('.close-slid').closeSlid();
    $('.closeNav').closeNav();
    $('.animOnScroll').animOnScroll();
    $('.videoPlay').videoPlay();
  }); // end of document ready
})(jQuery); // end of jQuery name space