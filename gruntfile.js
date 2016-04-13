module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    manifest: grunt.file.readJSON('src/manifest.json'),
    pkg: grunt.file.readJSON('package.json'),
    filesBackground: ['src/js/libraries/jquery.js', 'src/js/googletagmanager.js', 'src/js/libraries/jworkflow-min-0.7.0.js', "src/js/functions.js", "src/js/date.extend.js", "src/js/external_common.js","src/js/icons.js","src/js/migrations.js","src/js/googletrack.js","src/js/background.js", "src/js/debug.js"],
    filesCalendar: ['src/js/libraries/jquery.js', 'src/js/googletagmanager.js', 'src/js/libraries/mustache.js', 'src/js/libraries/jworkflow-min-0.7.0.js', 'src/js/libraries/tipped/js/tipped/tipped.unpacked.js', 'src/js/date.extend.js', 'src/js/templates.js', 'src/js/external_common.js', 'src/js/functions.js','src/js/tooltips_tipped.js','src/js/debug.js','src/js/googletrack_toback.js', 'src/js/calendar.js'],
    filesOptions: ['src/js/libraries/jquery.js', 'src/js/googletagmanager.js', 'src/js/libraries/jquery-ui/**/*.js','src/js/date.extend.js', 'src/js/libraries/jworkflow-min-0.7.0.js', 'src/js/external_common.js', 'src/js/functions.js', 'src/js/icons.js',  'src/js/migrations.js', 'src/js/debug.js', 'src/js/googletrack_toback.js', 'src/js/options.js'],
    filesGuide: ['src/userguide/cc_guide.pdf'],
    cssOptions: ['src/css/cssreset.css', 'src/css/options.css'],
    cssCalendar: ['src/css/cssreset.css','src/css/style.css','src/css/style_12.css', 'src/css/colors.css'],
    dirs: {
        src: 'src/',
        dest: '../Builds/<%= manifest.version %>',
        banner: '/*! <%= manifest.name %> <%= manifest.version %>. Built <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
	clean: {
		options: {
			force: true      
		},
		build: {
		    src: ['<%= dirs.dest %>', '../Builds/Latest']
		  }
		},
  uglify: {
    options: {
      mangle: true,
      banner: '<%= dirs.banner %>',
      compress: {
        drop_console: true
      }
    },
    cal: {
      files: {
          '<%= dirs.dest %>/js/calendar_packed.js' : '<%= dirs.dest %>/js/calendar_packed.js'
      }
    },
    opt: {
      files: {
          '<%= dirs.dest %>/js/options_packed.js' : '<%= dirs.dest %>/js/options_packed.js'
      }
   },
   background: {
      files: {
          '<%= dirs.dest %>/js/background_packed.js' : '<%= dirs.dest %>/js/background_packed.js'
      }
   }    
  },
  concat: {
    cal: {
      files: {
          '<%= dirs.dest %>/js/calendar_packed.js' : '<%= filesCalendar %>'
      }
    },
    opt: {
      files: {
          '<%= dirs.dest %>/js/options_packed.js' : '<%= filesOptions %>'
      }
    },
    back: {
      src: '<%= filesBackground %>',
      dest: '<%= dirs.dest %>/js/background_packed.js'
    }
  },
  copy: {
   	copy: {
   		expand: true,
   		cwd: 'src/',
   		src: ['*.html', 'css/*.css','fonts/*', '_locales/en/*.json', 'pics/*', 'manifest.json'],
   		dest: '<%= dirs.dest %>/'
   	},
   	jqueryui_css: {
   		expand: true,
   		cwd: 'src/js/libraries/jquery-ui/css',
   		src: ['**'],
   		dest: '<%= dirs.dest %>/css/jquery-ui/'
   	},
   	tipped_css: {
   		expand: true,
   		cwd: 'src/js/libraries/tipped/css',
   		src: ['**'],
   		dest: '<%= dirs.dest %>/css/tipped/'
   	},
    guide: {
      expand: true,
      cwd: 'src/userguide',
      src: ['**'],
      dest: '<%= dirs.dest %>/'
    },
   	latest: {
   		expand: true,
   		cwd: '<%= dirs.dest %>',
   		src: ['**'],
   		dest: '../Builds/Latest'
   	}
  },
  jshint: {
   check: ['src/js/*.js', 'js/manifest.json', '!src/js/googletrack.js']
  }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify','copy']);
  grunt.registerTask('debug', ['jshint', 'clean', 'concat', 'copy']);

};