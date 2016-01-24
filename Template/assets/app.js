var app = angular.module('computer',['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/main', {
		templateUrl: 'main.html',
		controller: 'MainController'
	}).
	when('/about', {
		templateUrl: 'about.html',
		controller: 'MainController'
	}).
	when('/services', {
		templateUrl: 'services.html',
		controller: 'ServicesController'
	}).
	when('/contact', {
		templateUrl: 'contact.html',
		controller: 'ContactController'
	}).
	when('/projects', {
		templateUrl: 'projects.html',
		controller: 'ProjectsController'
	}).
	otherwise({redirectTo:'/main'})
}])

.controller('MainController', ['$scope', '$http', function($scope, $http){
	$http.get('services.json').then(function(response){
		$scope.services = response.data;
		// console.log(response.data);
	});
}])

.controller('ProjectsController', ['$scope', '$http', function($scope, $http){
	$http.get('projects.json').then(function(response){
		$scope.projects = response.data;
		console.log(response.data);
	});
}])

.controller('ServicesController', ['$scope', '$http', function($scope, $http){
	$http.get('services.json').then(function(response){
		$scope.services = response.data;
		// console.log(response.data);
	});
}])

.controller('ContactController', ['$scope', '$http', function($scope, $http){
	$http.get('locations.json').then(function(response){
		$scope.locations = response.data;
		// console.log(response.data);
	});
}]);





















