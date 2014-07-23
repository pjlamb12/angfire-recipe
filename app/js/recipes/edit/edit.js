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
.controller('EditController', function($scope, syncData, $stateParams){
	$scope.curUser = $scope.auth.user;
	var path = 'user-data/' + $scope.curUser.uid + '/recipes/' + $stateParams.recipeType + '/' + $stateParams.recipeId;
	$scope.recipe = syncData(path);
});