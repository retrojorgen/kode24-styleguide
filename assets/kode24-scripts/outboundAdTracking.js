// tracks clicks on outboundlinks
/**
* Funksjon som sporer klikk på en utgående link i Analytics.
* Denne funksjonen tar en gyldig nettadressestreng som argument og bruker denne strengen
* som aktivitetsetikett. Hvis transportmetoden angis som «beacon», kan treffet sendes
* med «navigator.sendBeacon» i nettlesere som støtter dette.
*/
var trackOutboundLink = function(url) {
   ga('send', 'event', 'ekstern_lenke', 'click', url, {
     'transport': 'beacon',
     'hitCallback': function(){document.location = url;}
   })
}

$(function () {
  $("a").click(function (event) {
    let targetUrl = event.currentTarget.href;
    if(targetUrl.indexOf("https://www.kode24.no/") < 0) {
      trackOutboundLink(targetUrl);
      console.log("Went to", targetUrl);
    }
  })
})