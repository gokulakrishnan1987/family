agGrid.initialiseAgGridWithAngular1(angular);

var scotchTodo = angular.module('familyApp', ['ngRoute', 'agGrid', 'ui.select', 'ngSanitize']);

scotchTodo.config(function($routeProvider, $locationProvider) {
        $routeProvider
        .when('/family', {
                templateUrl: '/familychart/family.html',
                controller: 'FamilyController'
                // authenticate: true
        })
        .when('/people', {
			templateUrl: '/members/memberslist.html',		
    	})
    	.when('members', {
			templateUrl: '/members/members.html',		
    	})
    	.when('relationships', {
			templateUrl: '/members/relationship.html',		
    	})
        .otherwise({
			redirectTo: '/'
	    });

	    $locationProvider.hashPrefix('');

        $locationProvider.html5Mode(true);
  		//       $locationProvider.html5Mode({
		//   enabled: true,
		//   requireBase: false
		// });
    });

// scotchTodo.config(['$routeProvider',
//   function($routeProvider) {
//     $routeProvider.
//     when('/family', {
// 		templateUrl: '/familychart/family.html',
// 		controller: 'FamilyController'
// 	}).
	// when('/people', {
	// 	templateUrl: '/members/memberslist.html',		
 //    }).
 //    when('/members', {
	// 	templateUrl: '/members/members.html',		
 //    }). 
 //    when('/relationships', {
	// 	templateUrl: '/members/relationship.html',		
 //    }). 
//     otherwise({
// 		redirectTo: '/index.html'
//     });
// }]);

function secondController($scope) {

	$scope.message = 'This is Show orders screen';

};

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all todos and show them
	$http.get('/api/todos')
		.success(function(data) {
			$scope.todos = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createTodo = function() {
		console.log($scope.formData);
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}
