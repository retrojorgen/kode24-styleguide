;(function () {
    'use strict';

    /**
     * Makes time relative.
     * @namespace
     */
    db.libs.taglist = (function($, Mousetrap){

        var name = 'taglist';
        var separator = ',';

        /**
         * Add a tag
         * @public
         * @memberof db.libs.taglist
         * @param {external:jQuery|string} id Selector or jQuery element
         * @param {string} tag             The tag to add
         * @return {external:jQuery}
         */
        function addTag(id, tag){
            var $taglist = $(id);
            tag = $.trim(tag);
            if(tag.length){
                var $tag = $('<li><span class="label ui round">' + tag + '</span></li>');
                $tag.on('click', function(event){
                    removeTag($taglist, $tag.index());
                });
                $taglist.find('li:last-child').before($tag);
            }
            setValue($taglist);
            return $taglist;
        }

        /**
         * Remove a tag
         * @public
         * @memberof db.libs.taglist
         * @param {external:jQuery|string} id Selector or jQuery element
         * @param {number} [i]               The index if the tag to remove
         * @return {external:jQuery}
         */
        function removeTag(id, i){
            var $taglist = $(id);
            if(i === undefined){
                i = $taglist.find('li').length - 2;
            }
            $taglist.find('li:nth-child(' + (i + 1) + ')').remove();
            setValue($taglist);
            return $taglist;
        }

        function getValue(id){
            var $taglist = $(id);
            var tags = $.trim( $taglist.find('input[type="hidden"]').val() );
            if(tags.length){
                tags = tags.split(separator).reverse();
                $.each(tags, function(i, tag){
                    var $tag = $('<li><span class="label round ui">' + $.trim(tag) + '</span></li>');
                    $taglist.prepend($tag);
                    $tag.on('click', function(event){
                        removeTag($taglist, $tag.index());
                    });
                });
            }
            return $taglist;
        }

        function setValue(id){
            var $taglist = $(id);
            var tags = [];

            $taglist.find('span.label').each(function(i, tag){
                tags.push( $(tag).text() );
            });
            $taglist.find('input[type="hidden"]').val( tags.join(separator) );
            return $taglist;
        }

        /**
         * Bind events
         * @private
         * @memberof db.libs.taglist
         * @param {event} Event passes from input
         * @return {external:jQuery}
         */
        function bindEvents(event){
            var $input = $(event.currentTarget);
            var $taglist = $input.closest('ul');

            $taglist.addClass('active');

            Mousetrap.bind(['enter', ','], function(event){
                addTag($taglist, $input.val());
                $input.val('');
                return false;
            });

            Mousetrap.bind('backspace', function(event){
                if($.trim($input.val()).length === 0){
                    removeTag($taglist);
                    return false;
                }
            });

            return $taglist;
        }

        /**
         * Unbind events
         * @private
         * @memberof db.libs.taglist
         * @param {event} Event passes from input
         * @return {external:jQuery}
         */
        function unbindEvents(event){
            var $input = $(event.currentTarget);
            var $taglist = $input.closest('ul');

            $taglist.removeClass('active');

            Mousetrap.unbind(['enter', ',', 'backspace']);

            return $taglist;
        }

        /**
         * Initialize the component
         * @public
         * @memberof db.libs.taglist
         * @param {external:jQuery|string} [id] Selector or jQuery element
         * @return {array} Returns array of all targeted elements
         */
        function init(id){
            var $targets;

            if(id !== undefined){
                $targets = $(id);
            } else {
                $targets = $('ul.taglist');
            }

            $targets.each(function(i, taglist){
                var $taglist = $(taglist);
                var tags = [];

                if( !db.utils.isInitialized($taglist, name) ){

                    $taglist.find('input[type="text"]').on('focus', bindEvents);
                    $taglist.find('input[type="text"]').on('blur', unbindEvents);

                    getValue($taglist);

                    db.utils.initialized(taglist, name);
                }
            });

            return $targets;
        }

        return {
            init: init,
            reflow: init,
            addTag: addTag,
            removeTag: removeTag
        };

    })(jQuery, Mousetrap);
})();
