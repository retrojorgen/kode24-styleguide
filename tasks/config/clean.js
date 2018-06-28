module.exports = function (grunt, pkg){
    return {
        tasks: {
            clean: {
                all: ["<%= config.dest %>"],
                docs: ["<%= config.dest %>/docs"],
                jsdocs: ["<%= config.dest %>/jsdocs"],
                assets: ["<%= config.dest %>/assets"],
                stylesheets: ["<%= config.dest %>/stylesheets"],
                scripts: ["<%= config.dest %>/scripts"]
            }
        }
    }
};