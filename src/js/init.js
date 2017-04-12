(function($){
  $(function(){
    //dropdown
    $(".dropdown-button").dropdown();

    //scroll
    var $nav = $('.page-nav'),
        $navInner = $nav.children('.nav-wrapper'),
        $logo = $navInner.find('.brand-logo img');

    $(window).on('scroll', function(e){
      var offset = $(window).scrollTop();
      if(offset) {
        $navInner.addClass('container');
        $logo.addClass('small');
        $nav.css({"background-color": "rgba(255, 255, 255, " + offset/100 + ")"});
      }
      else {
        $navInner.removeClass('container');
        $logo.removeClass('small');
      }
    });

    //show map
    $('.show-map').on('click', function(e) {
      e.preventDefault();
      $(this).siblings('.map').toggleClass('hide');
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space
