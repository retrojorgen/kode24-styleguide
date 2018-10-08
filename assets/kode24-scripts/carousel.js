function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
  }
}

$(function () {
  var ads = [];
  var autoJobcarousel = $(".auto-job-carousel");
  $.ajax(
    {
      type : 'GET',
      url : "//api.dagbladet.no/article/?query=section:jobb&site_id=207",
      headers : {
      'Access-Control-Allow-Origin' : '*'
      },
      success: function (data) {
        var ads = data.result.filter(ad => ad.visibility_status !== "H");
        shuffleArray(ads);
        adNodesToCarousel(ads);        
      }
    }
  );



  function adNodesToCarousel (ads) {
    console.log(ads);
    let adsContainer = $('<div class="ads-wrapper"></div>');
    ads.forEach(function (ad) {
      adsContainer.append(`
        <article id="${ad.id}">
          <a itemprop="url" href="${ad.published_url}">
            <figure class="image-contain" style="background-image: url(//dbstatic.no/${ad.image}.jpg?imageid=${ad.image}&height=300&compression=80)">
            </figure>
            <div class="article-preview-text">
              <h1 class="headline">
                ${ad.title}
              </h1>
              <p class="standfirst">${ad.subtitle}</p>
              <div class="labels">
                <span class="label label-custom">${ad.full_bylines[0].firstname} ${ad.full_bylines[0].lastname}</span>
              </div>
            </div>
          </a>
        </article>
      `);
    });

    autoJobcarousel.append(adsContainer);
    autoJobcarousel.append(`
      <a href="/jobb" class="more-jobs"><span>Se alle ledige stillinger</span></a>
    `)
    if(autoJobcarousel && parseInt(autoJobcarousel.css('width').replace("px", "")) > 640) {
      adsContainer.slick({
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
    }
  }
  
});






$(function () {

  var rows = $(".frontpage .row");
  var rowToggle = false;
  var parentRow = false;
  if(window.location.href !== "https://www.kode24.no/jobb" && window.location.href !== "https://www.kode24.no/jobb/") {
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
    autoplay: true,
    autoplaySpeed: 3000,
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
