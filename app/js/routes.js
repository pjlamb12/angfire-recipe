"use strict";

angular.module('myApp.routes', ['ngRoute'])

	// configure views; the authRequired parameter is used for specifying pages
	// which should only be available while logged in
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/home', {
			authRequired: true, // must authenticate before viewing this page
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		});

		$routeProvider.when('/myRecipes', {
			authRequired: true, // must authenticate before viewing this page
			templateUrl: 'partials/myRecipes.html',
			controller: 'MyRecipeCtrl'
		});

		$routeProvider.when('/addRecipe', {
			authRequired: true, // must authenticate before viewing this page
			templateUrl: 'partials/addRecipe.html',
			controller: 'AddRecipeCtrl'
		});

		$routeProvider.when('/account', {
			authRequired: true, // must authenticate before viewing this page
			templateUrl: 'partials/account.html',
			controller: 'AccountCtrl'
		});

		$routeProvider.when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'LoginCtrl'
		});

		$routeProvider.otherwise({redirectTo: '/home'});
	}]);