;(function () {
    'use strict';

    //FIXME: Add support for multiple images within the same figure

    db.libs.imageLightbox = (function($){

        function toggle(event){
            if(event) event.stopPropagation();

            var $target = $(event.currentTarget);
            var options = Foundation.utils.data_options($target);

            $target.toggleClass('active');

            if( $target.hasClass('active') ){
                var src = options.src || $target.find('img').attr('src');

                if(src.length !== 0){
                    db.libs.loader.createModal();
                    var img = new Image();
                    img.onload = function() {
                        $target.css({ 'background-image': 'url(' + src + ')' });
                        db.libs.loader.destroyModal();
                    };
                    img.src = src;
                } else {
                    $target.removeClass('active');
                }
            } else {
                $target.css({ 'background-image': 'none' });
            }
        }

        function init(){
            $('[data-image-lightbox]').each(function(i, el){
                $(el).off('click', toggle).on('click', toggle);
            });
        }

        return {
            init: init,
            reflow: init
        };

    })(jQuery);

})();
