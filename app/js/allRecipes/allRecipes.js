angular.module('myApp.allRecipes',
	['myApp',])
.config(function($stateProvider){
	$stateProvider
		.state('allRecipes',{
			url: '/allRecipes',
			templateUrl: 'js/allRecipes/allRecipes.html',
			controller: 'AllRecipesController',
			data: {
				authRequired: true
			}
		});
})
.controller('AllRecipesController', function($scope, syncData, $modal, FBURL, Firebase, $firebase, alertService){
	$scope.curUser = $scope.auth.user;
	var basePath = 'user-data/' + $scope.curUser.uid + '/recipes/';
	$scope.alerts = [];

	$scope.appetizerType = 'appetizer';
	$scope.soupType = 'soup';
	$scope.saladType = 'salad';
	$scope.entreeType = 'entree';
	$scope.dessertType = 'dessert';
	$scope.drinkType = 'drink';

	var appetizers = basePath + $scope.appetizerType;
	var soups = basePath + $scope.soupType;
	var salads = basePath + $scope.saladType;
	var entrees = basePath + $scope.entreeType;
	var desserts = basePath + $scope.dessertType;
	var drinks = basePath + $scope.drinkType;


	$scope.appetizerLength = 0;
	$scope.soupLength = 0;
	$scope.saladLength = 0;
	$scope.entreeLength = 0;
	$scope.dessertLength = 0;
	$scope.drinkLength = 0;

	//get the counts for all the other recipe types
	$scope.recipeApps = syncData(appetizers, 10).$on('loaded', function(snap){
		var count = 0;
		angular.forEach(snap, function(item){
			if(item != null || item.value != null){
				count++;
			};
		});
		$scope.appetizerLength = count;
		checkEmpty();
	}).$on('child_added', function(snap){ $scope.appetizerLength++; checkEmpty();}).$on('child_removed', function(snap){ $scope.appetizerLength--;  checkEmpty();});
	$scope.recipeSoups = syncData(soups, 10).$on('loaded', function(snap){
		var count = 0;
		angular.forEach(snap, function(item){
			if(item != null || item.value != null){
				count++;
			};
		});
		$scope.soupLength = count;
		checkEmpty();
	}).$on('child_added', function(snap){ $scope.soupLength++; checkEmpty();}).$on('child_removed', function(snap){ $scope.soupLength--;  checkEmpty();});
	$scope.recipeSalads = syncData(salads, 10).$on('loaded', function(snap){
		var count = 0;
		angular.forEach(snap, function(item){
			if(item != null || item.value != null){
				count++;
			};
		});
		$scope.saladLength = count;
		checkEmpty();
	}).$on('child_added', function(snap){ $scope.saladLength++; checkEmpty();}).$on('child_removed', function(snap){ $scope.saladLength--;  checkEmpty();});
	$scope.recipeEntrees = syncData(entrees, 10).$on('loaded', function(snap){
		var count = 0;
		angular.forEach(snap, function(item){
			if(item != null || item.value != null){
				count++;
			};
		});
		$scope.entreeLength = count;
		checkEmpty();
	}).$on('child_added', function(snap){ $scope.entreeLength++; checkEmpty();}).$on('child_removed', function(snap){ $scope.entreeLength--;  checkEmpty();});
	$scope.recipeDesserts = syncData(desserts, 10).$on('loaded', function(snap){
		var count = 0;
		angular.forEach(snap, function(item){
			if(item != null || item.value != null){
				count++;
			};
		});
		$scope.dessertLength = count;
		checkEmpty();
	}).$on('child_added', function(snap){ $scope.dessertLength++; checkEmpty();}).$on('child_removed', function(snap){ $scope.dessertLength--; checkEmpty();});
	$scope.recipeDrinks = syncData(drinks, 10).$on('loaded', function(snap){
		var count = 0;
		angular.forEach(snap, function(item){
			if(item != null || item.value != null){
				count++;
			};
		});
		$scope.drinkLength = count;
		checkEmpty();
	}).$on('child_added', function(snap){ $scope.drinkLength++; checkEmpty();}).$on('child_removed', function(snap){ $scope.drinkLength--;  checkEmpty();});

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

	$scope.deleteRecipe = function (id, name, recipeType){
		var modalInstance = $modal.open({
			templateUrl: 'js/allRecipes/confirmRecipeDelete.html',
			controller: ConfirmDeleteCtrl,
			resolve: {
				name: function(){
					return name;
				}
			}
		});

		modalInstance.result.then(function(){
			var deletePath = new Firebase(FBURL + basePath + recipeType + '/' + id);
			var deleteRef = $firebase(deletePath);
			deleteRef.$remove();
			var alert = {type: "danger", msg: "You successfully deleted your recipe."};
			console.log(alert);
			$scope.alerts = alertService.addAlert(alert);
			angular.forEach($scope.alerts, function(alert){
				console.log(alert.type);
				console.log(alert.msg);
			});
			$scope.alerts = alertService.timeDelete($scope.alerts);
		});
	};
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