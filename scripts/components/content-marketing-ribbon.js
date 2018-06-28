;(function () {
    'use strict';

    db.libs.contenMarketingRibbon = (function($){
    
    function init() {
        var contentMarketingRibbon = $(".content-marketing-ribbon");
        if(contentMarketingRibbon.length > 0) {
        $(window).scroll(function () {
            if($(window).scrollTop() > 115) {
                contentMarketingRibbon.addClass('fixed');
            } else {
                contentMarketingRibbon.removeClass('fixed');
            }
        });
        }
    }
    return {
        init: init,
        reflow: function(){}
    };

    })(jQuery);
})();