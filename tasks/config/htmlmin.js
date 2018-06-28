module.exports = function (grunt, pkg){
    return {
        tasks: {
            htmlmin: {
                dist: {
                    options:{
                        removeComments: true,
                        collapseWhitespace: true,
                        conservativeCollapse: true,
                        minifyJS: true
                    },
                    files: [{
                        expand: true,
                        cwd: '<%= config.dest %>/',
                        src: ['**/*.html', "!prototypes/amp.html"],
                        dest: '<%= config.dest %>/',
                        rename: function(dest, src){
                            return dest + src;
                        }
                    }]
                }
            }
        }
    }
};