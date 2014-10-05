angular.module('myApp.addRecipe',
	['myApp',])
.config(function($stateProvider){
	$stateProvider
		.state('addRecipe',{
			url: '/addRecipe',
			templateUrl: 'js/addRecipe/addRecipe.html',
			controller: 'AddRecipeController',
			resolve: {
				user: ['simpleLogin', function(simpleLogin) {
					return simpleLogin.getUser();
				}]
			},
		});
})
.controller('AddRecipeController', function($scope, $state, user, recipeService){
	$scope.recipe = {name: "", ingredients: [], directions: [], type: ""};
	$scope.ingrText = "";
	$scope.directionText = "";

	$scope.addIngredient = function(){
		if( $scope.ingrText !== ""){
			$scope.recipe.ingredients.push({text: $scope.ingrText});
			$scope.ingrText = "";
		}
	}

	$scope.addDirection = function(){
		if( $scope.directionText !== ""){
			$scope.recipe.directions.push({text: $scope.directionText});
			$scope.directionText = "";
		}
	}

	$scope.removeIngr = function($index){
		$scope.recipe.ingredients.splice($index, 1);
	}

	$scope.removeDirection = function($index){
		$scope.recipe.directions.splice($index, 1);
	}

	// add new recipes to the list
	$scope.saveRecipe = function() {
		if( $scope.recipe.name !== "" && ($scope.recipe.ingredients.length > 0 || $scope.recipe.directions.length > 0) && $scope.recipe.type != "") {
			var recipes = recipeService.getRecipeList(user.uid);
			recipes.$add($scope.recipe);
			$state.go('allRecipes');
		}
	};
});