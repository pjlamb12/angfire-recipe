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
					return recipeService.getRecipe(user.uid, $stateParams.recipe);
				}
			}
		});
})
.controller('EditController', function($scope, $state, user, recipe){
	$scope.editing = recipe;
	$scope.newRecipe = {ingredients: null, directions: null, name: ''};

	$scope.addIngredient = function(){
		if( $scope.ingrText !== ""){
			$scope.editing.ingredients.push({text: $scope.ingrText});
			$scope.ingrText = "";
		}
	}

	$scope.addDirection = function(){
		if( $scope.directionText !== ""){
			$scope.editing.directions.push({text: $scope.directionText});
			$scope.directionText = "";
		}
	}

	$scope.removeIngr = function($index){
		$scope.editing.ingredients.splice($index, 1);
	}

	$scope.removeDirection = function($index){
		$scope.editing.directions.splice($index, 1);
	}

	$scope.updateRecipe = function(){
		recipe.ingredients = $scope.editing.ingredients;
		recipe.directions = $scope.editing.directions;
		recipe.name = $scope.editing.name;
		recipe.type = $scope.editing.type;
		recipe.$save().then(function(ref){
			$state.go('allRecipes');
		});
	}
});