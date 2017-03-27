'use strict';

(function() {
	
	angular
		.module('familyApp')
		.controller('MembersController', MembersController)		
		.controller('MembersListController', MembersListController)
		.controller('RelationshipController', RelationshipController);

	function RelationshipController($scope, $http, $location) {
		$scope.formData = {};
		$scope.formData.member1 = ["Emil", "Tobias", "Linus"];

		$scope.createMember = function() {
		
			console.log($scope.formData);
			// $http.post('/api/members', $scope.formData)
			// 	.success(function(data) {
			// 		$scope.formData = {}; 
			// 		$scope.members = data;					
			// 	})
			// 	.error(function(data) {
			// 		console.log('Error: ' + data);
			// 	});
		};

		$scope.getMembers = function(){

			$scope.productLevels.selected = {};
			
			$http.get('/api/members')
				.success(function(data) {
					$scope.productCategoryLevels=data;
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}

	}

	function MembersController($scope, $http, $location) {

		$scope.formData = {};		
		$scope.memeberId = $location.search().id;
		
		$scope.createMember = function() {
		
			$http.post('/api/members', $scope.formData)
				.success(function(data) {
					$scope.formData = {}; 
					$scope.members = data;					
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		};

		$scope.updateMember = function() {
		
			$http.put('/api/members/'+$scope.memeberId, $scope.formData)
				.success(function(data) {
					$scope.formData = {}; 
					$scope.members = data;					
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		};

		$scope.selectMember = function() {

			if ($scope.memeberId != undefined)
			{
				$http.get('/api/member_data?id='+$scope.memeberId)
					.success(function(data) {
						$scope.formData.name = data.name;
						$scope.formData.gender = data.gender;
						$scope.formData.age = data.age;
					})
					.error(function(data) {
						console.log('Error: ' + data);
					});	
			}

		}

		$scope.selectMember();

	};

	function MembersListController($scope, $http, $window) {

		$scope.gridOptions = {};

		$scope.getMembersList = function() {
		
			$http.get('/api/members')
				.success(function(data) {

					console.log(data);
					$scope.ageCellRendererFunc = function(params) {
					    var eSpan = document.createElement('button');
					    console.log(params);
					    eSpan.innerHTML = 'Del';
					    eSpan.addEventListener('click', function () {
					        
					        $http.delete('/api/members/'+params.value)
								.success(function(data) {
									alert(params.value);
								})
								.error(function(data) {
									console.log('Error: ' + data);
								});
					    });
					    return eSpan;
					}

					$scope.ageCellRendererEditFunc = function(params) {
					    var eSpan = document.createElement('button');
					    console.log(params);
					    eSpan.innerHTML = 'Del';
					    eSpan.addEventListener('click', function () {					    	
					    	$window.location.href = '#/members?id='+params.value;					    	
					    });
					    return eSpan;
					}
						
					var columnDefs = [{headerName: "Name", field: "name"},
							        {headerName: "Gender", field: "gender"},
	        						{headerName: "Age", field: "age"},
	        						{headerName: "Delete", field: "delete", cellRenderer: $scope.ageCellRendererFunc},
	        						{headerName: "delete", field: "delete", cellRenderer: $scope.ageCellRendererEditFunc}];	

    				var rowData = [];

    	 			angular.forEach(data, function(value, key){
           				rowData.push({name: value.name,
           							 gender: value.gender,
           							 age: value.age,
           							 delete: value._id});
         			});
         			
    				$scope.gridOptions.api.setColumnDefs(columnDefs);
    				$scope.gridOptions.api.setRowData(rowData);
				    //$scope.gridOptions.columnApi.autoSizeColumns(columnDefs);    
            	})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		};

		$scope.getMembersList();

	};

})();
