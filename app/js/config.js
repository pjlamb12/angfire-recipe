'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp.config', [])

	// version of this seed app is compatible with angularFire 0.6
	// see tags for other versions: https://github.com/firebase/angularFire-seed/tags
	.constant('version', '0.6')

	// your Firebase URL goes here
	.constant('FBURL', 'https://lamb-recipe-book.firebaseio.com/')

	.constant('loginStateName', 'login')

	.constant('alreadyLoggedInStateName', 'home')

/*********************
 * !!FOR E2E TESTING!!
 *
 * Must enable email/password logins and manually create
 * the test user before the e2e tests will pass
 *
 * user: test@test.com
 * pass: test123
 */