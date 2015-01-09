module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    doxx: {
      all: {
        src: '.',
        target: 'doc',
        options: {
          title: 'rhq-metrics-middleware',
          ignore: 'Gruntfile.js,node_modules,test'
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
    },
    'gh-pages': {
      options: {
        base: 'doc'
      },
      src: ['**']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-doxx');
  grunt.loadNpmTasks('grunt-gh-pages');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'mochaTest', 'doxx']);

};
