module.exports = function (grunt, pkg){
    return {
        tasks: {
            assemble: {
                options: {
                    pkg: grunt.file.readJSON('package.json'),
                    data: 'data/*.json',
                    engine: 'mustache'
                },
                styleguide:{
                    options: {
                        layout: 'templates/layouts/styleguide.mustache',
                        partials: 'templates/partials/**/*.mustache',
                        plugins: ['assemble-middleware-styleguide'],
                        styleguide: {
                            src: 'scss',
                            dest: '<%= config.dest %>/docs',
                            layout: 'templates/styleguide/section.mustache'
                        }
                    },
                    files: [{
                        expand: true,
                        cwd: 'templates/styleguide/',
                        src: [ '**/*.mustache', '!section.mustache' ],
                        dest: '<%= config.dest %>/',
                        rename: function(dest, src){
                            return dest + src.split('.')[0] + '.html';
                        }
                    }]
                },
                prototypes: {
                    options: {
                        layout: 'templates/layouts/default.mustache',
                        partials: 'templates/partials/**/*.mustache'
                    },
                    files: [{
                        expand: true,
                        cwd: 'templates/prototypes/',
                        src: [ '**/*.mustache' ],
                        dest: '<%= config.dest %>/prototypes/',
                        rename: function(dest, src){
                            return dest + src.split('.')[0] + '.html';
                        }
                    }]
                }
            }
        }
    }
};