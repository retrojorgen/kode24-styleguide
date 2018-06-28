module.exports = function (grunt, pkg){
    return {
        tasks: {
            jshint: {
                all: ['scripts/**/*.js']
            }
        }
    }
};