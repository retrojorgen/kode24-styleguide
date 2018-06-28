module.exports = function (grunt, pkg){
    return {
        tasks: {
            todo: {
                options:{ },
                src: ['scss/**/*', 'scripts/components/*']
            }
        }
    }
};