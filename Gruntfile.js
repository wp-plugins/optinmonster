module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
	var date = new Date();
	var fs   = require('fs');
	grunt.initConfig({
		aws: grunt.file.readJSON(fs.realpathSync('../../../../user/aws-keys.json')), // Read the file,
		mkdir: {
			all: {
				options: {
					create: ['dist']
				}
			}
		},
		compress: {
			main: {
				options: {
					archive: 'optin-monster-wp-api.zip'
				},
				expand: true,
				src: [
					'assets/**',
					'OMAPI/**',
					'optin-monster-wp-api.php'
				],
				dest: 'optin-monster-wp-api/'
			}
		},
		rename: {
			main: {
				files: [
					{src: ['optin-monster-wp-api.zip'], dest: 'dist/optin-monster-wp-api.zip'}
				]
			},
			api: {
				files: [
					{src: ['assets/js/api.min.js'], dest: ['assets/js/api.js']}
				]
			}
		},
		aws_s3: {
			options: {
				accessKeyId: '<%= aws.AWSAccessKeyId %>', // Use the variables
				secretAccessKey: '<%= aws.AWSSecretKey %>', // You can also use env variables
				region: '<%= aws.AWSRegion %>',
				uploadConcurrency: 5, // 5 simultaneous uploads
				downloadConcurrency: 5, // 5 simultaneous downloads
				params: {
					CacheControl: '2592000'
				}
			},
			api: {
				options: {
					bucket: 'optin-monster'
				},
				files: [
					{cwd: 'assets/js/', dest: 'app/js/api.min.js', action: 'download'}
				]
			},
			staging_api: {
				options: {
					bucket: 'optin-monster'
				},
				files: [
					{cwd: 'assets/js/', dest: 'staging/js/api.js', action: 'download'}
				]
			},
			staging: {
				options: {
					bucket: 'optin-monster'
				},
				files: [
					{dest: 'api-staging/optin-monster-wp-api.zip', action: 'delete'},
					{src: 'dist/optin-monster-wp-api.zip', dest: 'api-staging', expand: true, flatten: true}
				]
			},
			production: {
				options: {
					bucket: 'optin-monster'
				},
				files: [
					{
						dest: 'api/optin-monster-wp-api.zip',
						action: 'delete'
					},
					{
						src: 'dist/optin-monster-wp-api.zip',  // source files mask
						dest: 'api',    // destination folder
						expand: true,    // allow dynamic building
						flatten: true   // remove all unnecessary nesting
					}
				]
			}
		},
		slack: {
			options: {
				endpoint: 'https://hooks.slack.com/services/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',
				channel: '#dev',
				username: 'archiebot',
				icon_emoji: ':archie:',
				link_names: 1
			},
			newVersion: {
				text: 'A new version of the OptinMonster WordPress API plugin has been pushed to S3.'
			}
		}
	});

	// register at least this one task
	grunt.registerTask('default', 'An empty task', function() {
		grunt.log.error('This is an empty task to keep bad things from happening.');
		return false;
	});

	grunt.registerTask('package', ['aws_s3:api', 'rename:api', 'mkdir', 'compress', 'rename:main', 'aws_s3:production', 'slack:newVersion']);
	grunt.registerTask('staging-api', ['aws_s3:staging_api']);
};