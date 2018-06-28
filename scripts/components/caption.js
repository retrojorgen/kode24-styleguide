;(function () {
    'use strict';

    db.libs.caption = (function($){

        function open(el){
            $(el).addClass('active');
            return el;
        }

        function close(el){
            $(el).removeClass('active');
            return el;
        }

        function toggle(el){
            $(el).toggleClass('active');
            return el;
        }

        function init(){
            $('.caption[data-expand]').each(function(i, el){
                $(el).on('click', function(){
                    event.preventDefault();
                    event.stopPropagation();
                    toggle( event.currentTarget );
                });
            });
        }

        return {
            init: init,
            reflow: function(){},
            toggle: toggle,
            open: open,
            close: close
        };

    })(jQuery);

})();
