angular.module('myApp.recipes.details',
	[
		'myApp.recipes'
	])
.config(function($stateProvider){
	$stateProvider
		.state('recipes.details',{
			url: '/details/:recipeType/:recipeId',
			templateUrl: 'js/recipes/details/details.html',
			controller: 'DetailsController'
		});
})
.controller('DetailsController', function($scope, syncData, $stateParams){
	$scope.curUser = $scope.auth.user;
	$scope.recipeType = $stateParams.recipeType;
	$scope.recipeId = $stateParams.recipeId;
	console.log("recipe id: ", $scope.recipeId);
	var path = 'user-data/' + $scope.curUser.uid + '/recipes/' + $scope.recipeType + '/' + $scope.recipeId;
	$scope.recipe = syncData(path);
});