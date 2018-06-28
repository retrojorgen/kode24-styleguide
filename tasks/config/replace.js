module.exports = function (grunt, pkg){
    return {
        tasks: {
            replace: {
                version: {
                    src: ['scripts/config/prod.js'],
                    overwrite: true,
                    replacements: [{
                        from: /version: '[\w\.-]+'/g,
                        to: "version: '<%= config.version.patch %>'"
                    }]
                },
                critical: {
                    src: ['<%= config.dest %>/prototypes/**/*.html'],
                    overwrite: true,
                    replacements: [{
                        from: '<link id="db-critical" media="screen" rel="stylesheet" type="text/css" href="/stylesheets/critical.css">',
                        to: function(){
                            var critical = grunt.file.read(pkg.config.dest + "/stylesheets/critical.css");
                            return '<style type="text/css">' + critical + '</style>';
                        }
                    }]
                },
                amp: {
                    src: ['<%= config.dest %>/prototypes/**/*.html'],
                    overwrite: true, 
                    replacements: [{
                        from: /(<style amp-custom)(.*)(<\/style>)/g,
                        to: function(){
                            var amp = grunt.file.read(pkg.config.dest + "/stylesheets/amp.css");
                            return '<style amp-custom>' + amp + '</style>';
                        }
                    },{
                        from: '<template id="amp-list-template" type="amp-mustache"></template>',
                        to: function(){
                            var amp = grunt.file.read("templates/partials/amp.list.mustache");
                            return amp;
                        }
                    }]
                },
                ads:{
                    src: ['<%= config.dest %>/prototypes/**/*.html'],
                    overwrite: true,
                    replacements: [{
                        from: '<script id="db-dfp" src="/scripts/ads.min.js"></script>',
                        to: function(){
                            var ads = grunt.file.read(pkg.config.dest + "/scripts/ads.min.js");
                            return '<script id="db-dfp">' + ads + '</script>';
                        }
                    }]
                }
            }
        }
    }
};
