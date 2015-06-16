'use strict';
/**
 * @Developed by Nasser
 * @Controller search Controller
 */

var SnippingCodeApp = angular.module('SnippingCodeApp');

SnippingCodeApp.controller('searchController', function($routeParams,SearchService, $rootScope, $scope , $cookieStore ,
										editProfileService,	$http , $route , cacheService , $location) {
	$scope.counter = 0;
	$scope.showData = true; 
	$scope.noDataShow = false;
	$scope.searchString = $routeParams.searchString;

	$scope.prev = function(){
		console.log($scope.counter-1);
		if($scope.counter <= 0)return ;
		var codeRequest = SearchService.search($scope.searchString,$scope.counter-1);
		codeRequest.success(function(data) {
			$scope.noDataShow = false;
			$scope.showData = true;
			for(var i = 0 ; i < data.length ; i++){
				var array = [];
				var obj = data[i].tags;
				while(obj.length){
					var indxdot = obj.indexOf(',');
					array.push(obj.substr(0,indxdot));
					obj = obj.substr(indxdot + 1, obj.length);
				}

				data[i].tags = array;
			}
			$rootScope.userInfo = data;
			$scope.counter -= 1;
		});
		codeRequest.error(function(data) {
			$scope.showData = false;
			$scope.noDataShow = true;
		});
	}

	$scope.next = function(){
		console.log($scope.counter+1);
		var codeRequest = SearchService.search($scope.searchString,$scope.counter+1);
		codeRequest.success(function(data) {
			$scope.noDataShow = false;
			$scope.showData = true;
			for(var i = 0 ; i < data.length ; i++){
				var array = [];
				var obj = data[i].tags;
				while(obj.length){
					var indxdot = obj.indexOf(',');
					array.push(obj.substr(0,indxdot));
					obj = obj.substr(indxdot + 1, obj.length);
				}

				data[i].tags = array;
			}
			$rootScope.userInfo = data;
			$scope.counter += 1;
		});
		codeRequest.error(function(data) {
			$scope.showData = false;
			$scope.noDataShow = true;	
		});
	}

	var getCodes = function(){
		var codeRequest = SearchService.search($scope.searchString,0);
		
		codeRequest.success(function(data) {
			$scope.noDataShow = false;
			$scope.showData = true;
			for(var i = 0 ; i < data.length ; i++){
				var array = [];
				var obj = data[i].tags;
				while(obj.length){
					var indxdot = obj.indexOf(',');
					array.push(obj.substr(0,indxdot));
					obj = obj.substr(indxdot + 1, obj.length);
				}
				data[i].tags = array;
			}
			$rootScope.userInfo = data;
		});
		codeRequest.error(function(data) {
			$scope.showData = false;
			$scope.noDataShow = true;
			console.log("error");
			$rootScope.welcoome();
		});
	}

	var getUser = function(){
				
		var check = cacheService.routingExist();
		if(check === true){

			$rootScope.welcoome();
			$scope.user = cacheService.getUser();
			
			var usrRequest = editProfileService.retreiveProfile($scope.user.username , $scope.user.password);

			usrRequest.success(function(data){
				$scope.user = data;
			});
			usrRequest.error(function(data){
				console.log("error " + data);
				$rootScope.welcoome();
			})
			getCodes();
		}else {
			$rootScope.welcoome();
		}
	}

	getUser();

});
