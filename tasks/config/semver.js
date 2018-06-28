module.exports = function (grunt, pkg){
    return {
        tasks: {
            semver: {
                options: {
                    space: '  '
                },
                dist: {
                    files: [{
                        src: 'package.json',
                        dest: 'package.json'
                    }]
                }
            }
        }
    }
};