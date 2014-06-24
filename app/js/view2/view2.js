angular.module('myApp.view2',
	['myApp',])
.config(function($stateProvider){
	$stateProvider
		.state('view2',{
			url: '/view2',
			templateUrl: 'js/view2/view2.html',
			controller: 'View2Controller',
			data: {
				authRequired: true
			}
		});
})
.controller('View2Controller', function($scope){
	$scope.hello = "Hello!";

	console.log("View 2");
});