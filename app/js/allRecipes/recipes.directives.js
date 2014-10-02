angular.module('myApp.allRecipes.directives', ['myApp'])
.directive('recipeList', function(){
	return {
		restrict: 'A',
		require: '^ngModel',
		scope: {
			ngModel: '='
		},
		templateUrl: 'js/allRecipes/recipeList.html',
	}
});
