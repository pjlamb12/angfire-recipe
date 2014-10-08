'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
	'ui.router',
	'simpleLogin',
	'myApp.login',
	'myApp.allRecipes',
	'myApp.allRecipes.directives',
	'myApp.addRecipe',
	'myApp.recipes',
	'myApp.config',
	'myApp.services',
	'ui.sortable',
	'ui.bootstrap',
	'myApp.controllers',
	'angular-loading-bar'
	// 'routeSecurity',
	// 'myApp.filters',
	// 'myApp.directives',
]);

myApp.run(['$rootScope', '$state', '$stateParams', '$location', 'FBURL', 'simpleLogin', function($rootScope, $state, $stateParams, $location, FBURL, simpleLogin){
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
	$rootScope.FBURL = FBURL;
	$rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams){
		$rootScope.previousState = from;
	});
	$rootScope.$on('$stateChangeStart', function(ev, to, toParams, from, fromParams){
		if(!simpleLogin.isAuthenticated()){
			simpleLogin.login('test@test.com', 'test');
				$state.go('allRecipes');
			// if(to.url !== '/login'){
			// 	ev.preventDefault();
			// 	$state.go('login');
			// }
		} else {
			if(to.url === '/login') {
				ev.preventDefault();
				$state.go('allRecipes');
			}
		}
	});
}]);

myApp.config(function($urlRouterProvider){
	$urlRouterProvider.otherwise('/login');
});

myApp.controller('mainController', function($scope){

});
