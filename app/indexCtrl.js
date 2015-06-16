'use strict';
/**
 * @Developed by Nasser
 * @Controller IndexCtrl
 */

var SnippingCodeApp = angular.module('SnippingCodeApp');

SnippingCodeApp.controller('IndexCtrl', function($rootScope, $scope  , $cookieStore , 
											$http , $route , cacheService , $location) {

	$scope.searchName = "";

	$scope.menu = {
		home : true,
		login : true,
		about : true,
		contact : true,
		signUp : false,
		codeTree : false
	};

	$scope.search = function(searchName){
		$scope.searchName = "";
		$location.absUrl() == 'http://localhost:9000/#/';
		$location.path('search/'+searchName); 
	};

	$rootScope.welcoome = function() {
		if (cacheService.checkFoundCache() === false || cacheService.routingExist() === false) {
			$scope.menu.home = true;
			$scope.menu.login = true;
			$scope.menu.about = true;
			$scope.menu.contact = true;
			$scope.menu.editProfile = false;
			$scope.menu.signUp = false;
			$scope.menu.codeTree = false;
		}else {
			$scope.menu.home = true;
			$scope.menu.login = false;
			$scope.menu.about = false;
			$scope.menu.contact = false;
			$scope.menu.editProfile = true;
			$scope.menu.signUp = true;
			$scope.menu.codeTree = true;
		}
	};

	$rootScope.welcoome();

	$scope.signUp = function(){
		cacheService.remove();
		$rootScope.welcoome();
		$location.absUrl() == 'http://localhost:9000/#/';
		$location.path(''); 	
		$rootScope.onLoad();
	}
});
