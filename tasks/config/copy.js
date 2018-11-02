module.exports = function (grunt, pkg){
    return {
        tasks: {
            copy: {
                dev: {
                    files: [
                        { expand: true, dot: true, cwd: './', src: ['manifest.json', '.htaccess', 'data/*.json', 'fonts/{,*/}*.{woff,woff2,ttf,eot}'], dest: '<%= config.dest %>/' },
                        { expand: true, dot: true, cwd: 'assets/favicon/styleguide/dev/', src: ['favicon.ico'], dest: '<%= config.dest %>/' },
                        { expand: true, dot: true, cwd: 'assets/', src: ['**/*.{png,jpg,gif,svg,js,html}'], dest: '<%= config.dest %>/assets/' }
                    ]
                },
                dist: {
                    files: [
                        
                        { expand: true, dot: true, cwd: './', src: ['manifest.json', 'styleguide.html', '.htaccess','data/*.json', 'fonts/{,*/}*.{woff,woff2,ttf,eot}'], dest: '<%= config.dest %>/' },
                        { expand: true, dot: true, cwd: 'assets/', src: ['**/*.svg'], dest: '<%= config.dest %>/assets/' },
                        { expand: true, dot: true, cwd: 'assets/favicon/styleguide/prod/', src: ['favicon.ico'], dest: '<%= config.dest %>/' },
                        { expand: true, cwd: '<%= config.dest %>/', src: ['scripts/**', 'fonts/**', 'assets/**'], dest: '<%= config.dest %>/<%= config.version.major %>/' },
                        { expand: true, cwd: '<%= config.dest %>/', src: ['scripts/**', 'fonts/**', 'assets/**'], dest: '<%= config.dest %>/<%= config.version.minor %>/' },
                        { expand: true, cwd: '<%= config.dest %>/', src: ['scripts/**', 'fonts/**', 'assets/**'], dest: '<%= config.dest %>/<%= config.version.patch %>/' },
                        { expand: true, dot: true, cwd: 'assets/', src: ['**/*.js'], dest: '<%= config.dest %>/assets/' }
                    ]
                }
            }
        }
    }
};
