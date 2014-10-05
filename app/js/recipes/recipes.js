angular.module('myApp.recipes',
	[
		'myApp',
		'myApp.recipes.details',
		'myApp.recipes.edit'
	])
.config(function($stateProvider){
	$stateProvider
		.state('recipes',{
			abstract: true,
			url: '/recipes',
			templateUrl: 'js/recipes/recipes.html',
			resolve: {
				user: function(simpleLogin, $stateParams){
					return simpleLogin.getUser();
				}
			}
		});
});