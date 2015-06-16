'use strict';
/**
 * @Developed by Nasser
 * @Controller EditPass
 */

var editPassController = angular.module('SnippingCodeApp');

editPassController.controller('editPassController', function($scope,$rootScope,editProfileService , $location) {
	
	$scope.userValidate = {
		pass : '',
		newPass : '',
		newRePass : ''
	};


	$scope.onSubmitNewCode = function(){
		var oldPass = $scope.user.password;
		$scope.user.password = $scope.userValidate.newPass;
		var res = editProfileService.editUser($scope.user);

		res.success(function(response){
			$scope.user.password = $scope.userValidate.newPass;
			$('#EditPass').modal('hide');
		});

		res.error(function(response){
			$scope.user.password = oldPass;
			if(response === null){
				makeAllFalse();
   				$scope.Auth.server = true;
			}
		});
	}

	$scope.validatepass = function(){
		var l = $scope.userValidate.newPass.length;
		if(l > 0 && l < 3)
      		$scope.Auth.passwordShort = true;
      	else
	  		$scope.Auth.passwordShort = false;
	};

	$scope.validateRepass = function(){
		if($scope.userValidate.newPass === $scope.userValidate.newRePass)
      		$scope.Auth.passNotMatch = false;
      	else
	  		$scope.Auth.passNotMatch = true;
	}

	$scope.validateRealpass = function(){
		if($scope.userValidate.pass === $scope.user.password){
			$scope.Auth.realPassword = false;
		}else 
			$scope.Auth.realPassword = true;
	}
});