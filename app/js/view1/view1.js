angular.module('myApp.view1',
	['myApp',])
.config(function($stateProvider){
	$stateProvider
		.state('view1',{
			url: '/view1',
			templateUrl: 'js/view1/view1.html',
			controller: 'View1Controller',
			data: {
				authRequired: true
			}
		});
})
.controller('View1Controller', function($scope, $location){
	$scope.hello = "Hello!";

});