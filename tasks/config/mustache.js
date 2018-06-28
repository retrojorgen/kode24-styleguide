module.exports = function (grunt, pkg){
    return {
        tasks: {
            mustache: {
                app: {
                    src: [
                        'templates/partials/global-account.mustache',
                        'templates/partials/global-login.mustache',
                        'templates/partials/global-small-navigation.mustache',
                        'templates/partials/alert.mustache',
                        'templates/partials/loader.mustache',
                        'templates/partials/chart-*.mustache'
                    ],
                    dest: '<%= config.dest %>/scripts/appTemplates.min.js',
                    options: {
                        prefix: 'db.templates = ',
                        postfix: ';',
                        verbose: true
                    }
                },
                core: {
                    src: [
                        'templates/partials/global-small-navigation.mustache',
                        'templates/partials/loader.mustache'
                    ],
                    dest: '<%= config.dest %>/scripts/coreTemplates.min.js',
                    options: {
                        prefix: 'db.templates = ',
                        postfix: ';',
                        verbose: true
                    }
                }
            }
        }
    }
};