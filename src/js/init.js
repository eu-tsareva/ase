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
          alpha = 2*offset/height;

      if (offset) {
        // if ($nav.hasClass('index')) {
        //   $nav.removeClass('index');
        //   $window.scrollTop($window.height());
        //   alpha = 2*$window.height()/height;
        // }
        $nav.addClass('narrow');
        $nav.css({"background-color": "rgba(255, 255, 255, " + alpha + ")"});
      }
      else {
        $nav.removeClass('narrow');
      }
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
