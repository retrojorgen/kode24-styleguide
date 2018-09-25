$(function () {

  var rows = $(".frontpage .row");
  var rowToggle = false;
  var parentRow = false;
  if(window.location.href !== "https://www.kode24.no/jobb") {
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
  }


  $(".front_rows").each(function (index, element) {
    var el = $(element);
    if(el.children().length > 1 && el.children().first().hasClass("native-advertisement")) {
      el.addClass("job-carousel");
    }
  });
  


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
});
