'use strict';
/**
 * @Developed by Nasser
 * @Controller editProfileController
 */

var editProfileController = angular.module('SnippingCodeApp');

editProfileController.controller('editProfileController', 
								function($scope , editProfileService , $location ,
										 $cookieStore , cacheService) {
	
	$scope.user;
	
	$scope.Auth = {
		errorEmailFormat : false,
		emailAlreadyExist : false,
		server : false,
		passNotMatch : false,
		passwordShort : false,
		realPassword : false
	};
	
	var getProfile = function(){
		var check = cacheService.routingExist();
		if(check === true){
			$scope.user = cacheService.getUser();
			var res = editProfileService.retreiveProfile($scope.user.username , $scope.user.password);

			res.success(function(response){
				$scope.user = response;
			});

			res.error(function(response){
				cacheService.routingExist();
			});
		}
	}

	getProfile();
	
	var makeAllFalse = function(){
		$scope.Auth.errorEmailFormat = false;
		$scope.Auth.emailAlreadyExist = false;
		$scope.Auth.passwordShort = false;
		$scope.Auth.server = false;
	};

	$scope.editSubmit = function(){

		var res = editProfileService.editUser($scope.user);

		res.success(function(response){
			$scope.user = response;
			$location.absUrl() == 'http://localhost:9000/#/';
    		$location.path('/CodeTree');
		});

		res.error(function(response){
			if(response === null){
				makeAllFalse();
   				$scope.Auth.server = true;
			}else if(response.string === "user name already exist"){
				makeAllFalse();
				$scope.Auth.usernameAlreadyExist = true;
			}else if(response.string === "email already exist"){
				makeAllFalse();
				$scope.Auth.emailAlreadyExist = true;
			}
		});
	}

	$scope.changePassword = function(){
		$('#EditPass').modal('show');
	}

	$scope.validateusername = function(){
		var l = $scope.user.username.length; 
		if(l < 3 && l > 0)
			$scope.Auth.shortUsername = true;
		else
			$scope.Auth.shortUsername = false;
	};
	
	$scope.validateemail = function(){
    	if(!validateWithRegex($scope.user.email) && $scope.user.email !== "")
    		$scope.Auth.errorEmailFormat = true;
    	else
    		$scope.Auth.errorEmailFormat = false;
	};

	function validateWithRegex(email) { 
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	};
});