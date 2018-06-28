module.exports = function(grunt) {
    grunt.registerTask('test:dev', [
        'jshint',
        'mustache',
        'uglify:dev',
        'jasmine'
    ]);
};