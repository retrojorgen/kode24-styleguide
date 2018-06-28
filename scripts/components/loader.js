;(function () {
    'use strict';

    /**
     * @namespace
     */
    db.libs.loader = (function($){

        /**
         * Creates a modal loader
         * @public
         * @memberof db.libs.loader
         * @param  {object} options
         * @param  {string} options.text Text accompanying the loader
         * @param  {string} [options.classes] Additinal classes are added to the loader
         * @return {external:jQuery}
         */
        function createModal(options){
            var defaults = {
                text : '',
                classes : ''
            };
            options = $.extend({}, defaults, options);

            if( $('.loader-overlay').length === 0 ){
                $('body').append( Mustache.render(db.templates.loader, options) );
            }
            return $('.loader-overlay');
        }

        /**
         * Delete modal loader
         * @public
         * @memberof db.libs.loader
         */
        function destroyModal(){
            $('.loader-overlay').remove();
        }

        /**
         * Pause loader
         * @public
         * @memberof db.libs.loader
         * @param  {external:jQuery|string} id Selector or jQuery element
         * @return {external:jQuery}
         */
        function pause(id){
            var $loader = $(id);
            $loader.addClass('pause');
            return $loader;
        }

        /**
         * Play loader
         * @public
         * @memberof db.libs.loader
         * @param  {external:jQuery|string} id Selector or jQuery element
         * @return {external:jQuery}
         */
        function play(id){
            var $loader = $(id);
            $loader.removeClass('pause');
            return $loader;
        }

        /**
         * Toggle play/pause
         * @public
         * @memberof db.libs.loader
         * @param  {external:jQuery|string} id Selector or jQuery element
         * @return {external:jQuery}
         */
        function toggle(id){
            var $loader = $(id);
            if($loader.hasClass('pause')){
                play($loader);
            } else {
                pause($loader);
            }
            return $loader;
        }

        return {
            init: function(){},
            reflow: function(){},
            createModal: createModal,
            destroyModal: destroyModal,
            play: play,
            pause: pause,
            toggle: toggle
        };

    })(jQuery);

})();
