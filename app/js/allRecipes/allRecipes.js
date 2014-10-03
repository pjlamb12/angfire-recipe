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
.controller('AllRecipesController', function($scope, $modal, FBURL, Firebase, $firebase, alertService, $rootScope, user, recipeList){
	$scope.curUser = user;
	var basePath = 'user-data/' + $scope.curUser.uid + '/recipes/';
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

	var appetizerType = 'appetizer';
	var soupType = 'soup';
	var saladType = 'salad';
	var entreeType = 'entree';
	var dessertType = 'dessert';
	var drinkType = 'drink';

	//get the counts for all the other recipe types
	$scope.appetizerList = recipeList.getRecipeList(user.uid, appetizerType);
	$scope.appetizerList.typeDisplay = 'Appetizers';
	$scope.appetizerList.type = appetizerType;

	$scope.soupList = recipeList.getRecipeList(user.uid, soupType);
	$scope.soupList.typeDisplay = 'Soups';
	$scope.soupList.type = soupType;

	$scope.saladList = recipeList.getRecipeList(user.uid, saladType);
	$scope.saladList.typeDisplay = 'Salads';
	$scope.saladList.type = saladType;

	$scope.entreeList = recipeList.getRecipeList(user.uid, entreeType);
	$scope.entreeList.typeDisplay = 'Entrees';
	$scope.entreeList.type = entreeType;

	$scope.dessertList = recipeList.getRecipeList(user.uid, dessertType);
	$scope.dessertList.typeDisplay = 'Desserts';
	$scope.dessertList.type = dessertType;

	$scope.drinkList = recipeList.getRecipeList(user.uid, drinkType);
	$scope.drinkList.typeDisplay = 'Drinks';
	$scope.drinkList.type = drinkType;

	//Fix this
	var checkEmpty = function(){
		$scope.allEmpty = ($scope.dessertLength < 1) && 
			($scope.drinkLength < 1) &&
			($scope.appetizerLength < 1) &&
			($scope.soupLength < 1) &&
			($scope.saladLength < 1) &&
			($scope.entreeLength < 1);
	}

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