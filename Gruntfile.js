module.exports = function(grunt) {
    grunt.initConfig({
        protoc: {
            js: {
                proto: ["quoter-proto/common/*.proto"],
                protocPath: "node_modules/protoc/protoc/bin/protoc",
                includes: ["quoter-proto"],
                transpile: [{
                    plugin: "js",
                    output: "import_style=commonjs,binary:model"
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-protoc-plugin');

    grunt.registerTask('default', ['protoc'])
};