$(() => {
  function randomNumber(max) {
    return Math.floor(Math.random() * max + 0);
  }

  let main = $("main");
  let desktopAds = [
    "https://www.dagbladet.no/files/2019/08/12/kode24-980x300-autostore-sommerkampanje-19-hamnoy.jpg"
  ];
  let mobileAds = [
    "https://www.dagbladet.no/files/2019/08/12/kode24-980x300-autostore-sommerkampanje-19-hamnoy.jpg"
  ];
  let desktopAd = desktopAds[randomNumber(desktopAds.length - 1)];
  let mobileAd = mobileAds[randomNumber(desktopAds.length - 1)];

  // Må endres hver gang
  let campaignName = "bannerannonse kode24";

  let ad = $(`
    <div class="row top-profile" style="margin-top: 20px;">
      <a itemprop="url" class="top-banner" href="https://www.dagbladet.no/files/2019/08/12/kode24-980x300-autostore-sommerkampanje-19-hamnoy.jpg" target="_blank">
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
    main.before(ad);
    console.log("added banner");
  }

  ad.find("a").on("click", () => {
    console.log("Log click on banner");
    trackOutboundLink(campaignName, "autostore", "klikk");
  });
});
