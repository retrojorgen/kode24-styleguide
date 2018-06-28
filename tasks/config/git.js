module.exports = function (grunt, pkg){
    return {
        tasks: {
            gitcommit: {
                dist: {
                    options: {
                        message: '<%= config.version.patch %>',
                    },
                    files: {
                        src: ['package.json', 'scripts/config/prod.js']
                    }
                }
            },

            gittag: {
                dist: {
                    options: {
                        tag: 'v<%= config.version.patch %>',
                        message: '<%= config.version.patch %>'
                    }
                }
            }
        }
    }
};