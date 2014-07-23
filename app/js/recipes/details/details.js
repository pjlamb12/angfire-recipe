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
	var path = 'user-data/' + $scope.curUser.uid + '/recipes/' + $stateParams.recipeType + '/' + $stateParams.recipeId;
	$scope.recipe = syncData(path);
});