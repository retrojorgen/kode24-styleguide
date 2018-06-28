module.exports = function(grunt, pkg){
    return {
        tasks: {
            sass: {
                dev: {
                    options: { sourceMap: true, outputStyle: 'compressed', imagePath: '', includePaths: ['bower_components/foundation/scss'] },
                    files: {
                        '<%= config.dest %>/stylesheets/app.css': 'scss/app.scss',
                        '<%= config.dest %>/stylesheets/amp.css': 'scss/amp.scss',
                        '<%= config.dest %>/stylesheets/critical.css': 'scss/critical.scss',
                        '<%= config.dest %>/stylesheets/ie-fallback.css': 'scss/ie-fallback.scss'
                    }
                },
                
                styleguide: {
                    options: { sourceMap: true, outputStyle: 'compressed', imagePath: '', includePaths: ['bower_components/foundation/scss'] },
                    files: {
                        '<%= config.dest %>/stylesheets/styleguide.css': 'scss/styleguide.scss'
                    }
                }
            }
        }
    };
};