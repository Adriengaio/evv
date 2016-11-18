;(function ($) {

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
            $img.css('transform', "translate3D(-50%," + parallax + "px, 0)");
            if($this.children("video").length){
              $this.children("video")[0].play();
            }
          }else if($this.children("video").length){
            $this.children("video")[0].pause();         
          }
        }


        // Wait for image load
        $this.children("img").one("load", function() {
          updateParallax(true);
        }).each(function() {
          if (this.complete) $(this).trigger("load");
        });

        $this.children("video").one("canplay", function() {
          updateParallax(true);
          //$this.children("video")[0].ontimeupdate = function($this) {console.log($this)};
        }).each(function() {
          if (this.complete) $(this).trigger("load");
        });

        $(window).scroll(function() {
          window_width = $(window).width();
          updateParallax(false);
        });

        $(window).resize(function() {
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
          var bottom = $this.offset().top + $this.height();
          var top = $this.offset().top;
          if (top < scrollTop && bottom > scrollTop){
            if(!($('.nav-wrapper').hasClass('colorized'))){
              $('.nav-wrapper').addClass('colorized');
              $('#logo-container').addClass('colorized');
              $('.nav-section-arrow').addClass('colorized');
            }
          }else if(bottom < scrollTop){
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
          var slid = $this.parents().find('.slid');
          $(slid).addClass('slided');
        });
      });
    };
}( jQuery ));
;(function ($) {
    $.fn.closeSlid = function () {
      return this.each(function(i) {
        var $this = $(this);
        function closeAll () {
          $('.slid').removeClass('slided');
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

(function($){
  $(function(){
    $('.button-collapse').sideNav();
    $('.parallax').parallaxCustom();
    $('.nav-color').updateNav();
    $('.slid-button').slideIn();
    $('.close-slid').closeSlid();
    $('.animOnScroll').animOnScroll();
  }); // end of document ready
})(jQuery); // end of jQuery name space