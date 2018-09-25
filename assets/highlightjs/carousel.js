$(function () {

  var rows = $(".frontpage .row");
  var rowToggle = false;
  var parentRow = false;
  rows.each(function (index, element) {
    var el = $(element);
    if(el.children().length > 1 && el.children().first().hasClass("native-advertisement")) {
      if(rowToggle) {
        parentRow.append(el.children().clone());
        el.remove();
      } else {
        parentRow = el;
        parentRow.addClass("job-carousel");
        
      }
      rowToggle = true;
    } else {
      rowToggle = false;
    }
  });
  if(parentRow) {
    parentRow.shuffleChildren();
  }
  


  $('.job-carousel').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    arrows: true,
    accessibility: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false
        }
      }
    ]
  });
    /**
   */  
});


$.fn.shuffleChildren = function() {
  $.each(this.get(), function(index, el) {
      var $el = $(el);
      var $find = $el.children();

      $find.sort(function() {
          return 0.5 - Math.random();
      });

      $el.empty();
      $find.appendTo($el);
  });
};