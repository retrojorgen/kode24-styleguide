;(function () {
    'use strict';

    /**
     * Extends functionality of the input range
     * @namespace
     */
    db.libs.rangeSlider = (function($){

        var name = 'rangeSlider';

        /**
         * Sets a class on the input with the percentage value
         * @private
         * @memberof db.libs.rangeSlider
         * @param {external:jQuery|string} [id] Selector or jQuery element
         * @return {external:jQuery}
         */
        function setTrackWidth(id){
            var $el = $(id);
            var min = $el.get(0).min || 0;
            var percentage = ($el.get(0).max) ? (100*($el.get(0).value - min)/($el.get(0).max - min)) : $el.get(0).value;
            percentage = (percentage > 50) ? Math.floor(percentage) : Math.ceil(percentage);

            $el[0].className = $el[0].className.replace(/value\-[0-9]+/g, '');
            $el.addClass('value-'+percentage);
            return $el;
        }

        /**
         * Initialize the component
         * @public
         * @memberof db.libs.rangeSlider
         * @param {external:jQuery|string} [id] Selector or jQuery element
         * @return {array} Returns array of all targeted elements
         */
        function init(id){
            var $targets;

            if(id !== undefined){
                $targets = $(id);
            } else {
                $targets = $('input[type="range"]');
            }

            $targets.each(function(i, el){
                if( !db.utils.isInitialized(el, name) ){

                    setTrackWidth(el);
                    $(el).on('input', function(event){
                        setTrackWidth( $(event.currentTarget) );
                    });

                    db.utils.initialized(el, name);
                }
            });

            return $targets;
        }

        return {
            init: init,
            reflow: init
        };

    })(jQuery);
})();
