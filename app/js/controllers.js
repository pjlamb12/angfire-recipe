'use strict';

/* Controllers */

angular.module('myApp.controllers', ['firebase'])
   .controller('HomeCtrl', ['$scope', 'syncData', function($scope, syncData) {
	  syncData('syncedValue').$bind($scope, 'syncedValue');
   }])

.controller('AddRecipeCtrl', ['$scope', 'syncData', '$firebase', '$firebaseSimpleLogin', 'FBURL', function($scope, syncData, $firebase, $firebaseSimpleLogin, FBURL){
	$scope.newRecipe = {userId: null, name: "", ingredients: [], directions: []};
	$scope.ingredients = [];
	$scope.ingrText = "";
	$scope.directionText = "";
	$scope.directions = [];
	$scope.name = "";
	$scope.curUser = $scope.auth.user;

	// constrain number of recipes by limit into syncData
	// add the array into $scope.recipes
	$scope.recipes = syncData('recipes', 10);

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
		if( $scope.name !== "" && ($scope.ingredients.length > 0 || $scope.directions.length > 0) ) {
			var recipe = $scope.newRecipe;
			recipe.ingredients = $scope.ingredients;
			recipe.directions = $scope.directions;
			recipe.name = $scope.name;
			recipe.userId = $scope.curUser.id;
			$scope.recipes.$add(recipe);
		}
	};
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

   .controller('AccountCtrl', ['$scope', 'loginService', 'syncData', '$location', function($scope, loginService, syncData, $location) {
	  syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');

	  console.log("auth: ", $scope.auth);

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