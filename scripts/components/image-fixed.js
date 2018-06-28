;(function () {
    'use strict';

    db.libs.imageFixed = (function($){

        function init(){
            $('[data-image-fixed]').each(function(i, el){
                $(el).css({
                    'background-image': 'url(' + $(el).find('img').attr('src') + ')'
                });
            });
        }

        return {
            init: init,
            reflow: init
        };

    })(jQuery);

})();
