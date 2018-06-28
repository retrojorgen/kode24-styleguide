;(function () {
    'use strict';

    /**
     * Layzyload images
     * @namespace
     */
    db.libs.imageDefer = (function($){ 

        var name = 'imageDefer';

        /**
         * Ranges for targeting sizes in srcset
         * @private
         * @memberof db.libs.imageDefer
         * @constant {object}
         */
        var range = {
            small: "(?:[0-9]|[0-9][0-9]|[0-6][0-3][0-9])", //Target 0-639
            medium: "(?:6[4-9][0-9]|[7-9][0-9][0-9]|10[0-2][0-3])", //Target 640-1023
            large: "(?:10[2-9][4-9]|[1-9][1-9][0-9][0-9])" //Target 1024 +
        };

        /**
         * The threshold for when images in view should be loaded
         * @private
         * @memberof db.libs.imageDefer
         * @constant {number}
         */
        var threshold = 400;

        /**
         * The array for all the images to be lazy loaded
         * @private
         * @memberof db.libs.imageDefer
         * @type {array}
         */
        var images = [];

        /**
         * Loads all images with <code>data-defer="load"</code> attribute
         * @private
         * @memberof db.libs.imageDefer
         * @return {external:jQuery} jQuery elements targeted
         */
        function loadImagesOnLoad(){
            var $images = $('[data-defer="load"]');
            $images.each(function(i, img){
                setImageSrc(img);
            });
            return $images;
        }

        /**
         * Loads all images with <code>data-defer="view"</code> attribute if they are within the viewport threshold
         * @private
         * @memberof db.libs.imageDefer
         */
        function loadImagesInView(){
            var offset = $(document).scrollTop() + $(window).height() + threshold;

            images.each(function(i, img){
                if (img !== null) {
                    if( $(img).offset().top < offset ){
                        setImageSrc(img);
                        images[i] = null;
                    }
                }
            });
        }

        /**
         * Loads a given image
         * @public
         * @memberof db.libs.imageDefer
         * @param {external:jQuery|string} id jQuery element or selector
         * @return {external:jQuery} jQuery elements targeted
         */
        function load(id){
            $img = $(id);
            setImageSrc($img);
            return $img;
        }

        /**
         * Set the image src based on width of page and what is in data-srcset or data-src
         * @private
         * @memberof db.libs.imageDefer
         * @param {external:jQuery|string} id jQuery element or selector
         * @return {external:jQuery} jQuery element
         */
        function setImageSrc(id){
            var $img = $(id);
            var size;
            var src;

            if($img.attr('data-src')){
                src = $img.attr('data-src');
            } else {
                if(window.innerWidth <= 640){
                    size = range.small;
                } else if(window.innerWidth > 1024){
                    size = range.large;
                } else {
                    size = range.medium;
                }
                src = parseSrcset($img.attr('data-srcset'), size);
            }
            if( $img.prop('tagName') == 'IMG' ){
                $img.attr('src', src);
            } else {
                $img.css('background-image', 'url('+src+')');
            }
            $img.removeAttr('data-defer');
            return $img;
        }

        /**
         * Parse the data-srcset and return the url that matches given size
         * @private
         * @memberof db.libs.imageDefer
         * @param {string} srcset A srcset formatted string
         * @param {string} size A string used in the regex to match a spesific size
         * @return {string} the url matching size
         */
        function parseSrcset(srcset, size){
            var re = new RegExp("([^\\s|\\d|w|,]\\S+)\\s"+size+"w", "i");
            var src = srcset.match(re);
            return src[1].trim();
        }

        /**
         * Initialize the component
         * @public
         * @memberof db.libs.imageDefer
         */
        function init(){

            if( !db.utils.isInitialized($('body'), name) ){
                
                //FIXME: Not really sure we need to wait for document load here
                if (document.readyState === 'complete') {
                    loadImagesOnLoad();
                    loadImagesInView();
                } else {
                    window.addEventListener('load', function(){
                        setTimeout(function(){
                            loadImagesOnLoad();
                            loadImagesInView();
                        }, 0);
                    });
                }

                images = $('[data-defer="view"]');
                $(window).on('scroll', function(){
                    window.requestAnimationFrame(loadImagesInView);
                });

                db.utils.initialized($('body'), name);
            }
        }

        /**
         * Load all images that can be loaded
         * @public
         * @memberof db.libs.imageDefer
         */
        function reflow(){
            loadImagesOnLoad();
            loadImagesInView();
        }

        return {
            init: init,
            reflow: reflow,
            load: load
        };

    })(jQuery);

})();
