angular.module('myApp.login',
	['myApp',])
.config(function($stateProvider){
	$stateProvider
		.state('login',{
			url: '/login',
			templateUrl: 'js/login/login.html',
			controller: 'LoginController',
			data: {
				authRequired: false
			}
		});
})
.controller('LoginController', function($scope, loginService, $state){
	$scope.hello = "Hello!";
	$scope.email = null;
	$scope.pass = null;
	$scope.confirm = null;
	$scope.createMode = false;

	$scope.login = function(cb){
		$scope.err = null;

		if( !$scope.email){
			$scope.err = 'Please enter an email address';
		}
		else if( !$scope.pass ){
			$scope.err = 'Please enter a password';
		}
		else {
			loginService.login($scope.email, $scope.pass, function(err, user){
				$scope.err = err ? err + '' : null;
				if( !err ){
					cb && cb(user);
					$state.go('home');
				}
			});
		}
	};
});