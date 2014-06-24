'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
  'ngRoute',
  'ui.router',
  'myApp.home',
  'myApp.login',
  'myApp.view1',
  'myApp.view2',
  'myApp.nested',
  'myApp.config',
  'myApp.services',
  'waitForAuth',
  'stateSecurity',
  // 'routeSecurity',
  // 'myApp.filters',
  // 'myApp.directives',
  // 'myApp.controllers'
]);

myApp.run(['$rootScope', '$state', '$stateParams', 'loginService', 'FBURL', 
 function($rootScope, $state, $stateParams, loginService, FBURL){
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
  $rootScope.FBURL = FBURL;
  $rootScope.auth = loginService.init();
}]);

myApp.config(function($urlRouterProvider){
  $urlRouterProvider.otherwise('/');
});

myApp.controller('mainController', function($scope){

});
// config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
//   $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
//   $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
//   $routeProvider.otherwise({redirectTo: '/'});
// }]);
