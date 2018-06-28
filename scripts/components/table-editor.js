;(function () {
    'use strict';

    /**
     * @namespace
     */
    db.libs.tableEditor = (function($, Mousetrap){

        var name = 'tableEditor';

        /**
         * Return table data as JSON
         * @public
         * @memberof! db.libs.tableEditor
         * @param {jQuery|string} id The table to be referenced
         * @returns {json} Table data formated as json
         */
        function getJSON(id){
            var $table = $(id);
            var data = {};

            if( $table.find('thead').length ){
                data.head = {
                    rows: []
                };
                $table.find('thead tr').each(function(i, r){
                    var row = {
                        cells: [],
                        classes: $(r).attr('class')
                    };
                    $(r).find('td').each(function(i, cell){
                        row.cells.push({
                            value: $(cell).html(),
                            classes: $(cell).attr('class')
                        });
                    });

                    data.head.rows.push(row);
                });
            }

            if( $table.find('tbody').length ){
                data.body = {
                    rows: []
                };
                $table.find('tbody tr').each(function(i, r){
                    var row = {
                        cells: [],
                        classes: $(r).attr('class')
                    };
                    $(r).find('td').each(function(i, cell){
                        row.cells.push({
                            value: $(cell).html(),
                            classes: $(cell).attr('class')
                        });
                    });

                    data.body.rows.push(row);
                });
            }

            return JSON.stringify(data);
        }

        /**
         * Toggles classnames for column
         * @public
         * @memberof db.libs.tableEditor
         * @param {jQuery|string} id        The table to be referenced
         * @param {number} [i]              Index for the column to alter, if null, last focused is used, if that's not possible, the last column in the table is used
         * @param {string} addClassnames    Classes to toggle
         * @param {string} removeClassnames Classes to remove
         * @return {jQuery} the table
         */
        function toggleColumnClass(id, i, toggleClassnames, removeClassnames){
            var $table = $(id);

            if( !$.isNumeric(i) ){
                if($table.data('lastFocus')){
                    i = $($table.data('lastFocus')).index();
                } else {
                    i = $table.find('tbody tr td').length;
                }
            }

            $table.find('tr').each(function(r, row){
                var $cell = $(row).find('td:nth-child(' + (i + 1) + ')');
                $cell.removeClass(removeClassnames);
                $cell.toggleClass(toggleClassnames);
            });

            return $table;
        }

        /**
         * Toggle classnames for row
         * @public
         * @memberof db.libs.tableEditor
         * @param {jQuery|string} id        The table to be referenced
         * @param {number} [i]              Index for the row to alter, if null, last focused is used, if that's not possible, the last row in the table is used
         * @param {string} addClassnames    Classes to toggle
         * @param {string} removeClassnames Classes to remove
         * @return {jQuery} the table
         */
        function toggleRowClass(id, i, addClassnames, removeClassnames){
            var $table = $(id);
            var $row;

            if( !$.isNumeric(i) ){
                if($table.data('lastFocus')){
                    $row = $($table.data('lastFocus')).parent();
                } else {
                    $row = $table.find('tbody tr').last();
                }
            } else {
                $row = $table.find('tbody tr:nth-child(' + i + ')');
            }

            $row.removeClass(removeClassnames);
            $row.toggleClass(addClassnames);

            return $table;
        }

        /**
         * Toggles the table header/thead
         * @public
         * @memberof db.libs.tableEditor
         * @param {jQuery|string} id The table to be referenced
         * @return {jQuery} the table
         */
        function toggleHeader(id){
            var $table = $(id);
            if($table.find('thead').length){
                deleteHeader(id);
            } else {
                insertHeader(id);
            }

            return $table;
        }

        /**
         * Inserts a header/thead at the top of the table
         * @public
         * @memberof db.libs.tableEditor
         * @param {jQuery|string} id The table to be referenced
         * @return {jQuery} the table
         */
        function insertHeader(id){
            var $table = $(id);
            var $thead = $('<thead><tr></tr></thead>');
            for(var x = 0; x < $table.find('tbody tr:first-child td').length; x++){
                var $cell = $('<td contenteditable></td>');
                $cell.on('focus', bindEvents);
                $cell.on('blur', unbindEvents);
                $thead.find('tr').append($cell);
            }
            $table.prepend($thead);

            return $table;
        }

        /**
         * Removed the header/thead from the table
         * @public
         * @memberof db.libs.tableEditor
         * @param {jQuery|string} id The table to be referenced
         * @return {jQuery} the table
         */
        function deleteHeader(id){
            var $table = $(id).find('thead').remove();
            return $table;
        }

        /**
         * Inserts a new column
         * @public
         * @memberof db.libs.tableEditor
         * @param {jQuery|string} id The table to be referenced
         * @param {number} [i]   Where to insert the column, if not set, after last focused is used, if that's not possible, inserted at the end
         * @return {jQuery} the table
         */
        function insertColumn(id, i){
            var $table = $(id);

            if(i === undefined){
                if($table.data('lastFocus')){
                    i = $($table.data('lastFocus')).index() + 1;
                    $table.data('lastFocus', null);
                } else {
                    i = $table.find('tbody tr td').length;
                }
            }

            $table.find('tr').each(function(r, row){
                var $index = $(row).find('td:nth-child(' + (i + 1) + ')');
                var $cell = $('<td contenteditable></td>');

                if($index.length === 0){
                    $(row).append($cell);
                } else {
                    $index.before($cell);
                }

                $cell.on('focus', bindEvents);
                $cell.on('blur', unbindEvents);
            });

            return $table;
        }

        /**
         * Deletes a column
         * @public
         * @memberof db.libs.tableEditor
         * @param {jQuery|string} id The table to be referenced
         * @param {number} [i]   Index for the column to delete. If not set, the last column is selected
         * @return {jQuery} the table
         */
        function deleteColumn(id, i){
            var $table = $(id);

            if(i === undefined){
                if($table.data('lastFocus')){
                    i = $($table.data('lastFocus')).index();
                    $table.data('lastFocus', null);
                } else {
                    i = $table.find('tbody tr:first-child td').length - 1;
                }
            }

            $table.find('tr').each(function(r, row){
                $( $(row).find('td')[i] ).remove();
            });

            return $table;
        }

        /**
         * Insert a new row
         * @public
         * @memberof db.libs.tableEditor
         * @param {jQuery|string} id The table to be referenced
         * @param {number} [i]       Where to insert the row, if not set, after last focused is used, if that's not possible, inserted at the end
         * @return {jQuery} the table
         */
        function insertRow(id, i){
            var $table = $(id);
            var $row = $('<tr></tr>');
            var cells = $table.find('tbody tr:first-child td').length;

            if(cells === 0){
                cells = $table.find('thead tr:first-child td').length;
            }

            for(var x = 0; x < cells; x++){
                var $cell = $('<td contenteditable></td>');
                $cell.on('focus', bindEvents);
                $cell.on('blur', unbindEvents);
                $row.append($cell);
            }

            //FIXME: Should also support inserting row after last index.
            if(i !== undefined){
                var $index = $table.find('tbody tr:nth-child(' + (i+1) + ')');
                $index.before($row);
            } else {
                $table.find('tbody').append($row);
            }

            return $table;
        }

        /**
         * Delete a row
         * @public
         * @memberof db.libs.tableEditor
         * @param {jQuery|string} id The table to be referenced
         * @param {number} [i]   Index for the row to delete. If not set, last focus is used, if that is not possible the last row is selected
         * @return {jQuery} the table
         */
        function deleteRow(id, i){
            var $table = $(id);
            var $row;

            if(i === undefined){
                if($table.data('lastFocus')){
                    $row = $($table.data('lastFocus')).parent();
                    $table.data('lastFocus', null);
                } else {
                    $row = $table.find('tbody tr').last();
                }
            } else {
                $row = $table.find('tbody tr:nth-child(' + i + ')');
            }

            if($row.parent().prop('tagName') == 'TBODY'){
                $row.remove();
            }

            return $table;
        }

        /**
         * Set focus to the next cell, if there is no "next cell", one is created
         * @private
         * @memberof db.libs.tableEditor
         * @param {event} [event] event passed from keypress
         */
        function nextCell(event){
            if(event) event.preventDefault();
            var $el = $(':focus');
            //If the cell is the last cell in a row, insert a new cell at the end
            if( ($el.index() + 1) == $el.parent().find('td').length ){
                insertColumn( $(':focus').closest('table') );
            }
            $el.next().focus();
        }

        /**
         * Set focus to the first cell in the next row. If there is no "next row", one is created
         * @private
         * @memberof db.libs.tableEditor
         * @param {event} [event] event passed from keypress
         */
        function nextRow(event){
            if(event) event.preventDefault();
            var $el = $(':focus');
            var $row = $el.parent();
            var $table = $(':focus').closest('table');

            // If this is the last row in the table, insert a new at the end
            if( $el.parent().parent().prop('tagName') == 'TBODY' && ($row.index() + 1) == $table.find('tbody tr').length){
                insertRow( $table );
            }

            if( $el.parent().parent().prop('tagName') != 'TBODY' ){
                $table.find('tbody tr td:first-child').focus();
            } else {
                $row.next().find('td:first-child').focus();
            }
        }

        /**
         * Binds events
         * @private
         * @memberof db.libs.tableEditor
         * @param {event} event Event passed from focus or blur
         */
        function bindEvents(event){
            $(event.currentTarget).closest('table').data('lastFocus', $(event.currentTarget));
            setTimeout(function(){
                Mousetrap.bind('tab', nextCell);
                Mousetrap.bind('enter', nextRow);
            },0);
        }

        /**
         * Unbind events
         * @private
         * @memberof db.libs.tableEditor
         * @param {event} event Event passed from focus or blur
         */
        function unbindEvents(event){
            var $table = $(event.currentTarget).closest('table');
            setTimeout(function(){
                //If focus not within the table
                if( $table.find(':focus').length === 0 ){
                    Mousetrap.unbind('tab', insertColumn);
                    Mousetrap.unbind('enter', insertRow);
                }
            }, 0);
        }

        /**
         * Init Table editor
         * @public
         * @memberof db.libs.tableEditor
         * @return {jQuery} all table editors
         */
        function init(){
            $('table[data-editor]').each(function(i, table){
                if( !db.utils.isInitialized(table, name) ){

                    $(table).find('td').each(function(i, cell){
                        $(cell).on('focus', bindEvents);
                        $(cell).on('blur', unbindEvents);
                    });

                    db.utils.initialized(table, name);
                }
            });

            return $('table[data-editor]');
        }

        return {
            init: init,
            reflow: init,
            toggleHeader: toggleHeader,
            insertColumn: insertColumn,
            deleteColumn: deleteColumn,
            insertRow: insertRow,
            deleteRow: deleteRow,
            toggleColumnClass: toggleColumnClass,
            toggleRowClass: toggleRowClass,
            getJSON: getJSON
        };

    })(jQuery, Mousetrap);

})();
