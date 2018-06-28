;(function () {
    'use strict';

    db.libs.tvguide = (function($, moment){

        //Start is kept only to watch for changes
        var value;

        //A simple map for converting the values from the slider to the hour it represents
        var map = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1,2,3,4,5];

        function setCategory(event){
            /*jshint validthis:true */
            if(event) event.preventDefault();

            var category = $(this).attr('data-category');

            $('.tvguide-info').html('Viser alle <strong>'+ $(this).text() + '</strong>');

            $('.program-list li').each(function(i, el){
                if( $(el).attr('data-category') == category ){
                    $(el).removeClass('hide');
                } else {
                    $(el).addClass('hide');
                }
            });
            checkList();
        }

        function set(options){
            if(typeof options.start !== 'undefined'){
                var slider = document.getElementById("tvguide-slider");
                options.start = parseInt(options.start);
                options.value = map.indexOf(options.start);
                slider.value = options.value;
                $(slider).trigger('input');
            }

            if(typeof options.value !== 'undefined'){
                options.value = parseInt(options.value);
                options.start = map[options.value];
            }

            options.end = parseInt(moment({'hour': options.start}).add(6, 'hours').format('H'));
            if(options.start < 5) options.end = 5;

            $('.tvguide-info').html('Viser program mellom kl <strong>'+ moment({ 'hour': options.start }).format('HH:mm') +'</strong> og kl <strong>'+ moment({ 'hour': options.end }).format('HH:mm') +'</strong>');
            var alwaysActiveCounters = [];
            $('.program-list li[data-show-time]').each(function(i, el){
                var $time = $(el).attr('data-show-time');
                if (typeof $time == "undefined") {
                    return;
                }
                var time = moment($time);

                var start = moment().hours(options.start).minutes(0).seconds(0);
                if (options.start < 6) {
                    start.add(1, 'd');
                }
                var end = start.clone().add(6, 'h');

                if ((time.isAfter(start) || time.isSame(start)) && time.isBefore(end)) {
                    $(el).removeClass("hide");
                    var channelid = $(el).parent().attr("data-channel-id");
                    if (!alwaysActiveCounters[channelid]){
                        alwaysActiveCounters[channelid] = 0;
                    }
                    if(alwaysActiveCounters[channelid] < 3){
                        $(el).addClass("first-three");
                        alwaysActiveCounters[channelid]++;
                    }
                } else {
                    $(el).addClass("hide");
                }
            });
            checkList();
        }


        function checkList() {
            $('.program-list').each(function(i, list) {
                var $list = $(list);
                var $children = $list.children();
                if( $children.not('.hide').length === 0 ){
                    $list.append('<li class="info">Ingen visninger</li>');
                } else if ($children.not('.hide').not('.info').length > 0 && $children.has('.info')) {
                    $list.find('.info').remove();
                }
            });
        }

        function toggleChannel(event){
            /*jshint validthis:true */
            if(event) event.preventDefault();
            $(this).closest('.channel-content').toggleClass('active');
        }

        function init(id){

            var $targets;

            if(id !== undefined){
                $targets = $(id);
            } else {
                $targets = $('.tv-guide');
            }

            $targets.each(function(i, tvguide){

                //Set the startingpoint of the tvguide to the current hour
                set({ start: moment().format('H') });

                $('#tvguide-slider', tvguide).off('change').on('change', function(event){
                    set({ value: this.value });
                });

                $('.range-slider-legend span', tvguide).off('click').on('click', function(event){
                    /*jshint validthis:true */
                    if(event) event.preventDefault();
                    set({start: parseInt($(this).text())});
                });

                $('.tvguide-legend a', tvguide).off('click').on('click', setCategory);

                $('.channel-header a', tvguide).off('click').on('click', toggleChannel);
            });

        }

        return {
            init: init,
            reflow: init,
            set: set
        };

    })(jQuery, moment);

})();
