'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
	.controller('NavCtrl', ['$scope', 'simpleLogin', '$state', function($scope, simpleLogin, $state) {
		$scope.logout = function(){
			simpleLogin.logout();
			$state.go('login');
		}
	}])
;
