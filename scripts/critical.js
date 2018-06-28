/* global db */
/* global googletag */
/* global adunits */

(function(){
    'use strict';
    googletag.cmd.push(function(){
        googletag.pubads().refresh([adunits[0]]);
    });
    window.addEventListener('load', function(){
        /* jshint loopfunc:true */
        for(var i=1; i < adunits.length; i++){
            googletag.cmd.push(function(){
                googletag.pubads().refresh([adunits[i]]);
            });
        }
    });
})();
db.libs.cssLoad.init(db.config.css.core);
db.libs.ads.init();
db.libs.imageSrcset.init();