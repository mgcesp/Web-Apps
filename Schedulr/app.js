angular.module('scheduleApp', ['firebase'])

.controller('mainController', ['$scope', '$firebase', function($scope, $firebase){
	// connect to firebase
	var ref = new Firebase('https://schedulrapp.firebaseio.com');
	console.log('ENTER DONE');
	var usersRef = ref.child("days");
	usersRef.set({ 
		  monday: {
		    name: 'Monday',
		    slots: {
		      0900: {
		        time: '9:00am',
		        booked: false
		      },
		      0110: {
		        time: '11:00am',
		        booked: false
		      }
		    }
		  },
		  tuesday: {
		    name: 'Tuesday',
		    slots: {
		      0900: {
		        time: '9:00am',
		        booked: false
		      },
		      0110: {
		        time: '11:00am',
		        booked: false
		      }
		    }
		  }
		});
		// var syncObject = ref.$asObject(); 
		// syncObject.$bindTo($scope, 'days');
}]);