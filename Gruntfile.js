module.exports = function(grunt) {
  'use strict';

  // These plugins provide necessary tasks
  require('load-grunt-tasks')(grunt);
  
  // Project configuration
  grunt.initConfig({
    // Metadata
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: 'index*.html',
      options: {
        dest: '_dist',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['_dist/index*.html'],
      css: ['_dist/css/{,*/}*.css'],
      options: {
        assetsDirs: ['_dist']
      }
    },

    clean: {
      dist: {
        files: [{
          src: [
            '.tmp',
            '_dist/*'
          ]
        }]
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true
      },
      all: ['Gruntfile.js', 'js/**/*.js']
    },

    concat: {
      options: {
      },
      dist: {
        src: [
          'js/polyfills.js',
          'js/svg4everybody.min.js',
          'js/cookies.js',
          'js/scripts.js',
          'js/fel.js'
        ],
        dest: '_dist/js/scripts.js'
      },
    },

    uglify: {
      dist: {
        src: ['_dist/js/scripts.js'],
        dest: '_dist/js/scripts.js'
      }
    },
    
    watch: {
      css: {
        files: 'sass/**/*.scss',
        tasks: ['sass', 'postcss']
      },
      html: {
        files: 'template/**/*.html',
        tasks: ['includes']
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: "none"
        },
        files: {
          'css/screen.css': 'sass/screen.scss'
        }
      }
    },
    postcss: {
      options: {
        map: false, // inline sourcemaps
        processors: [
          require('autoprefixer')({browsers: ['last 4 version', 'ie 8', 'ie 9']}), // add vendor prefixes
        ]
      },
      dist: {
        src: 'css/screen.css',
        dest: 'css/screen.css'
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css', '!*.min.css'],
          dest: 'css',
          ext: '.min.css'
        }]
      }
    },

    copy: {
      dist: {
        files: [
          // makes all src relative to cwd
          {
            expand: true,
            cwd: '',
            src: [
              '*.html',
              'css/**/*',
              'img/**/*',
              'js/**/*'
            ],
            dest: '_dist/'}
        ],
      },
      stage: {
        files: [
          // makes all src relative to cwd
          {
            expand: true,
            cwd: '_dist/',
            src: [
              '**/*'
            ],
            dest: '/volumes/clienti/hasbro/nerfarena/'}
        ],
      },
    },

    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          '_dist/index.html': '_dist/index.html'     // 'destination': 'source'
        }
      }
    },

    svgstore: {
      options: {
        prefix : '', // This will prefix each ID
        svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
          xmlns: 'http://www.w3.org/2000/svg'
        },
        includedemo: true
      },
      default : {
        files: {
          'img/sprite.svg': ['_wip/svgs/*.svg'],
        }
      }
    },

    includes: {
      files: {
        src: ['template/*.html'], // Source files
        dest: '', // Destination directory
        flatten: true,
        cwd: '',
        options: {
          silent: true
        }
      }
    },

    svg2png: {
      all: {
        // specify files in array format with multiple src-dest mapping 
        files: [
            // rasterize all SVG files in "img" and its subdirectories to "img/png" 
            {
              cwd: '_wip/svgs/',
              src: ['**/*.svg'],
              dest: 'img/decos/' }
        ]
      }
    }

  });

  // Default task
  grunt.registerTask('default', ['sass', 'postcss']);

  grunt.registerTask('build', [
    'clean:dist',
    'includes',
    'useminPrepare',
    'sass',
    'postcss',
    'copy:dist',
    'concat',
    'uglify',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('stage', [
    'build',
    'copy:stage'
  ]);
};
