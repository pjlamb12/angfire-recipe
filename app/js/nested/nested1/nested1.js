angular.module('myApp.nested.nested1',
	[
		'myApp.nested'
	])
.config(function($stateProvider){
	$stateProvider
		.state('nested.nested1',{
			url: '/nested1',
			templateUrl: 'js/nested/nested1/nested1.html',
			controller: 'Nested1Controller'
		});
})
.controller('Nested1Controller', function($scope){
	$scope.hello = "hello";
});