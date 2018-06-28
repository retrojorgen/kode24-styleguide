;(function () {
    'use strict';

    db.libs.infinitescroll = (function($){
        var module = {};
        
        module.init = function(){                                  
                        
                var elem = null;                  
                elem = document.getElementById("readMoreBtn"); 
                var url = window.location.href; 
                var loadAll = true;                

                if(elem && url.indexOf("/forsida") < 0){                

                    var _throttleTimer = null;
                    var _throttleDelay = 100;
                    var $window = $(window);
                    var $document = $(document);                    

                    $window
                       .off('scroll', ScrollHandler)
                       .on('scroll', ScrollHandler);                                         
                }

                function ScrollHandler(e) {
                        
                     clearTimeout(_throttleTimer);
                     _throttleTimer = setTimeout(function () {
                            
                         if ($window.scrollTop() + $window.height() > $document.height() - 1500) {
                               
                              if(elem && loadAll === true ){
                                   loadAll = false; 
                                   elem.click();
                              }                                                       
                         }

                     }, _throttleDelay);
                }           

        };

        module.reflow = function(){};

        return module;

    })(jQuery);

})();
