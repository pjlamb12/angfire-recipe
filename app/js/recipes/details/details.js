angular.module('myApp.recipes.details',
	[
		'myApp.recipes'
	])
.config(function($stateProvider){
	$stateProvider
		.state('recipes.details',{
			url: '/details/:recipeId',
			templateUrl: 'js/recipes/details/details.html',
			controller: 'DetailsController',
			resolve: {
				recipe: function(recipeService, $stateParams){
					return recipeService.getRecipe(user.uid, $stateParams.recipeId)
				}
			}
		});
})
.controller('DetailsController', function($scope){

});