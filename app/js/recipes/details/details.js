angular.module('myApp.recipes.details',
	[
		'myApp.recipes'
	])
.config(function($stateProvider){
	$stateProvider
		.state('recipes.details',{
			url: '/details/:recipe',
			templateUrl: 'js/recipes/details/details.html',
			controller: 'DetailsController',
			resolve: {
				recipe: function(user, recipeService, $stateParams){
					return recipeService.getRecipe(user.uid, $stateParams.recipe)
				}
			}
		});
})
.controller('DetailsController', function($scope, recipe){
	$scope.recipe = recipe;
});