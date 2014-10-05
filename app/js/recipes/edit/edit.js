angular.module('myApp.recipes.edit',
	[
		'myApp.recipes'
	])
.config(function($stateProvider){
	$stateProvider
		.state('recipes.edit',{
			url: '/edit/:recipe',
			templateUrl: 'js/recipes/edit/edit.html',
			controller: 'EditController',
			resolve: {
				recipe: function(user, $stateParams, recipeService){
					return recipeService.getRecipe(user.uid, stateParams.recipe);
				}
			}
		});
})
.controller('EditController', function($scope, $stateParams, $state, recipe, user){
	$scope.editing = recipe;
	console.log($scope.editing);
	$scope.newRecipe = {ingredients: null, directions: null, name: ''};

	$scope.addIngredient = function(){
		if( $scope.ingrText !== ""){
			$scope.ingredients.push({text: $scope.ingrText});
			$scope.ingrText = "";
		}
	}

	$scope.addDirection = function(){
		if( $scope.directionText !== ""){
			$scope.directions.push({text: $scope.directionText});
			$scope.directionText = "";
		}
	}

	$scope.removeIngr = function($index){
		$scope.ingredients.splice($index, 1);
	}

	$scope.removeDirection = function($index){
		$scope.directions.splice($index, 1);
	}

	$scope.updateRecipe = function(){
		$scope.recipe.$update({ingredients: $scope.ingredients, directions: $scope.directions, name: $scope.name});
		$scope.newRecipe = {ingredients: null, directions: null, name: ''};
		$state.go('allRecipes');
	}
});