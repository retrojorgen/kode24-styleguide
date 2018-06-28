;(function () {
    'use strict';

    db.libs.table = (function($){

        function toggle(event){
            /*jshint validthis:true */
            if(event) event.stopPropagation();
            $(this).toggleClass('active');
        }

        function init(){
            $('table[data-focus] tbody tr').each(function(i, el){
                $(el).off('click', toggle).on('click', toggle);
            });
        }

        return {
            init: init,
            reflow: init
        };

    })(jQuery);

})();
