;(function () {
    'use strict';
    
    /* global db */
    /* global history */
    /* global Foundation */
    
    /**
     * Load partial content using AJAX
     * @namespace
     */
    db.libs.pjax = (function($){

        /**
         * Load data from a url and append or prepend to a element.
         * @public
         * @memberof db.libs.pjax
         * @param {external:jQuery|string} id Selector or jQuery element
         * @param {object} [options] Options can be passed to load or read from the data-options attribute on the element
         * @param {string} [options.url] Url to load 
         * @param {string} [options.selector] The element to update 
         * @param {string} [options.insert=append] Append or prepend the the content 
         * @param {string} [options.text=initial] The text the link recives after the xhr is done loading. Defaults to the initial
         * @param {boolean} [options.loader=false] Replace the link content with a loader while the xhr loads 
         * @param {boolean} [options.pushState=false] Update pushState with the link href 
         * @param {boolean} [options.remove=false] Remove the link when the xhr is complete and a success  
         * @return {external:jQuery} jQuery element
         */
        var load = function(id, options){
            var $el = $(id);
            var defaults = { 
                url: undefined,
                text: $el.text(),
                loader: false,
                pushState: false,
                selector: undefined,
                insert: 'append',
                remove: false
            };
            if(options === undefined) options = Foundation.utils.data_options($el);
            options = $.extend({}, defaults, options);
            $.ajax({url:options.url, dataType:'html'})
                .done(function(data){
                    if(options.loader) $el.html('<span class="loader white"></span>');
                    if(options.pushState) history.pushState({}, $('title').text(), $el.prop('href'));
                    
                    if(options.insert == 'prepend'){
                        $(options.selector).prepend(data);
                    } else {
                        $(options.selector).append(data);
                    }
                    
                    $el.text(options.text);
                    if(options.remove) $el.remove();
                    
                    db.reflow();
                })
                .fail(function(){
                    console.error('db.libs.pjax -> Error loading url');
                    $el.text(options.text);
                });
            return $el;
        };

        /**
         * Initialize the component
         * @public
         * @memberof db.libs.pjax
         * @param {external:jQuery|string} [id] Selector or jQuery element. Default to all link elements with the data-pjax attribute
         * @return {array} Returns array of all targeted elements
         */
        function init(id){
            var $targets;

            if(id !== undefined){
                $targets = $(id);
            } else {
                $targets = $('a[data-pjax]');
            }
            
            $targets.each(function(i, el){
                $(el).off('click').on('click', function(){
                    event.preventDefault();
                    load(event.currentTarget);
                });
            });
            
            return $targets;
        }

        return {
            init: init,
            reflow: init,
            load: load
        };

    })(jQuery);

})();
