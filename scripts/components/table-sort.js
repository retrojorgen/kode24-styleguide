;(function () {
    'use strict';

    /**
     * @namespace
     */
    db.libs.tableSort = (function($, moment){

        var name = 'tableSort';

        /**
         * Compare strings
         * @private
         * @memberof db.libs.tableSort
         * @param {object} a
         * @param {object} b
         * @return {number}
         */
        function compareString(a, b){
            if(a.value < b.value) return -1;
            if(a.value > b.value) return 1;
            return 0;
        }

        /**
         * Compare numbers
         * @private
         * @memberof db.libs.tableSort
         * @param {object} a
         * @param {object} b
         * @return {number}
         */
        function compareNumbers(a, b){
            return a.value - b.value;
        }

        /**
         * Compare dates
         * @private
         * @memberof db.libs.tableSort
         * @param {external:moment} a
         * @param {external:moment} b
         * @return {number}
         */
        function compareDate(a, b){
            return a.value.isAfter(b.value);
        }

        /**
         * Return value from element as number
         * @param {jQuery|string} el The element from where to read value
         * @return {number}
         */
        function getNumber(el){
            return parseInt( $(el).text().replace(/\s+/g, "").toLowerCase() );
        }

        /**
         * Return value from element as text
         * @param {jQuery|string} el The element from where to read value
         * @return {string}
         */
        function getString(el){
            return $(el).text().toLowerCase();
        }

        /**
         * Return value from element as moment.js date
         * @param {jQuery|string} el The element from where to read value
         * @return {external:moment}
         */
        function getDate(el){
            return moment( $(el).text().toLowerCase() );
        }

        /**
         * Get the data from the column to sort
         * @private
         * @memberof db.libs.tableSort
         * @param {external:jQuery|string} id   Selector or jQuery object for table
         * @param {object} options
         * @param {number} options.index=0      Index of column to sort
         * @param {string} options.type=number  Type of data to sort. Accepts 'number', 'string' or 'date'
         * @return {array} Returns array of objects where value is the value to sort after and target is the row
         */
        function getSortable(id, options){
            var $table = $(id);
            var data = [];

            $table.find('tbody tr').each(function(x, row){
                var $cell = $(row).find('td:nth-child(' + (options.index + 1) + ')');
                var item = {};

                if(options.type == 'string'){
                    item.value = getString($cell);
                } else if(options.type == 'date'){
                    item.value = getDate($cell);
                } else {
                    item.value = getNumber($cell);
                }

                item.target = $(row);
                data.push(item);
            });

            return data;
        }

        /**
         * Sort table by a given column
         * @public
         * @memberof db.libs.tableSort
         * @param {external:jQuery|string} id   Selector or jQuery object for table
         * @param {object} options
         * @param {number} options.index=0      Index of column to sort
         * @param {string} options.sort=desc    Order of sort. Accepts 'asc' or 'desc'
         * @param {string} options.type=number  Type of data to sort. Accepts 'number', 'string' or 'date'
         * @return {jQuery}
         */
        function sortBy(id, options){
            var $table = $(id);

            var defaults = {
                index : 0,
                sort : 'desc',
                type : 'number'
            };
            options = $.extend({}, defaults, options);

            var data = getSortable(id, options);

            if(options.type == 'string'){
                data.sort(compareString);
            } else if(options.type == 'date'){
                data.sort(compareDate);
            } else {
                data.sort(compareNumbers);
            }

            if(options.sort == 'desc'){
                data.reverse();
            }

            var $tbody = $('<tbody></tbody>');

            $.each(data, function(k, v){
                $tbody.append(v.target);
            });

            $table.find('tbody').replaceWith($tbody);

            return $table;
        }

        function init(){
            $('table').each(function(i, table){
                if( !db.utils.isInitialized(table, name) ){
                    $(table).find('thead td a[data-sortable]').each(function(i, el){
                        $(el).on('click', function(event){
                            var $el = $(event.currentTarget);
                            var params = {};

                            $(table).find('thead td a[data-sortable]').removeClass('active');
                            $el.toggleClass('asc desc').addClass('active');

                            if( $el.hasClass('asc') ){ params.sort = 'asc'; }
                            if( $el.attr('data-sortable').length !== 0 ){ params.type = $el.attr('data-sortable'); }
                            params.index = $el.parent().index();

                            sortBy(table, params);
                        });
                    });
                    db.utils.initialized(table, name);
                }
            });
        }

        return {
            init: init,
            reflow: init
        };

    })(jQuery, moment);

})();
