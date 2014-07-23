angular.module('myApp.recipes.edit',
	[
		'myApp.recipes'
	])
.config(function($stateProvider){
	$stateProvider
		.state('recipes.edit',{
			url: '/edit/:recipeType/:recipeId',
			templateUrl: 'js/recipes/edit/edit.html',
			controller: 'EditController'
		});
})
.controller('EditController', function($scope, syncData, $stateParams, $state){
	$scope.curUser = $scope.auth.user;
	$scope.newRecipe = {ingredients: null, directions: null, name: ''};
	var path = 'user-data/' + $scope.curUser.uid + '/recipes/' + $stateParams.recipeType + '/' + $stateParams.recipeId;
	$scope.recipe = syncData(path);
	$scope.ingredients = $scope.recipe.ingredients;
	$scope.directions = $scope.recipe.directions;
	$scope.name = $scope.recipe.name;

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