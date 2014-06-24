angular.module('myApp.nested',
	[
		'myApp',
		'myApp.nested.nested1'
	])
.config(function($stateProvider){
	$stateProvider
		.state('nested',{
			abstract: true,
			url: '/nested',
			templateUrl: 'js/nested/nested.html',
			data: {
				authRequired: true
			}
		});
});