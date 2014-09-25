'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
  'ui.router',
  'simpleLogin',
  'myApp.login',
  'myApp.allRecipes',
  'myApp.addRecipe',
  'myApp.recipes',
  'myApp.config',
  'myApp.services',
  'ui.sortable',
  'ui.bootstrap',
  'myApp.controllers'
  // 'routeSecurity',
  // 'myApp.filters',
  // 'myApp.directives',
]);

myApp.run(['$rootScope', '$state', '$stateParams', 'FBURL', 
 function($rootScope, $state, $stateParams, FBURL){
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
  $rootScope.FBURL = FBURL;
  $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams){
    $rootScope.previousState = from;
  });
}]);

myApp.config(function($urlRouterProvider){
  $urlRouterProvider.otherwise('/login');
});

myApp.controller('mainController', function($scope){

});
