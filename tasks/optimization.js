module.exports = function(grunt) {
    grunt.registerTask('optimization:dev', [

    ]);

    grunt.registerTask('optimization:dist', [
        'replace:critical',
        'replace:ads',
        // 'htmlmin:dist'
    ]);
};
