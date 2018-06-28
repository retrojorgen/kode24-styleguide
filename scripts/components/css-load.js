;(function () {
    'use strict';

    /* global db */
    
    /**
     * Load css stylesheets
     * @namespace
     */
    db.libs.cssLoad = (function(){

        /**
         * Load a stylesheet
         * @public
         * @memberof db.libs.cssLoad
         * @param {string} url The stylesheet url
         */
        var load = function(url){
            var h = document.getElementsByTagName('head')[0];
            var l = document.createElement('link');
            l.rel = 'stylesheet';
            l.href = url;
            h.appendChild(l);
        };

        /**
         * Loads a stylesheet on <code>requestAnimationFrame</code> or <code>domContentLoaded</code>.
         * @public
         * @memberof db.libs.cssLoad
         */        
        var init = function(url){
            if(url){
                var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;
                if(raf){
                    load(url);
                } else {
                    window.addEventListener('domContentLoaded', function(){
                        load(url);
                    });
                }
            }
        };
        
        return {
            init: init,
            reflow: function(){},
            load: load 
        }; 

    })();
})();
