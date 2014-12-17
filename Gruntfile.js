module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    docco: {
      debug: {
        src: ['index.js'],
        options: {
          output: 'doc/',
          layout: 'classic'
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'test-results.txt',
        },
        src: ['test/**/*.js']
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'index.js', 'test/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-docco');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'mochaTest', 'docco']);

};
