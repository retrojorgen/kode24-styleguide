module.exports = function (grunt, pkg){
    return {
        tasks: {
            jsdoc : {
                dist : {
                    src: ['scripts/**/*.js'],
                    options: {
                        destination: '<%= config.dest %>/jsdocs',
                        template: 'templates/jsdoc'
                    }
                }
            }
        }
    }
};