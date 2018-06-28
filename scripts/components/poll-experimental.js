;(function () {
    'use strict';

    /**
     * Poll
     * @namespace
     */
    db.libs.pollExperimental = (function($, moment){

        var name = 'pollExperimental';

        //Fixtures
        var fixtures = {
            results: {
            }
        };

        function showResults(id) {

            var $poll = $('#'+ id);

            var total = 0;

            var results = fixtures.results;

            $.each(results, function (i, v) {
                total += parseInt(v);
            });

            $poll.addClass('active');

            console.log(results);
            $poll.find('label').each(function (i, label) {

                var key = $(label).find('input').val();
                console.log(key);

                var percentage = Math.round(( results[key] / total ) * 100);
                console.log(percentage);

                $(label).find('.bar').css({
                    'transform': 'scale(' + (percentage / 100) + ', 1.1)'
                });
                $(label).find('.score').text(percentage + '%');
            });
        }

        function vote(id, option) {

            var input = $('#' + id);
            id = id.split("-");
            var poll_id = input.parents("form.experimental-poll").attr("id");
            var answered = 0;

            if (typeof (Storage) !== "undefined") {
                if (sessionStorage["db-" + poll_id] == id[1]) {
                    answered = 1;
                }
            }

            if ( !answered ) {
                $.ajax({
                    url: db.config.pollURL + "/answers/" + id[1] + '/vote',
                    type: "POST",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (data, textStatus, jqXHR) {

                        if(data.error){

                        }
                        else {
                            if (typeof (Storage) !== "undefined") {
                                sessionStorage["db-" + poll_id] = id[1];
                            }
                            updateCount(poll_id, data.answers);
                            showResults(poll_id);
                        }
                    }
                });
            }
        }



        function updateCount(id, answers){

            var results = [];

            if( !answers ){

                $("#"+ id).find("input").each(function(){
                    results.push($(this).data("count"));
                });
            }
            else{
                for(var i=0; i< answers.length; i++) {
                    var count = answers[i].count;
                    if(count === null) count = 0;
                    results.push(count);
                }
            }
            fixtures.results = results;
        }

        /**
         * Initialize the component
         * @public
         * @memberof db.libs.pollExperimental
         * @param {external:jQuery|string} [id] Selector or jQuery element
         * @return {array} Returns array of all targeted elements
         */
        function init(id) {

            var $polls;

            if(id !== undefined){
                $polls = $(id);
            } else {
                $polls = $('form.experimental-poll');
            }

            $polls.each(function(i, el){

                if( !db.utils.isInitialized(el, name) ) {

                    var poll_id = $(this).attr("id");

                    $(el).find('input').each(function(){

                        var ans_id = $(this).attr("id");

                        $(this).on('click', function(){
                            vote(ans_id);
                        });
                    });

                    if (typeof (Storage) !== "undefined") {
                        if (sessionStorage["db-" + poll_id]) {
                            updateCount(poll_id);
                            showResults(poll_id);
                        }
                    }

                    db.utils.initialized(el, name);
                }
            });

            return $polls;
        }

        return {
            init: init,
            reflow: init
        };

    })(jQuery, moment);
})();
