module.exports = function(grunt, pkg){
    return {
        tasks: {
            jasmine : {
                options : {
                    specs : 'spec/scripts/*.js',
                    vendor: [
                        'https://cdnjs.cloudflare.com/ajax/libs/raven.js/1.1.22/raven.min.js',
                        'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js',
                        'https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js',
                        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js'
                    ],
                    page: {
                        viewportSize: {
                            width: 1366,
                            height: 800
                        }
                    }
                },
                src : [
                    '<%= config.dest %>/scripts/app.min.js'
                ]
            }
        }
    }
}