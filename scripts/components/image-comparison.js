;(function () {
    'use strict';

    db.libs.imageComparison = (function($){

        // Used to hold cached data when dragging.
        var data = {};

        function start(event){
            var $target = $(event.currentTarget);

            $target.addClass('active');

            data = {
                offset: $target.offset().left,
                height: $target.height(),
                width: $target.width(),
                min: $target.offset().left,
                max: ($target.offset().left + $target.width()),
                img: $target.find('img:nth-of-type(1)'),
                handle: $target.find('.handle'),
                touch: (event.type === 'mousedown') ? false : true
            };

        }

        function move(event){

            var $target = $(event.currentTarget);

            if( $target.hasClass('active') ){
                data.x = ( data.touch ) ? event.originalEvent.touches[0].pageX : event.pageX;

                if(data.x > data.min && data.x < data.max){
                    var value = Math.round( (data.x - data.offset) / ( data.width / 100) );
                    data.img.css({ 'clip': 'rect(0px ' + (data.x - data.offset) + 'px ' + data.height + 'px 0px)' });
                    data.handle.css({ 'left': (data.x - data.offset) + 'px' });
                    $target.parent().attr('data-value', value);
                }
            }
        }

        function end(event){

            var $target = $(event.currentTarget);

            $target.removeClass('active');
            data = {};
        }

        function set(event){
            var $target = $(event.currentTarget);
            var value = Math.round( (event.pageX - $target.offset().left) / ( $target.width() / 100) );

            $target.find('img:nth-of-type(1)').css({ 'clip': 'rect(0px ' + (event.pageX - $target.offset().left) + 'px ' + $target.height() + 'px 0px)' });
            $target.find('.handle').css({ 'left': (event.pageX - $target.offset().left) + 'px' });
            $target.parent().attr('data-value', value);
        }

        function init(){
            $('[data-image-comparison]').each(function(i, el){
                //Parse options
                var defaults = {
                    value : '50'
                };
                var options = $.extend({}, defaults, Foundation.utils.data_options($(el), 'image-comparison'));

                //Expose current value
                $(el).attr('data-value', options.value);

                //Bind events
                var $comparison = $(el).find('.comparison');
                $comparison.off('mousedown touchstart pointerdown').on('mousedown touchstart pointerdown', start);
                $comparison.off('mousemove touchmove pointermove').on('mousemove touchmove pointermove', move);
                $comparison.off('mouseup touchend pointerup').on('mouseup touchend pointerup', end);
                $comparison.off('click').on('click', set);

                //Create a throttled function to resize when needed
                $(window).on('resize', Foundation.utils.throttle(function(event){
                    //FIXME: Move this to a function
                    var width = ( $comparison.width() / 100 ) * parseInt($comparison.parent().attr('data-value'));
                    var height = $comparison.height();
                    $comparison.find('img:nth-of-type(1)').css({ 'clip': 'rect(0px ' + width + 'px ' + height + 'px 0px)' });
                    $comparison.find('.handle').css({ 'left': width + 'px' });
                }, 300));

                //Set initial position after the images have loaded
                var image = new Image();
                image.onload = function(){
                    var width = ( $comparison.width() / 100 ) * parseInt(options.value);
                    var height = $comparison.height();
                    $comparison.find('img:nth-of-type(1)').css({ 'clip': 'rect(0px ' + width + 'px ' + height + 'px 0px)' });
                    $comparison.find('.handle').css({ 'left': options.value + '%' });
                };
                image.src = $comparison.find('img:nth-of-type(2)').attr('src');

            });
        }

        return {
            init: init,
            reflow: init
        };

    })(jQuery);

})();
