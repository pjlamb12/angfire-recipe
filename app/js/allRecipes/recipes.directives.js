angular.module('myApp.allRecipes.directives', ['myApp'])
.directive('recipeList', function(){
	return {
		restrict: 'A',
		require: '^ngModel',
		scope: {
			recipes: '=',
			alertList: '='
		},
		templateUrl: 'js/allRecipes/recipeList.html',
		controller: function($scope, $modal, alertService){
			$scope.deleteRecipe = function(item, name, type){
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
					var alert = {type: "danger", msg: "You successfully deleted your " + name + " recipe."};
					$scope.alertList = alertService.addAlert(alert);
					$scope.alertList = alertService.timeDelete($scope.alertList);
					$scope.recipes.$remove(item);
				});
			}
		}
	}
});
