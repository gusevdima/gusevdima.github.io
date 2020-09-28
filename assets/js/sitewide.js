$(document).ready(function() {
  $('.slider').slick({
    asNavFor: '.captions',
    dots: false,
    cssEase: false,
    touchMove: false,
    accessibility: true,
    arrows: true
  });

  $('.captions').slick({
    asNavFor: '.slider',
    dots: false,
    arrows: false,
    accessibility: false,
    draggable: false,
    cssEase: false,
    touchMove: false
  });

  var location = window.location.hash.substr(1) - 1;

  if (location !== -1) {
    $(".slider").slick("slickGoTo", location);
  }

  var about = $('.about-popup-wrapper');
  var index = $('.index-content');
  var slider = $('.slider-wrapper');
  var item = $('.page-item');
  var caption = $('.captions-wrapper');

  $('.about-link').click( function() {
    caption.css('display', 'none');
    item.css('display', 'none');
    about.css('display', 'inline-block');
  });

  $('.about-popup-link').click( function() {
    caption.css('display', 'none');
    about.css('display', 'none');
    caption.css('display', 'inline-block');
    $(".page-item-active").css('display', 'inline-block');
  });
});

$(document).keydown(function(){
  if(event.keyCode == 37) {
    $( ".slick-prev" ).trigger( "click" );
  }

  if(event.keyCode == 39){
    $( ".slick-next" ).trigger( "click" );
  }
});


