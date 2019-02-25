$(function() {
  console.log("running track");
  if (window.location.pathname.indexOf("/jobb/") > -1) {
    const articleArray = /[A-Za-z:]*\/\/[0-9a-z\.:]*\/[a-z]*\/[a-z-]*\/([0-9]*).*/.exec(
      window.location.href
    );
    const articleId = articleArray[1];
    const articleObject = {
      articleId: articleId,
      clicked: new Date(),
      url: window.location.href,
      referrerUrl: document.referrer
    };
    console.log("adding track", articleObject);
    if (articleId.length > 1) {
      $.post(
        "https://kode24-joblisting.herokuapp.com/api/listing/add/click",
        articleObject
      );
    }
    $(".job-ad-cta").on("click", () => {
      $.post(
        "https://kode24-joblisting.herokuapp.com/api/listing/add/appliedclick",
        articleObject
      );
    });
  }
});
