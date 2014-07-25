'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
  'ngRoute',
  'ui.router',
  'myApp.login',
  'myApp.allRecipes',
  'myApp.addRecipe',
  'myApp.recipes',
  'myApp.config',
  'myApp.services',
  'waitForAuth',
  'stateSecurity',
  'ui.sortable',
  'ui.bootstrap',
  'myApp.controllers'
  // 'routeSecurity',
  // 'myApp.filters',
  // 'myApp.directives',
]);

myApp.run(['$rootScope', '$state', '$stateParams', 'loginService', 'FBURL', 
 function($rootScope, $state, $stateParams, loginService, FBURL){
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
  $rootScope.FBURL = FBURL;
  $rootScope.auth = loginService.init();
  $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams){
    $rootScope.previousState = from;
  });
}]);

myApp.config(function($urlRouterProvider){
  $urlRouterProvider.otherwise('/');
});

myApp.controller('mainController', function($scope){

});
