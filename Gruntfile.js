module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ["dist"],

    copy: {
      src_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['**/*', '!**/*.js', '!**/*.scss'],
        dest: 'dist'
      },
      readme: {
        expand: true,
        src: ['README.md'],
        dest: 'dist',
      },
    },

    watch: {
      rebuild_all: {
        files: ['src/**/*', 'plugin.json', 'readme.md'],
        tasks: ['default'],
        options: {spawn: false}
      },
    },

    babel: {
      options: {
        sourceMap: true,
        presets:  ["es2015"],
        plugins: ['transform-es2015-modules-systemjs', "transform-es2015-for-of"],
      },
      dist: {
        files: [{
          cwd: 'src',
          expand: true,
          src: ['**/*.js'],
          dest: 'dist',
          ext:'.js'
        }]
      },
    },

  });

  grunt.registerTask('default', [
    'clean',
    'copy:src_to_dist',
    'copy:readme',
    'babel'
  ]);

  grunt.registerTask('release', function() {
    grunt.config('compress.release', {
      options: {
        archive: '<%= pkg.name %>-<%= pkg.version %>.tar.gz',
      },
      expand: true,
      cwd: 'dist',
      src: '**/*',
      dest: '<%= pkg.name %>-<%= pkg.version %>/',
    });

    grunt.task.run('default');
    grunt.task.run('compress:release');
  });

};
