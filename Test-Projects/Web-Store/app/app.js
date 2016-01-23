'use strict';

// Declare app level module which depends on views, and components
angular.module('appStore', [
  'ngRoute',
  'appStore.view1',
  'appStore.view2',
  'appStore.items'
]).
config(['$routeProvider', function($routeProvider){
  $routeProvider.otherwise({redirectTo: '/items'});
}]);
