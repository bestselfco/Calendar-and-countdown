module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    manifest: grunt.file.readJSON('src/manifest.json'),
    pkg: grunt.file.readJSON('package.json'),
    filesbackground: ['src/js/libraries/jworkflow-min-0.7.0.js', "src/js/functions.js", "src/js/date.extend.js", "src/js/external_common.js","src/js/icons.js","src/js/migrations.js","src/js/googletrack.js","src/js/background.js", "src/js/debug.js"],
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
    concat: {
      options: {
        banner: '<%= dirs.banner %>',
        separator: ';'
      },
      jqueryui: {
        src: ['src/js/libraries/jquery-ui/**/*.js'],
        dest: '<%= dirs.dest %>/js/jquery-ui.js'
      },
      cal_common_javascript: {
        src: ['src/js/libraries/jquery.js', 'src/js/libraries/mustache.js', 'src/js/libraries/jworkflow-min-0.7.0.js', 'src/js/libraries/tipped/js/tipped/tipped.unpacked.js', 'src/js/date.extend.js', 'src/js/templates.js', 'src/js/external_common.js', 'src/js/functions.js','src/js/calendar.js','src/js/tooltips_tipped.js','src/js/debug.js', 'src/js/googletrack_toback.js'],
        dest: '<%= dirs.dest %>/js/calendar_common.js'
      },
      options_javascript: {
        src: ['src/js/date.extend.js', 'src/js/libraries/jworkflow-min-0.7.0.js', 'src/js/external_common.js', 'src/js/functions.js', 'src/js/options.js', 'src/js/icons.js',  'src/js/migrations.js', 'src/js/debug.js', 'src/js/libraries/plusone.js', 'src/js/googletrack_toback.js'],
        dest: '<%= dirs.dest %>/js/options_packed.js'
      },
      background_javascript: {
        src: '<%= filesbackground %>',
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
      jquery: {
        src: ['src/js/libraries/jquery.js'],
        dest: '<%= dirs.dest %>/js/jquery.js'
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

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'clean', 'concat', 'copy']);
  
  grunt.registerTask('css', ['copy']);

};