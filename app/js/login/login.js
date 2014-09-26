angular.module('myApp.login',
	['myApp',])
.config(function($stateProvider){
	$stateProvider
		.state('login',{
			url: '/login',
			templateUrl: 'js/login/login.html',
			controller: 'LoginController',
			resolve: {
				user: ['simpleLogin', function(simpleLogin) {
					return simpleLogin.getUser();
				}]
			},
		});
})
.controller('LoginController', function($scope, $state, user, simpleLogin){
	if(user){
		$state.go('allRecipes');
	}
	$scope.email = null;
	$scope.pass = null;
	$scope.confirm = null;
	$scope.createMode = false;

	$scope.login = function(email, pass) {
		$scope.err = null;
		simpleLogin.login(email, pass).then(function(/* user */) {
			$state.go('allRecipes'); 
		}, function(err) {
			$scope.err = errMessage(err);
		});
	};

	$scope.createAccount = function() {
		$scope.err = null;
		if( assertValidAccountProps() ) {
			simpleLogin.createAccount($scope.email, $scope.pass).then(function(/* user */) {
				$state.go('allRecipes');
			}, function(err) {
				$scope.err = errMessage(err);
			});
		}
	};

	function assertValidAccountProps() {
		if( !$scope.email ) {
			$scope.err = 'Please enter an email address';
		}
		else if( !$scope.pass || !$scope.confirm ) {
			$scope.err = 'Please enter a password';
		}
		else if( $scope.createMode && $scope.pass !== $scope.confirm ) {
			$scope.err = 'Passwords do not match';
		}
		return !$scope.err;
	}

	function errMessage(err) {
		return angular.isObject(err) && err.code? err.code : err + '';
	}
});