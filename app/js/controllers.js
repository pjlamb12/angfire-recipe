'use strict';

/* Controllers */

angular.module('myApp.controllers', ['firebase'])
   .controller('HomeCtrl', ['$scope', 'syncDataLimit', function($scope, syncDataLimit) {
	  syncDataLimit('syncedValue').$bind($scope, 'syncedValue');
   }])

.controller('NavCtrl', ['$scope', 'loginService', function($scope, loginService){
	$scope.logout = function() {
		loginService.logout();
	};

}])

.controller('AddRecipeCtrl', ['$scope', 'syncDataLimit', '$location', function($scope, syncDataLimit, $location){
	$scope.newRecipe = {name: "", ingredients: [], directions: []};
	$scope.ingredients = [];
	$scope.ingrText = "";
	$scope.directionText = "";
	$scope.directions = [];
	$scope.name = "";
	$scope.curUser = $scope.auth.user;
	$scope.recipeType = "";

	$scope.addIngredient = function(){
		if( $scope.ingrText !== ""){
			$scope.ingredients.push({text: $scope.ingrText});
			$scope.ingrText = "";
		}
	}

	$scope.addDirection = function(){
		if( $scope.directionText !== ""){
			$scope.directions.push({text: $scope.directionText});
			$scope.directionText = "";
		}
	}

	$scope.removeIngr = function($index){
		$scope.ingredients.splice($index, 1);
	}

	$scope.removeDirection = function($index){
		$scope.directions.splice($index, 1);
	}

	// add new recipes to the list
	$scope.saveRecipe = function() {
		if( $scope.name !== "" && ($scope.ingredients.length > 0 || $scope.directions.length > 0) && $scope.recipeType != "") {
			var path = 'user-data/' + $scope.curUser.uid + '/recipes/' + $scope.recipeType;
			$scope.recipes = syncDataLimit(path, 10);

			var recipe = $scope.newRecipe;
			recipe.ingredients = $scope.ingredients;
			recipe.directions = $scope.directions;
			recipe.name = $scope.name;
			$scope.recipes.$add(recipe);
			$scope.ingredients = [];
			$scope.directions = [];
			$scope.name = "";
			$location.path('/myRecipes')
		}
	};
}])

.controller('MyRecipeCtrl', ['$scope', 'syncDataLimit', '$modal', 'FBURL', 'Firebase', '$firebase', function($scope, syncDataLimit, $modal, FBURL, Firebase, $firebase){
	$scope.curUser = $scope.auth.user;
	var basePath = 'user-data/' + $scope.curUser.uid + '/recipes/';
	var appetizers = basePath + 'appetizer';
	var soups = basePath + 'soup';
	var salads = basePath + 'salad';
	var entrees = basePath + 'entree';
	var desserts = basePath + 'dessert';
	var drinks = basePath + 'drink';

	//Make the other dessert types
	$scope.dessertType = 'dessert';

	//get the counts for all the other recipe types
	$scope.recipeApps = syncDataLimit(appetizers, 10).$on('value', function(snap){
		var keys = $scope.recipeApps.$getIndex();
		$scope.appetizerLength = keys.length;
	});
	$scope.recipeSoups = syncDataLimit(soups, 10).$on('value', function(snap){
		var keys = $scope.recipeApps.$getIndex();
		$scope.soupLength = keys.length;
	});
	$scope.recipeSalads = syncDataLimit(salads, 10).$on('value', function(snap){
		var keys = $scope.recipeApps.$getIndex();
		$scope.saladLength = keys.length;
	});
	$scope.recipeEntrees = syncDataLimit(entrees, 10).$on('value', function(snap){
		var keys = $scope.recipeApps.$getIndex();
		$scope.entreeLength = keys.length;
	});
	$scope.recipeDesserts = syncDataLimit(desserts, 10).$on('loaded', function(snap){
		var count = 0;
		angular.forEach(snap, function(item){
			if(item != null || item.value != null){
				count++;
			};
		});
		$scope.dessertLength = count;
		console.log("Dessert Length: ", $scope.dessertLength);
		console.log("Dessert Length: ", $scope.dessertLength < 1);
	}).$on('child_added', function(snap){
		$scope.dessertLength++;
	}).$on('child_removed', function(snap){
		$scope.dessertLength--;
	});
	$scope.recipeDrinks = syncDataLimit(drinks, 10).$on('value', function(snap){
		var keys = $scope.recipeApps.$getIndex();
		$scope.drinkLength = keys.length;
	});

	//Fix this
	$scope.allEmpty = ($scope.dessertLength < 1) && 
		($scope.drinkLength < 1) &&
		($scope.appetizerLength < 1) &&
		($scope.soupLength < 1) &&
		($scope.saladLength < 1) &&
		($scope.entreeLength < 1);

	$scope.deleteRecipe = function (id, name, recipeType){
		console.log("Recipe Type: ", recipeType);
		var modalInstance = $modal.open({
			templateUrl: 'partials/confirmRecipeDelete.html',
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
		});
	};

}])

.controller('RecipeDetailCtrl', ['$scope', 'syncData', '$routeParams', function($scope, syncData, $routeParams){
	$scope.curUser = $scope.auth.user;
	$scope.recipeType = $routeParams.recipeType;
	var path = 'user-data/' + $scope.curUser.uid + '/recipes/' + $scope.recipeType + '/' + $routeParams.recipeId;
	$scope.recipe = syncData(path);

}])

.controller('RecipeEditCtrl', ['$scope', 'syncData', '$routeParams', '$location', function($scope, syncData, $routeParams, $location){
	$scope.curUser = $scope.auth.user;
	$scope.newRecipe = {ingredients: null, directions: null, name: ''};
	var path = 'user-data/' + $scope.curUser.uid + '/recipes/' + $routeParams.recipeType + '/' + $routeParams.recipeId;
	$scope.recipe = syncData(path);
	$scope.ingredients = $scope.recipe.ingredients;
	$scope.directions = $scope.recipe.directions;
	$scope.name = $scope.recipe.name;

	$scope.addIngredient = function(){
		if( $scope.ingrText !== ""){
			$scope.ingredients.push({text: $scope.ingrText});
			$scope.ingrText = "";
		}
	}

	$scope.addDirection = function(){
		if( $scope.directionText !== ""){
			$scope.directions.push({text: $scope.directionText});
			$scope.directionText = "";
		}
	}

	$scope.removeIngr = function($index){
		$scope.ingredients.splice($index, 1);
	}

	$scope.removeDirection = function($index){
		$scope.directions.splice($index, 1);
	}

	$scope.updateRecipe = function(){
		$scope.recipe.$update({ingredients: $scope.ingredients, directions: $scope.directions, name: $scope.name});
		$scope.newRecipe = {ingredients: null, directions: null, name: ''};
		$location.path('/myRecipes');
	}

}])

.controller('LoginCtrl', ['$scope', 'loginService', '$location', function($scope, loginService, $location) {
	$scope.email = null;
	$scope.pass = null;
	$scope.confirm = null;
	$scope.createMode = false;

	$scope.login = function(cb) {
		$scope.err = null;
		if( !$scope.email ) {
			$scope.err = 'Please enter an email address';
		}
		else if( !$scope.pass ) {
			$scope.err = 'Please enter a password';
		}
		else {
			loginService.login($scope.email, $scope.pass, function(err, user) {
				$scope.err = err? err + '' : null;
				if( !err ) {
					cb && cb(user);
				}
			});
		}
	};

	$scope.createAccount = function() {
		$scope.err = null;
		if( assertValidLoginAttempt() ) {
			loginService.createAccount($scope.email, $scope.pass, function(err, user) {
				if( err ) {
					$scope.err = err? err + '' : null;
				}
				else {
					// must be logged in before I can write to my profile
					$scope.login(function() {
						loginService.createProfile(user.uid, user.email);
						$location.path('/account');
					});
				}
			});
		}
	};

	function assertValidLoginAttempt() {
		if( !$scope.email ) {
			$scope.err = 'Please enter an email address';
		}
		else if( !$scope.pass ) {
			$scope.err = 'Please enter a password';
		}
		else if( $scope.pass !== $scope.confirm ) {
			$scope.err = 'Passwords do not match';
		}
		return !$scope.err;
	}
}])

.controller('AccountCtrl', ['$scope', 'loginService', 'syncDataLimit', '$location', function($scope, loginService, syncDataLimit, $location) {
	syncDataLimit(['users', $scope.auth.user.uid]).$bind($scope, 'user');

	$scope.logout = function() {
		loginService.logout();
	};

	$scope.oldpass = null;
	$scope.newpass = null;
	$scope.confirm = null;

	$scope.reset = function() {
		$scope.err = null;
		$scope.msg = null;
	};

	$scope.updatePassword = function() {
		$scope.reset();
		loginService.changePassword(buildPwdParms());
	};

	function buildPwdParms() {
		return {
			email: $scope.auth.user.email,
			oldpass: $scope.oldpass,
			newpass: $scope.newpass,
			confirm: $scope.confirm,
			callback: function(err) {
				if( err ) {
					$scope.err = err;
				}
				else {
					$scope.oldpass = null;
					$scope.newpass = null;
					$scope.confirm = null;
					$scope.msg = 'Password updated!';
				}
			}
		}
	}

}]);

var ConfirmDeleteCtrl = function($scope, $modalInstance, name){
	$scope.recipeName = name;

	$scope.ok = function(){
		$modalInstance.close();
	}

	$scope.cancel = function(){
		$modalInstance.dismiss('cancel');
	}
};
