;(function () {
    'use strict';

    db.libs.alert = (function($){

        function create(options){
            var defaults = {
                text : '',
                tag: 'li',
                classes : "overlay"
            };
            options = $.extend({}, defaults, options);

            if( $('.alert-group').length === 0 ){
                $('body').append('<ul class="alert-group"></ul>');
            }

            $('.alert-group').append( Mustache.render(db.templates.alert, options) );
        }

        function clear(){
            $('.alert-group').remove();
        }

        return {
            init: function(){},
            reflow: function(){},
            create: create,
            clear: clear
        };

    })(jQuery);

})();
