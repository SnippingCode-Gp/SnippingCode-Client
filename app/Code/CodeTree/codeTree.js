'use strict';
/**
 * @Developed by Nasser
 * @Controller CodeTreeController
 */

var CodeTreeController = angular.module('SnippingCodeApp');

CodeTreeController.controller('CodeTreeController', function($scope , $rootScope,
															 $http , CodeTreeService ,
															 $cookieStore , cacheService,
															 $location , editProfileService) {
	
	$rootScope.userInfo = [];
	$scope.counter = 0;
	$scope.user = {	};
	
	$scope.prev = function(){
		if($scope.counter <= 0)return ;
		var codeRequest = CodeTreeService.getFileView($scope.counter-1);
		codeRequest.success(function(data) {
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
		});
	}

	$scope.next = function(){

		var codeRequest = CodeTreeService.getFileView($scope.counter+1);
		codeRequest.success(function(data) {
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
		});
	}

	var getCodes = function(){
		var codeRequest = CodeTreeService.getFileView(0);
		
		codeRequest.success(function(data) {
			console.log(data);
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

	$scope.remove = function(deleteObjReq){
		
		var user = cacheService.getUser();
		
		var res = CodeTreeService.remove(user , deleteObjReq.name);
		res.success(function(data) {
			for(var i = 0 ; i < $rootScope.userInfo.length ; i++){
				if($rootScope.userInfo[i] === deleteObjReq){
					$rootScope.userInfo.splice(i, 1);
					break;
				}
			}
		});
		res.error(function(date) {
			console.log(data);
		});
	}

	$scope.inject = function(item) {
		$rootScope.codeItem = item;
	}
	
});
