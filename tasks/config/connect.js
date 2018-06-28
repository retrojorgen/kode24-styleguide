module.exports = function (grunt, pkg){
    return {
        tasks: {
            connect: {
                server: {
                    options: {
                        port: 8080,
                        base: './<%= config.dest %>',
                        livereload: false,
                        open: 'http://localhost:8080/index.html'
                    }
                }
            }
        }
    }
};
