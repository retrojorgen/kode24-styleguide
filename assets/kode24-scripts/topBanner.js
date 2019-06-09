$(() => {
  function randomNumber(max) {
    return Math.floor(Math.random() * max + 0);
  }

  let main = $("main");
  let desktopAds = ["https://www.dagbladet.no/files/2019/06/09/980x300.png"];
  let mobileAds = ["https://www.dagbladet.no/files/2019/06/09/980x300.png"];
  let desktopAd = desktopAds[randomNumber(desktopAds.length - 1)];
  let mobileAd = mobileAds[randomNumber(desktopAds.length - 1)];

  let ad = $(`
    <div class="row top-profile" style="margin-top: 20px;">
      <a itemprop="url" href="https://ndcoslo.com/" target="_blank">
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

  main.before(ad);
});
