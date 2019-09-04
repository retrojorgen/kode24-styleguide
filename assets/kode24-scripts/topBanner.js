$(() => {
  function randomNumber(max) {
    return Math.floor(Math.random() * max + 0);
  }

  console.log("new campaign");

  function getUrl(url, callback) {
    $.ajax({
      type: "GET",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      success: function(data) {
        callback(data);
      }
    });
  }

  getUrl("//api.kode24.no/front/?query=id:70559216", function(data) {
    let config = JSON.parse(
      data.result[0].content["lab-dz-1"][0].children[0].data.markup
    );

    let ads = config;
    let adNumber = randomNumber(ads.length);
    let main = $("main");
    let ad = ads[adNumber];
    let desktopAd = ad.desktopBannerUrl;
    let mobileAd = ad.mobileBannerUrl;
    let url = ad.url;
    let eventName = ad.eventName;

    // Må endres hver gang
    let campaignName = "bannerannonse kode24";

    let adElement = $(`
    <div class="row top-profile" style="margin-top: 20px;">
      <a rel="noopener" itemprop="url" class="top-banner" href="${url}" target="_blank">
          <div class="kicker">ANNONSE</div> 
          <figure class="desktop">
              <img itemprop="image" alt="annonse" src="${desktopAd}">
          </figure>

          <figure class="mobile">
              <img itemprop="image" alt="annonse" src="${mobileAd}">
          </figure>
      </a>
    </div>    
  `);
    if (!document.querySelector("header .full-bleed")) {
      main.before(adElement);
      console.log("added banner");
    }

    adElement.find("a").on("click", () => {
      console.log("Log click on banner");
      trackOutboundLink(campaignName, eventName, "klikk");
    });
  });
});
