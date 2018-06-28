/**
 * @namespace db
 */

/**
 * @namespace libs
 * @memberof db
 */

/**
 * jQuery object
 * @external jQuery
 * @see {@link http://api.jquery.com/jQuery/}
 */

/**
 * moment date
 * @external moment
 * @see {@link http://momentjs.com}
 */

;(function () {
    'use strict';

    db.version = function(){
        var self = this;
        return self.config.version;
    };

    // Inits all components
    db.init = function(){
        var self = this;
        for(var component in self.libs) {
            if ( typeof self.libs[component].init === 'function' ){
                self.libs[component].init();

                //Bind components to jQuery as plugins
                self.utils.jQueryPlugin(component);
            }
        }

        /*window.addEventListener('message', function(event){
            //Check if the message sendt if from a valid sender
            //FIXME: This can probably be done in better ways with regex

            //if(db.config.postMessageWhitelist.indexOf(event.origin) === -1) return;

            //Check if the callback is within the 'db.libs.ads' namespace
            if(event.data.callback.lastIndexOf('db.libs.ads', 0) === -1) return;

            var callback = event.data.callback.split('.').pop();
            if(typeof db.libs.ads[callback] === typeof Function){
                db.libs.ads[callback](event.data);
            }
        }, false);*/
    };

    // Reflow all components
    db.reflow = function(){
        var self = this;
        for(var component in self.libs) {
            if ( typeof self.libs[component].init === 'function' ){
                self.libs[component].reflow();
            }
        }
    };

    db.cleanup = function(){
        if(window.localStorage){
            localStorage.removeItem('font_css_cache');
            localStorage.removeItem('font_css_cache_file');
        }
    };

    Foundation.global.namespace = '';
    $(document).foundation();

    db.init();

})();
