module.exports = function (grunt, pkg){
    return {
        tasks: {
            autoprefixer: {
                options: {
                    browsers: [
                        'ie >= 9',
                        'ie_mob >= 10',
                        'ff >= 30',
                        'chrome >= 34',
                        'safari >= 7',
                        'opera >= 23',
                        'ios >= 7',
                        'android >= 4.4',
                        'bb >= 10'
                    ],
                    cascade: false,
                    map: true
                },
                dev: {
                    src: ['<%= config.dest %>/stylesheets/app.css', '<%= config.dest %>/stylesheets/core.css', '<%= config.dest %>/stylesheets/critical.css']
                },
            }
        }
    }
};