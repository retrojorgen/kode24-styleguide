module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-assemble');

    var pkg = grunt.file.readJSON('package.json');
    pkg.config.version = {
        major: pkg.version.split('.')[0] + '.x',
        minor: pkg.version.split('.')[0] + '.' + pkg.version.split('.')[1] + '.x',
        patch: pkg.version
    }

    var configs = require('load-grunt-configs')(grunt, pkg);
    grunt.initConfig(configs);

    grunt.loadTasks('tasks');

    grunt.registerTask('dev', [
        'clean:all',
        'scripts:dev',
        'stylesheets:dev',
        'docs:dev',
        'assets:dev',
        'optimization:dev'
    ]);

    grunt.registerTask('dist', [
        'clean:all',
        'scripts:dist',
        'stylesheets:dist',
        'docs:dist',
        'assets:dist',
        'optimization:dist'
    ]);

    grunt.registerTask('deploy', [
        'dist',
        'publish'
    ]);

    grunt.registerTask('publish', function () {
        var done = this.async();
        grunt.util.spawn({
            cmd: "gsutil",
            args: [
                "-m", // Make it parallel
                "-h", "Cache-Control:max-age=60, must-revalidate, s-maxage=600", // Cache control
                "-h", "X-goog-meta-X-Apps-Cache-Channel: styleguide-dinside", // Cache control
                "rsync", "-r", // Sync the files
                "dist/.", // Folder to sync
                "gs://styleguide.kode24.no" // Bucket name
            ],
            opts: { stdio: 'inherit' },
        }, function () {
            done();
        });
    });

    grunt.registerTask('default', [
        'dev',
        'connect',
        'watch'
    ]);
};
