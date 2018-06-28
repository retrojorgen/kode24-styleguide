module.exports = function(grunt) {
    grunt.registerTask('assets:dev', [
        'copy:dev'
    ]);

    grunt.registerTask('assets:dist', [
        'copy:dist',
        'imagemin:dist'
    ]);
};