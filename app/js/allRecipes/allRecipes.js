angular.module('myApp.allRecipes',
	['myApp',])
.config(function($stateProvider){
	$stateProvider
		.state('allRecipes',{
			url: '/allRecipes',
			templateUrl: 'js/allRecipes/allRecipes.html',
			controller: 'AllRecipesController',
			resolve: {
				user: ['simpleLogin', function(simpleLogin) {
					return simpleLogin.getUser();
				}]
			},
		});
})
.controller('AllRecipesController', function($scope, $modal, alertService, $rootScope, user, recipeService){

	$scope.alerts = [];
	if($rootScope.previousState.name == 'addRecipe'){
		var alert = {type: "success", msg: "You successfully added a new recipe!"};
		$scope.alerts = alertService.addAlert(alert);
		$scope.alerts = alertService.timeDelete($scope.alerts);
	} else if ($rootScope.previousState.name == 'recipes.edit'){
		var alert = {type: "success", msg: "You successfully edited a recipe!"};
		$scope.alerts = alertService.addAlert(alert);
		$scope.alerts = alertService.timeDelete($scope.alerts);
	}

	//get the counts for all the other recipe types
	$scope.recipes = recipeService.getRecipeList(user.uid);

	$scope.deleteAlert = function(){
		$scope.alerts = alertService.deleteAlert($scope.alerts);
	}

});

var ConfirmDeleteCtrl = function($scope, $modalInstance, name){
	$scope.recipeName = name;

	$scope.ok = function(){
		$modalInstance.close();
	}

	$scope.cancel = function(){
		$modalInstance.dismiss('cancel');
	}
};