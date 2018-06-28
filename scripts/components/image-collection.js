;(function () {
    'use strict';

    // I've added lots of inline comments here since this is a litte complex -Tom
    // Most of the swiping stuff is based on the work from https://github.com/thebird/Swipe/

    db.libs.imageCollection = (function($){
        //FIXME: Note that data probably shoud not be shared when multiple instances is ont the same page
        //FIXME: This is not supported for mouse events(desktop) yet.

        var $collection;
        var data = {};

        //Called on thouchstart
        function start(event){
            /*jshint validthis:true */
            var touches = event.touches[0];
            data.start = {
                // Get initial touch coords
                x: touches.pageX,
                y: touches.pageY,
                // Store time to determine touch duration
                time: new Date()
            };
            data.isScrolling = undefined;
            //Reset delta
            data.delta = {};
        }

        //Called on touchmove
        function move(event){
            /*jshint validthis:true */
            // Ensure swiping with one touch and not pinching
            if ( event.touches.length > 1 || event.scale && event.scale !== 1) return;

            var touches = event.touches[0];

            data.delta = {
                x: touches.pageX - data.start.x,
                y: touches.pageY - data.start.y
            };

            //Check if the user is trying to scroll
            if ( typeof data.isScrolling == 'undefined') {
                data.isScrolling = !!( data.isScrolling || Math.abs(data.delta.x) < Math.abs(data.delta.y) );
            }

            // If user is not trying to scroll vertically
            if (!data.isScrolling) {
                // Prevent native scrolling
                event.preventDefault();
                //Now, you see this next line here? Don't fuck with it.
                data.delta.x = data.delta.x / ( (!data.index && data.delta.x > 0 || data.index == data.length - 1 && data.delta.x < 0 ) ? ( Math.abs(data.delta.x) / data.width + 1 ) : 1 );

                // Determine direction of swipe (true:right, false:left)
                var direction = data.delta.x < 0;

                if (direction) {
                    translate(data.index, data.delta.x, 0);
                } else {
                    translate(data.index-1, data.delta.x - data.width, 0);
                }
            }
        }

        //Called on touchend
        function end(event){
            /*jshint validthis:true */
            // Measure duration
            var duration = new Date() - data.start.time;

            // Determine if swipe attempt triggers next/prev item
            var isValidSlide = Number(duration) < 250 && Math.abs(data.delta.x) > 20 || Math.abs(data.delta.x) > data.width/2;
            // If swipe duration is less than 250ms, and if item amt is greater than 20px, or if item amt is greater than half the width of the viewport

            // Determine if swipe attempt is past start and end
            var isPastBounds = !data.index && data.delta.x > 0 || data.index == data.length - 1 && data.delta.x < 0;
            // If first slide and slide amt is greater than 0, or if last slide and slide amt is less than 0

            // Determine direction of swipe (true:right, false:left)
            var direction = data.delta.x < 0;

            // If not scrolling vertically
            if (!data.isScrolling) {
                if (isValidSlide && !isPastBounds) {
                    if (direction) {
                        //Triggers next item
                        translate(data.index, -data.width, data.speed);
                        data.index++;
                    } else {
                        //Trigger prev item
                        translate(data.index-1, 0, data.speed);
                        data.index--;
                    }
                } else {
                    if (direction) {
                        //Snap back from next right…
                        translate(data.index, 0, data.speed);
                    } else {
                        //Snap back from prev item…
                        translate(data.index-1, -data.width, data.speed);
                    }
                }
            }
        }

        //Called when moving items around
        function translate(index, dist, speed){
            //Move the top item
            $(data.items[index]).css({
                'webkitTransitionDuration': speed + 'ms',
                'webkitTransform': 'translate(' + dist + 'px,0)' + 'translateZ(0)'
            });

            var factor = ( (dist * -1) / (data.width ) );
            if(factor > 1) factor = 1;
            var scale = 0.8 + ((factor / 10) * 2);

            if((index+1) < data.length){
                //Move the next
                $(data.items[index+1]).css({
                    'webkitTransitionDuration': speed + 'ms',
                    'opacity': factor,
                    'webkitTransform': 'scale(' + scale + ',' + scale + ')' + 'translateZ(0)'
                });
            }
        }

        //Called when opening the collection
        function open(event){
            /*jshint validthis:true */

            var $collection = $(this).closest('[data-image-collection]');

            //Attach click to the close-button
            $collection.find('.close').unbind('click').on('click', close);
            //Unbind clicks on the items
            $collection.find('.item').unbind('click');

            //Add classes active to both the collection and the selected item
            $collection.addClass('active');
            $(this).addClass('active');


            //Attach touchevents
            $collection.get(0).addEventListener('touchstart', start, false);
            $collection.get(0).addEventListener('touchmove', move, false);
            $collection.get(0).addEventListener('touchend', end, false);

            //Attach keyboard and navigation events when touch is not supported
            Mousetrap.bind('right', next);
            Mousetrap.bind('left', prev);
            Mousetrap.bind('esc', exit);

            $collection.find('.prev').unbind('click').on('click', prev);
            $collection.find('.next').unbind('click').on('click', next);

            //Cache items and data used when swiping
            data = {
                speed: 200,
                index: $collection.children('.item').index( $(this) ),
                items: $collection.children('.item'),
                length: $collection.find('.item').length,
                width: $collection.width()
            };

            //Move all the items before the selected out to the left so they are in the correct location when swiping
            if(data.index > 0){
                $(this).prevAll('.item').css({
                    'webkitTransform': 'translate(' + -data.width + 'px,0)',
                    'opacity': 1
                });
            }
        }

        function close(event){
            /*jshint validthis:true */
            if(event) event.preventDefault();

            var $collection = $(this).closest('[data-image-collection]');
            $collection.removeClass('active');
            $collection.find('.item').each(function(i, item){
                var img = $(item).css('background-image');
                $(item).attr('style', '').css({ 'background-image': img });
                $(item).removeClass('active');
            });

            $collection.get(0).removeEventListener('touchstart', start, false);
            $collection.get(0).removeEventListener('touchmove', move, false);
            $collection.get(0).removeEventListener('touchend', end, false);

            data.index = 0;

            Mousetrap.unbind('right');
            Mousetrap.unbind('left');
            Mousetrap.unbind('esc');

            init();
        }

        function next(){
            if(data.index < (data.length - 1)){
                translate(data.index, -data.width, data.speed);
                data.index++;
            } else{
                $(data.items[data.index]).addClass('shake');
                setTimeout(function(){
                    $(data.items[data.index]).removeClass('shake');
                }, 1000);
            }
        }

        function prev(){
            if(data.index > 0){
                translate(data.index-1, 0, data.speed);
                data.index--;
            } else {
                $(data.items[data.index]).addClass('shake');
                setTimeout(function(){
                    $(data.items[data.index]).removeClass('shake');
                }, 1000);
            }
        }

        function exit(){
            $('.active[data-image-collection] .close').trigger('click');
        }

        function show(event){
            /*jshint validthis:true */
            var $collection = $(this).closest('[data-image-collection]');
            $collection.addClass('showAll');
            $($collection.find('.item')[8]).unbind('click').on('click', open);
        }

        function init(){
            //Attach clicks to each image…
            $('[data-image-collection] .item').unbind('click').on('click', open);
            //… but not the 9nth image. When clicking this image we show all other image…
            $('[data-image-collection] .item:nth-child(9)').unbind('click').on('click', show);
        }

        return {
            init: init,
            reflow: init
        };

    })(jQuery);

})();
