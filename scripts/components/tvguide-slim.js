;(function() {
  'use strict';

  db.libs.tvguideSlim = (function($, moment) {

    //Start is kept only to watch for changes
    var value;

    //A simple map for converting the values from the slider to the hour it represents
    var map = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,23, 0, 1, 2, 3, 4, 5];

    function set(options) {
      var $list = $('.program-list-slim');
      if (typeof options.start !== 'undefined') {
        options.start = parseInt(options.start);
        options.value = map.indexOf(options.start);
      }

      if (typeof options.value !== 'undefined') {
        options.value = parseInt(options.value);
        options.start = map[options.value];
      }

      options.end = parseInt(
          moment({'hour': options.start}).add(6, 'hours').format('H'));
      if (options.start < 5) options.end = 5;

      $('.tv-slim .tvguide-info').
          html('Viser program mellom kl <strong>' +
              moment({'hour': options.start}).format('HH:mm') +
              '</strong> og kl <strong>' +
              moment({'hour': options.end}).format('HH:mm') + '</strong>');
      var alwaysActiveCounters = [];

      $('.tv-slim .program-list li[data-start-date]').each(function(i, el) {
        var time;
        var $time;
        var start;
        var endTime;
        var $liAttr = $(el).attr('data-start-date');
        if($(el).hasClass('styleguide-date')){
          $time = $(el).attr('data-show-time');
        }else{
          $time = moment(Number($liAttr)).format('YYYY-MM-DD HH:mm');
          $(el).attr('data-show-time', moment($time).format('YYYY-MM-DD HH:mm'));
        }

        if (typeof $time === 'undefined') {
          return;
        }

        $(el).find('.startDate').text(moment($time).format('HH.mm'));
        time = moment($time);
        endTime = moment(Number($(el).attr('data-end-date'))).format('YYYY-MM-DD HH:mm');
        start = moment().hours(options.start).minutes(0).seconds(0);

        if (options.start < 6) {
          start.add(1, 'd');
        }
        var end = start.clone().add(6, 'h');
        if ((time.isAfter(start) || time.isSame(start)) && time.isBefore(end)) {
          $(el).removeClass('hide');
          var channelid = $(el).parent().attr('data-channel-id');
          if (!alwaysActiveCounters[channelid]) {
            alwaysActiveCounters[channelid] = 0;
          }
          if (alwaysActiveCounters[channelid] < 3) {
            $(el).addClass('first-three');
            alwaysActiveCounters[channelid]++;
          }
        } else {
          $(el).addClass('hide');
        }
      });
      checkList();
    }

    function checkList() {
      $('.tv-slim .program-list').each(function(i, list) {
        var $list = $(list);
        var $children = $list.children();
        if ($children.not('.hide').length === 0) {
          $list.append('<li class="info">Ingen visninger</li>');
        } else if ($children.not('.hide').not('.info').length > 0 &&
            $children.has('.info')) {
          $list.find('.info').remove();
        }
      });
    }

    function init(id) {
      var $targets;

      if (id !== undefined) {
        $targets = $(id);
      } else {
        $targets = $('.tv-slim');
      }

      if ($targets.length) {
        $targets.each(function(i, tvguide) {
          //Set the startingpoint of the tvguide to the current hour
          set({start: moment().format('H')});
        });
      }
    }

    return {
      init: init,
      reflow: init,
      set: set,
    };

  })(jQuery, moment);

})();
