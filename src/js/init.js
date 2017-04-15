(function($){
  $(function(){
    //dropdown
    $(".dropdown-button").dropdown();

    // scroll
    var $nav = $('.page-nav'),
        height = $(document).outerHeight(),
        $window = $(window);

    $window.on('scroll', function(e){
      var offset = $window.scrollTop(),
          alpha;

      if (offset) {
        // if ($nav.hasClass('index')) {
        //   $nav.removeClass('index');
        //   $window.scrollTop($window.height());
        //   alpha = offset/$window.height();console.log(offset, $window.height(), alpha);
        // }
        $nav.addClass('narrow');
        alpha = 1.5 * offset / $window.height(); 
      }
      else {
        $nav.removeClass('narrow');
        alpha = 0;
      }
      $nav.css({"background-color": "rgba(255, 255, 255, " + alpha + ")"});
    });

    //show map
    $('.show-map').on('click', function(e) {
      e.preventDefault();
      $(this).siblings('.map').toggleClass('hide');
    });

    //footer dropdowns
    $('.footer-show').on('click', function(e) {
      $(this).parent().siblings('ul').toggleClass('hide-on-small-and-down');
      $(this).toggleClass('closed');
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space
