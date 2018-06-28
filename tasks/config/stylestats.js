module.exports = function (grunt, pkg){
    return {
        tasks: {
            stylestats: {
                options: {
                    'lowestCohesion': false,
                    'lowestCohesionSelector': false,
                },
                src: ['<%= config.dest %>/stylesheets/app.css']
            }
        }
    }
};