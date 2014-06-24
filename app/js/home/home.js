angular.module('myApp.home',
	['myApp',])
.config(function($stateProvider){
	$stateProvider
		.state('home',{
			url: '/',
			templateUrl: 'js/home/home.html',
			controller: 'HomeController',
			data: {
				authRequired: true
			}
		});
})
.controller('HomeController', function($scope, loginService, $state){
	$scope.hello = "Hello!";

	$scope.logout = function(event){
		loginService.logout();
	}

});