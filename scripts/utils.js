;(function () {
    'use strict';

    /**
     * @namespace
     */
    db.utils = {
        /**
         * Binds a component to jQuery as plugin. All methods exposed from the component is available as $(el).component('method');
         * @param {object} component A module following the revealing module pattern
         */
        jQueryPlugin: function(component){
            $.fn[component] = function( method ) {
                if ( db.libs[component][method] ) {
                    arguments[0] = this;
                    return db.libs[component][method].apply(null, arguments);
                } else if( typeof method === 'object' || ! method ){
                    return db.libs[component].init.apply(null, this);
                } else {
                    console.warn('db.libs.' + component + ' > no method with name ' + method + ' exists or is exposed');
                }
            };
        },

        /**
         * Check if a component is initialized
         * @param {jQuery} el   jQuery element to check
         * @param {string} name the name of the component
         */
        isInitialized: function(el, name){
            if( $(el).data(name + '-init') !== true ){
                return false;
            }
            return true;
        },

        /**
         * Flag a element as component has initialized
         * @param {jQuery}  el   jQuery element to initialized
         * @param {string}  name the name of the component
         */
        initialized: function(el, name){
            $(el).data(name + '-init', true);
        },

        /**
         * Generate a unique integer id (unique within the entire client session). Useful for temporary DOM ids.
         * @param {string} prefix
         * @return string
         */
        idCounter: 0,
        uniqueId: function(prefix) {
            var id = ++this.idCounter + '';
            return prefix ? prefix + id : id;
        },

        swipe: function(el){
            var $el = $(el);
            var data = {};

            data.width = $el.width();

            $el.get(0).addEventListener('touchstart', function(){
                var touches = event.touches[0];
                data.start = {
                    x: touches.pageX,
                    y: touches.pageY,
                    time: new Date()
                };
                data.isScrolling = undefined;
                data.delta = {};
            }, false);

            $el.get(0).addEventListener('touchmove', function(){
                if ( event.touches.length > 1 || event.scale && event.scale !== 1) return;
                var touches = event.touches[0];
                data.delta = {
                    x: touches.pageX - data.start.x,
                    y: touches.pageY - data.start.y
                };

                if ( typeof data.isScrolling == 'undefined') {
                    data.isScrolling = !!( data.isScrolling || Math.abs(data.delta.x) < Math.abs(data.delta.y) );
                }

                if (!data.isScrolling) {
                    event.preventDefault();
                }
            }, false);

            $el.get(0).addEventListener('touchend', function(){
                var duration = new Date() - data.start.time;
                var isValidSlide = Number(duration) < 250 && Math.abs(data.delta.x) > 20 || Math.abs(data.delta.x) > data.width/2;
                if(isValidSlide){
                    $el.trigger('swipe');
                    if(data.start.x < data.delta.x){
                        $el.trigger('swipe:left');
                    } else {
                        $el.trigger('swipe:right');
                    }
                }
            }, false);
        }
    };

})();
