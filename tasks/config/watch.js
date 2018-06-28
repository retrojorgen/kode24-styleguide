module.exports = function (grunt, pkg){
    return {
        tasks: {
            watch: {
                options: {
                    livereload: true
                },

                sassComponents:{
                    files: 'scss/components/*.scss',
                    tasks: [
                        'sass:dev',
                        'autoprefixer:dev',
                        'assemble:styleguide'
                    ]
                },

                sass: {
                    files: [
                        'scss/*.scss',
                        'scss/layouts/*.scss',
                        'scss/base/*.scss',
                        'scss/animations/*.scss'
                    ],
                    tasks: [
                        'sass:dev',
                        'sass:styleguide',
                        'autoprefixer:dev',
                        'assemble:styleguide'
                    ]
                },

                scripts: {
                    files: [
                        'scripts/**/*.js',
                        '!scripts/styleguide.js',
                        '!scripts/components/ads.js'
                    ],
                    tasks: [
                        'jshint',
                        'uglify:dev'
                    ]
                },

                ads: {
                    files: [
                        'scripts/components/ads.js'
                    ],
                    tasks: [
                        'jshint',
                        'uglify:dev',
                        'assemble:prototypes'
                    ]
                },

                jsdoc: {
                    files: 'scripts/components/*.js',
                    tasks: ['jsdoc']
                },

                scriptsStyleguide: {
                    files: [
                        'scripts/styleguide.js'
                    ],
                    tasks: [
                        'jshint',
                        'uglify:styleguide'
                    ]
                },

                prototypes: {
                    files: [
                        'templates/**/*.mustache',
                        'data/*.json',
                        'README.md'
                    ],
                    tasks: [
                        'assemble:prototypes', 
                        'mustache',
                        'uglify:dev'
                    ]
                },

                styleguide: {
                    files: [
                        'templates/layouts/styleguide.mustache'
                    ],
                    tasks: [
                        'sass:dev',
                        'assemble:styleguide',
                        'assemble:prototypes'
                    ]
                }
            }
        }
    }
};
