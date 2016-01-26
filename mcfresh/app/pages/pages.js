angular.module('webApp.pages', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/home', {
		templateUrl: 'pages/home.html',
		controller: 'MainCtrl'
	}).
	when('/services', {
		templateUrl: 'pages/services.html',
		controller: 'ServicesCtrl'
	}).
	when('/projects', {
		templateUrl: 'pages/projects.html',
		controller: 'ProjectsCtrl'
	}).
	when('/team', {
		templateUrl: 'pages/team.html',
		controller: 'TeamCtrl'
	}).
	when('/contact', {
		templateUrl: 'pages/contact.html',
		controller: 'ContactCtrl'
	}).
	otherwise({
		redirectTo: '/home'
	})
}])

.controller('ProjectsCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter){
	$http.get('json/projects.json').success(function(data){
		$scope.projects = data;
	})

	$scope.showProjectDetails = function(project){
		console.log('Getting project details...');
		$scope.showDetails = true;

		var itemId = project.id;
		console.log(itemId);
		$http.get('json/projects.json').success(function(data){
			$scope.project = $filter('filter')(data, function(d){
				return d.id == itemId;
			})[0];
			$scope.mainImage = $scope.project.images[0].name;
		});
		$scope.setImage = function(image){
			$scope.mainImage = image.name;
		}
	}

	$scope.hide = function(){
		$scope.showDetails = false;
	}

	$scope.setImage = function(image){
		$scope.mainImage = image.name;
	}

}])

.controller('MainCtrl', ['$scope', '$http', function($scope){
	console.log('Inside MainCtrl');
}])















