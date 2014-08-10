'use strict';

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
        build: {
            src: ['build']
        }
    },
    copy: {
        build: {
            cwd: 'src',
            src: ['**'],
            dest: 'build',
            expand: true
        }
    },
    develop: {
      server: {
        file: 'src/app.js'
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      server: {
        files: [
          'src/app.js',
          'src/routes/*.js'
        ],
        tasks: ['develop']
      },
      js: {
        files: ['src/public/js/*.js'],
        options: {
          livereload: reloadPort
        }
      },
      css: {
        files: ['src/public/css/*.css'],
        options: {
          livereload: reloadPort
        }
      },
      jade: {
        files: ['src/views/*.jade'],
        options: {
          livereload: reloadPort
        }
      }
    }

  });

  grunt.config.requires('watch.server.files');
  files = grunt.config('watch.server.files');
  files = grunt.file.expand(files);

  grunt.registerTask('default', ['develop', 'watch']);
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('build', 'Build the project for production', ['clean', 'copy']);
};
