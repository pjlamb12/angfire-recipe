angular.module('myApp.addRecipe',
	['myApp',])
.config(function($stateProvider){
	$stateProvider
		.state('addRecipe',{
			url: '/addRecipe',
			templateUrl: 'js/addRecipe/addRecipe.html',
			controller: 'AddRecipeController',
			data: {
				authRequired: true
			}
		});
})
.controller('AddRecipeController', function($scope, $state){
	$scope.newRecipe = {name: "", ingredients: [], directions: []};
	$scope.ingredients = [];
	$scope.ingrText = "";
	$scope.directionText = "";
	$scope.directions = [];
	$scope.name = "";
	$scope.recipeType = "";

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

	// add new recipes to the list
	$scope.saveRecipe = function() {
		if( $scope.name !== "" && ($scope.ingredients.length > 0 || $scope.directions.length > 0) && $scope.recipeType != "") {
			var recipe = $scope.newRecipe;
			recipe.ingredients = $scope.ingredients;
			recipe.directions = $scope.directions;
			recipe.name = $scope.name;
			$scope.recipes.$add(recipe);
			$scope.ingredients = [];
			$scope.directions = [];
			$scope.name = "";
			$state.go('allRecipes')
		}
	};
});