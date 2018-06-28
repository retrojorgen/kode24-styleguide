;(function () {
    'use strict';

    $('.panel[data-expand]').find('.toggle').on('click', function(event){
        event.preventDefault();
        if($(this).attr('data-alternate') != 'undefined'){
            var text = $(this).attr('data-alternate');
            $(this).attr('data-alternate', $(this).text());
            $(this).text(text);
        }
        $(this).closest('[data-expand]').toggleClass('active');
    });

})();
