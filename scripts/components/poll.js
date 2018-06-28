;(function () {
    'use strict';

    db.libs.poll = (function($){
        var module = {};
        //FIXME: This needs some fixing. Does not currently support multiple polls.
        module.init = function(){

                $("form.poll").find("input[name='poll-answer']").show();

                $("form.poll").find("a.vote-btn").click(function(){
                    if($("form.poll").find("input[name='poll-answer']").is(':checked')) {

                        $(this).parents(".poll-footer").find(".poll-controls").hide();
                        $(this).parents(".poll-footer").find(".secondary").hide();

                        pollVote($("form.poll").find("input[name='poll-answer']:checked"));
                    }
                    else{
                        $(this).parents(".poll-footer").find(".secondary").show();
                    }
                });

                $("form.poll").find("a.poll-reveal").click(function(){
                    showResults($(this).parents("form.poll").attr("id"));
                });

                function pollVote(input){

                    var id = input.attr("id");
                    id = id.split("-");

                    $.ajax({
                        url : db.config.pollURL +"/answers/" + id[1] +'/vote',
                        type : "POST",
                         xhrFields: {
                               withCredentials: true
                            },
                        success : function(data, textStatus, jqXHR) {

                            updateCount(input.parents("form.poll").attr("id"), data.answers);
                            showResults(input.parents("form.poll").attr("id"));
                            $("#"+id).find(".poll-feedback").show();
                            input.parents("form.poll").find(".poll-feedback").show();
                        },
                        error : function(data, textStatus, errorThrown) {
                            var div = input.parents("form.poll").find(".secondary");
                            var span = input.parents("form.poll").find(".secondary p span");
                            div.children("p").html(data.responseJSON.error);
                            div.children("p").prepend(span);
                            div.show();
                            input.parents("form.poll").find(".poll-feedback").show();
                            showResults(input.parents("form.poll").attr("id"));
                        }
                    });
                }

                function updateCount( id, answers ){

                    var total_count = parseInt($("#"+id).find(".total-numbers strong").html());
                    total_count = total_count + 1;
                    $("#"+id).find(".total-numbers strong").html(total_count);

                    for(var i=0; i<answers.length; i++){
                        var result_div = $("#poll-result-" + answers[i].id);
                        var percent = Math.round((answers[i].count/total_count) * 100);
                        result_div.children(".result-numbers").children("small").children("strong").html(percent + "%");
                        result_div.find(".vote-count").html(answers[i].count);
                        result_div.find(".bar-fill").css("width", percent + "%");
                    }
                }

                function showResults( id ){

                    $("#"+id).find(".answer-result").show();
                }


        };

        module.reflow = function(){};

        return module;

    })(jQuery);

})();
