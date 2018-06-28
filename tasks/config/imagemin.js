module.exports = function (grunt, pkg){
    return {
        tasks: {
            imagemin: {
                dist: {
                    options:{
                        optimizationLevel: 1,
                        progressive: true,
                        interlaced: true
                    },
                    files: [{
                        expand: true,
                        cwd: 'assets/',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: '<%= config.dest %>/assets/'
                    }]
                }
            }
        }
    }
};