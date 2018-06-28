module.exports = function (grunt, pkg){
    return {
        tasks: {
            uglify: {
                dev: {
                    options: {
                        drop_console: false,
                        sourceMap: true
                    },
                    files:{
                        '<%= config.dest %>/scripts/app.min.js': [
                            'bower_components/raven-js/dist/raven.js',
                            'bower_components/jquery/dist/jquery.js',
                            'bower_components/mustache.js/mustache.js',
                            'bower_components/mousetrap/mousetrap.js',
                            'bower_components/moment/moment.js',
                            'bower_components/screenfull/dist/screenfull.js',
                            'bower_components/foundation/js/vendor/modernizr.js',
                            'bower_components/foundation/js/foundation/foundation.js',
                            'bower_components/foundation/js/foundation/foundation.alert.js',
                            'bower_components/foundation/js/foundation/foundation.dropdown.js',
                            'bower_components/foundation/js/foundation/foundation.reveal.js',
                            'bower_components/foundation/js/foundation/foundation.tab.js',
                            'bower_components/foundation/js/foundation/foundation.tooltip.js',
                            'bower_components/foundation/js/foundation/foundation.slider.js',
                            'bower_components/foundation/js/foundation/foundation.equalizer.js',
                            'bower_components/foundation/js/foundation/foundation.abide.js',
                            'bower_components/photoswipe/dist/photoswipe.js',
                            'bower_components/photoswipe/dist/photoswipe-ui-default.js',

                            'scripts/config/moment.nb.js',
                            'scripts/config/dev.js',
                            '<%= config.dest %>/scripts/appTemplates.min.js',
                            'scripts/components/*.js',
                            'scripts/utils.js',
                            'scripts/app.js'
                        ],
                        '<%= config.dest %>/scripts/core.min.js': [
                            'bower_components/foundation/js/foundation/foundation.js',
                            'bower_components/foundation/js/foundation/foundation.dropdown.js',
                            'bower_components/foundation/js/foundation/foundation.tooltip.js',
                            'bower_components/foundation/js/foundation/foundation.equalizer.js',
                            'bower_components/foundation/js/foundation/foundation.abide.js',

                            'scripts/config/dev.js',
                            '<%= config.dest %>/scripts/coreTemplates.min.js',
                            'scripts/components/comment-count.js',
                            'scripts/components/range-slider.js',
                            'scripts/components/section-bar.js',
                            'scripts/components/switch.js',
                            'scripts/components/topnav.js',
                            'scripts/components/tvguide.js',
                            'scripts/components/infinitescroll.js',
                            'scripts/components/pjax.js',
                            'scripts/utils.js',
                            'scripts/app.js'
                        ],
                        '<%= config.dest %>/scripts/critical.min.js': [
                            'scripts/config/prod.js',
                            'scripts/components/image-srcset.js',
                            'scripts/components/css-load.js',
                            'scripts/critical.js'
                        ],
                    }
                },
                dist: {
                    options: {
                        banner: '/*! <%= name %> - v<%= version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
                        drop_console: true,
                        sourceMap: true
                    },
                    files:{
                        '<%= config.dest %>/scripts/app.min.js': [
                            'bower_components/raven-js/dist/raven.js',
                            'bower_components/jquery/dist/jquery.js',
                            'bower_components/mustache.js/mustache.js',
                            'bower_components/mousetrap/mousetrap.js',
                            'bower_components/moment/moment.js',
                            'bower_components/screenfull/dist/screenfull.js',
                            'bower_components/foundation/js/vendor/modernizr.js',
                            'bower_components/foundation/js/foundation/foundation.js',
                            'bower_components/foundation/js/foundation/foundation.alert.js',
                            'bower_components/foundation/js/foundation/foundation.dropdown.js',
                            'bower_components/foundation/js/foundation/foundation.reveal.js',
                            'bower_components/foundation/js/foundation/foundation.tab.js',
                            'bower_components/foundation/js/foundation/foundation.tooltip.js',
                            'bower_components/foundation/js/foundation/foundation.slider.js',
                            'bower_components/foundation/js/foundation/foundation.equalizer.js',
                            'bower_components/foundation/js/foundation/foundation.abide.js',

                            'scripts/config/moment.nb.js',
                            'scripts/config/prod.js',
                            '<%= config.dest %>/scripts/appTemplates.min.js',
                            'scripts/components/*.js',
                            'scripts/utils.js',
                            'scripts/app.js'
                        ],
                        '<%= config.dest %>/scripts/core.min.js': [
                            'bower_components/foundation/js/foundation/foundation.js',
                            'bower_components/foundation/js/foundation/foundation.dropdown.js',
                            'bower_components/foundation/js/foundation/foundation.tooltip.js',
                            'bower_components/foundation/js/foundation/foundation.equalizer.js',
                            'bower_components/foundation/js/foundation/foundation.abide.js',

                            'scripts/config/prod.js',
                            '<%= config.dest %>/scripts/coreTemplates.min.js',
                            'scripts/components/comment-count.js',
                            'scripts/components/range-slider.js',
                            'scripts/components/section-bar.js',
                            'scripts/components/switch.js',
                            'scripts/components/topnav.js',
                            'scripts/components/tvguide.js',
                            'scripts/components/infinitescroll.js',
                            'scripts/components/pjax.js',
                            'scripts/utils.js',
                            'scripts/app.js'
                        ],
                        '<%= config.dest %>/scripts/critical.min.js': [
                            'scripts/config/prod.js',
                            'scripts/components/image-srcset.js',
                            'scripts/components/css-load.js',
                            'scripts/critical.js'
                        ]
                    }
                },

                styleguide: {
                    options: {
                        drop_console: true,
                        sourceMap: true
                    },
                    files:{
                        '<%= config.dest %>/scripts/styleguide.min.js': [
                            'bower_components/google-code-prettify/src/prettify.js',
                            'scripts/styleguide.js'
                        ]
                    }
                }
            }
        }
    }
};