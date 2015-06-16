'use strict';
/**
 * @Developed by Nasser
 * @Controller LoginController
 */

var forgetPassCtrl = angular.module('SnippingCodeApp');

forgetPassCtrl.controller('forgetPassCtrl', function($scope, loginservice,$rootScope) {
	
	$scope.email = "";

	$scope.forgetEmail = {
		emailIncorrect:false,
		invalid:false,
		loading :false
	};

	var makeAllForgFalse = function(){
		$scope.email = "";
		$scope.forgetEmail.emailIncorrect = false;
		$scope.forgetEmail.invalid = false;
		$scope.forgetEmail.emailUnExist = false;
		$scope.forgetEmail.loading = false;
	}

	$scope.onSubmitForget = function(){	
		var b1 = $scope.forgetEmail.invalid;
		var b2 = $scope.forgetEmail.emailIncorrect;
		if(b1 === false && b2 === false){
			makeAllForgFalse();
			var res = loginservice.forgetPassword($scope.email);
			$scope.forgetEmail.loading = true;
			res.success(function(){
				$scope.email = "";
				makeAllForgFalse();
				$('#ForgetPassword').modal('hide');
			});

			res.error(function(){
				console.log("error");
				$scope.forgetEmail.loading = false;
				$scope.forgetEmail.emailUnExist = true;
			});
		}
	}

	$scope.validateemail = function(){
		if($scope.email === ""){
			$scope.forgetEmail.invalid = true;
		}else if(!validateWithRegex($scope.email)){
			makeAllForgFalse();
    		$scope.forgetEmail.emailIncorrect = true;
		}else
    		makeAllForgFalse();
	};
	

	function validateWithRegex(email) { 
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	};

	makeAllForgFalse();

});
