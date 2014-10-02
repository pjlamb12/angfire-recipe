angular.module('myApp.allRecipes.directives', ['myApp'])
.directive('recipeList', function(){
	return {
		restrict: 'A',
		require: '^ngModel',
		scope: {
			ngModel: '=',
		},
		templateUrl: 'js/allRecipes/recipeList.html',
		controller: function($scope, $modal){
			$scope.deleteRecipe = function(id, name, type){
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
					// var deletePath = new Firebase(FBURL + basePath + recipeType + '/' + id);
					// var deleteRef = $firebase(deletePath);
					// deleteRef.$remove();
					// var alert = {type: "danger", msg: "You successfully deleted the recipe for: " + name + "."};
					// $scope.alerts = alertService.addAlert(alert);
					// $scope.alerts = alertService.timeDelete($scope.alerts);
					console.log("ngModel List in modalInstance.then: ", ngModel);
				});
			}
		}
	}
});
