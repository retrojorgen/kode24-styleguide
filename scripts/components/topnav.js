;(function () {
    'use strict';

    /**
     * @namespace
     */
    db.libs.topnav = (function($){

        var name = 'topnav';

        /**
         * Triggers when search recives (or should recive) focus
         * @private
         * @memberof db.libs.topnav
         * @param {external:jQuery|string} id Selector or jQuery element
         * @return {external:jQuery}
         */
        function focusSearch(id){
            var $topnav = $(id);
            $topnav.find('.search').addClass('active');

            setTimeout(function(){
                if( !$topnav.find('.search input').is(':focus') ){
                    $topnav.find('.search input').focus();
                }
            }, 0);

            return $topnav;
        }

        /**
         * Triggers when search looses focus
         * @private
         * @memberof db.libs.topnav
         * @param {external:jQuery|string} id Selector or jQuery element
         * @return {external:jQuery}
         */
        function blurSearch(id){
            $(id).find('.search').removeClass('active');
            return $(id);
        }

        /**
         * Toggle visibility of small navigation. This is only visible for small viewports
         * @public
         * @memberof db.libs.topnav
         * @param {external:jQuery|string} id Selector or jQuery element
         * @return {external:jQuery}
         */
        function toggleSmallNavigation(id){
            var $topnav = $(id);
            $topnav.find('.small-navigation-toggle').toggleClass('active');
            if( $topnav.find('#js-small-navigation').length === 0 ){
                $topnav.find('.primary').after( db.templates['global-small-navigation'] );
            }
            $topnav.find('#js-small-navigation').toggleClass('active');
            return $topnav;
        }

        /**
         * Toggle visibility for secondary navigation. This is only visible for small viewports
         * @public
         * @memberof db.libs.topnav
         * @param {external:jQuery|string} id Selector or jQuery element
         * @return {external:jQuery}
         */
        function toggleSmallSecondary(id){
            var $topnav = $(id);
            $topnav.find('.small-secondary-toggle').toggleClass('active');
            $topnav.find('.secondary nav').toggleClass('active');
            return $topnav;
        }

        function toggleUser(event){
            //FIXME: Somewhere here we need to check if the user is logged in.
            //If the user is logged in we update the button and render a different
            //template when the button is clicked.
            if( $('#global-login').length === 0 ){
                $(event.currentTarget).append( db.templates['global-login'] );
                $(event.currentTarget).foundation('abide', 'init');
            }
        }

        /**
         * Initialize the component
         * @public
         * @memberof db.libs.topnav
         * @param {external:jQuery|string} [id] Selector or jQuery element
         * @return {array} All targeted elements
         */
        function init(id){

            var $targets;

            if(id !== undefined){
                $targets = $(id);
            } else {
                $targets = $('.top-nav');
            }

            $targets.each(function(i, el){
                if( !db.utils.isInitialized(el, name) ){

                    $(el).find('.search').on('click', function(){
                        focusSearch( $(event.currentTarget).closest('.top-nav') );
                    });

                    $(el).find('.search input').on('focus', function(){
                        focusSearch( $(event.currentTarget).closest('.top-nav') );
                    });

                    $(el).find('.search input').on('blur', function(){
                        blurSearch( $(event.currentTarget).closest('.top-nav') );
                    });

                    $(el).find('.small-navigation-toggle').on('click', function(){
                        event.preventDefault();
                        toggleSmallNavigation( $(event.currentTarget).closest('.top-nav') );
                    });

                    $(el).find('.small-secondary-toggle').on('click', function(){
                        event.preventDefault();
                        toggleSmallSecondary( $(event.currentTarget).closest('.top-nav') );
                    });

                    //FIXME: Login is not complete
                    $('#js-user').on('opened', toggleUser);

                    db.utils.initialized(el, name);
                }
            });

            return $targets;
        }

        return {
            init: init,
            reflow: init,
            toggleSmallSecondary: toggleSmallSecondary,
            toggleSmallNavigation: toggleSmallNavigation
        };

    })(jQuery);

})();
