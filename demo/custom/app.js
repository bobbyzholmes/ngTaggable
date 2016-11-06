var app = angular.module('app', ['ngTaggable', 'xeditable']);

app.controller('demoCtrl', function($scope){
	//tag array
	$scope.tags = [
		{value: 'app@email.com'},
		{value: 'appd@email.com'},
		{value: 'hdskjfh'}
	];

	//tag array
	$scope.emails = [
		{value: 'other@email.com'}
	];
});