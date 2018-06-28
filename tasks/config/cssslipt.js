module.exports = function (grunt, pkg){
    return {
        tasks: {
            csssplit: {
                dist: {
                    src: ['<%= config.dest %>/stylesheets/app.css'],
                    dest: '<%= config.dest %>/stylesheets/',
                    options: {
                        maxSelectors: 4095,
                        suffix: '_'
                    }
                }
            }
        }
    }
};