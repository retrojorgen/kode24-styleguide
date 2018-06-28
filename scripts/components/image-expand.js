;(function () {
    'use strict';

    db.libs.imageExpand = (function($, Foundation, window){

        function position(){
            $('figure[data-image-expand]').each(function(i, el){
                var $el = $(el);
                var $parent = $el.parent();
                var padding = ($parent.outerWidth() - $parent.width()) / 2;
                var left = $parent.offset().left + padding;
                left = Math.abs(left) * -1;
                $el.css({ left: left });
            });
        }

        function init(){
            position();
            $(window).on('resize', Foundation.utils.throttle(position, 300));
        }

        function reflow(){
            position();
        }

        return {
            init: init,
            reflow: reflow
        };

    })(jQuery, Foundation, window);

})();
