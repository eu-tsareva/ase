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

  }); // end of document ready
})(jQuery); // end of jQuery name space
