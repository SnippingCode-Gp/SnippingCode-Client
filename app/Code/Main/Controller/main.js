'use strict';
/**
 * @Developed by Nasser
 * @Controller MainCtrl
 */

var MainCtrl = angular.module('SnippingCodeApp');

MainCtrl.controller('MainCtrl', function($scope, $cookieStore , 
										 cacheService , $rootScope) {
	$scope.user.guest = true;
	$scope.user.rule = false;
	$scope.welcomeMsg = "to Code Snipping";

	$rootScope.onLoad = function(){
		var check = cacheService.routingExist();
		if(check === false){
			$scope.user.guest = true;
			$scope.user.rule = false;
		}else {
			$scope.welcomeMsg = cacheService.getUser().username;
			$scope.user.guest = false;
			$scope.user.rule = true;
		}
		$rootScope.welcoome();
	}
	$rootScope.onLoad();
});
