module.exports = function(grunt) {
    grunt.registerTask('scripts:dev', [
        'jshint',
        'mustache',
        'uglify:dev',
        'uglify:styleguide'
    ]);

    grunt.registerTask('scripts:dist', [
        'jshint',
        'mustache',
        'uglify:dist',
        'uglify:styleguide',
        'replace:ads'
    ]);
};
