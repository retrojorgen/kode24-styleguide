module.exports = function(grunt) {
    grunt.registerTask('stylesheets:dev', [
        'sass:dev',
        'sass:styleguide'
    ]);

    grunt.registerTask('stylesheets:dist', [
        'sass:dev',
        'sass:styleguide',
        'autoprefixer',
        'csssplit'
    ]);
};