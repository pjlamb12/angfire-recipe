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
			data: {
				authRequired: true
			}
		});
});