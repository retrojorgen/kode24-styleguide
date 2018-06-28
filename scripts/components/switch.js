;(function () {
    'use strict';

    /**
     * Makes time relative.
     * @namespace
     */
    db.libs.switch = (function($){

        var name = 'switch';

        /**
         * Check the checkbox for the switch
         * @public
         * @memberof db.libs.switch
         * @param {external:jQuery|string} id Selector or jQuery element
         * @return {external:jQuery}
         */
        function check(id){
            var $input = $(id).find('input[type=checkbox]');
            if( !$input.is(':checked') ){
                $input.trigger('click');
            }
            return $(id);
        }

        /**
         * Uncheck the checkbox for the switch
         * @public
         * @memberof db.libs.switch
         * @param {external:jQuery|string} id Selector or jQuery element
         * @return {external:jQuery}
         */
        function unCheck(id){
            var $input = $(id).find('input[type=checkbox]');
            if( $input.is(':checked') ){
                $input.trigger('click');
            }
            return $(id);
        }

        /**
         * Initialize the component
         * @public
         * @memberof db.libs.switch
         * @param {external:jQuery|string} [id] Selector or jQuery element
         * @return {array} Returns array of all targeted elements
         */
        function init(id){
            var $targets;

            if(id !== undefined){
                $targets = $(id);
            } else {
                $targets = $('.switch');
            }

            $targets.each(function(i, el){
                if( !db.utils.isInitialized(el, name) ){
                    db.utils.swipe(el);
                    $(el).on('swipe:left', function(event){
                        check(event.currentTarget);
                    });
                    $(el).on('swipe:right', function(event){
                        unCheck(event.currentTarget);
                    });
                    db.utils.initialized(el, name);
                }
            });

            return $targets;
        }

        return {
            init: init,
            reflow: init,
            check: check,
            unCheck: unCheck
        };

    })(jQuery);
})();
