module.exports = function(grunt) {
    grunt.registerTask('version:major', [
        'semver:dist:bump:major',
        'version:tag'
    ]);

    grunt.registerTask('version:minor', [
        'semver:dist:bump:minor',
        'version:tag'
    ]);

    grunt.registerTask('version:patch', [
        'semver:dist:bump:patch',
        'version:tag'
    ]);

    grunt.registerTask('version:tag', function(){
        var file = grunt.file.readJSON('package.json');

        grunt.config.set('config.version.major', file.version.split('.')[0] + '.x');
        grunt.config.set('config.version.minor', file.version.split('.')[0] + '.' + file.version.split('.')[1] + '.x');
        grunt.config.set('config.version.patch', file.version);

        grunt.task.run('replace:version', 'gitcommit:dist', 'gittag:dist');
    });
};