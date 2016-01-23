angular.module('appStore.items', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/items', {
			templateUrl: 'items/items.html',
			controller: 'ItemsController'
		}).
		when('/items/:itemId', {
			templateUrl: 'items/item-details.html',
			controller: 'ItemDetailsController'
		})
}])

.controller('ItemsController', ['$scope', '$http', function($scope, $http){
	$http.get('json/items.json').success(function(data){
		$scope.items = data;
	})
}])

.controller('ItemDetailsController', ['$scope', '$http', '$routeParams', '$filter', function($scope, $http, $routeParams, $filter){
	var itemId = $routeParams.itemId;
	console.log(itemId);
	$http.get('json/items.json').success(function(data){
		$scope.item = $filter('filter')(data, function(d){
			return d.id == itemId;
		})[0];
		$scope.mainImage = $scope.item.images[0].name;
	});
	$scope.setImage = function(image){
		$scope.mainImage = image.name;
	}
}]);