'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
	.controller('NavCtrl', ['$scope', 'loginService', function($scope, loginService) {
		$scope.logout = function(){
			loginService.logout();
		}
	}])
;
