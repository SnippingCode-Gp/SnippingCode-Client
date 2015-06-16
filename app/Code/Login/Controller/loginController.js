'use strict';
/**
 * @Developed by Nasser
 * @Controller LoginController
 */

var LoginCtrl = angular.module('SnippingCodeApp');

LoginCtrl.controller('LoginController', function($scope, loginservice ,
												 $location , $cookieStore ,
												 cacheService) {
	
	$scope.user = { username:'', password:'' };

    $scope.loginusername ={ shortWord:false, invalid:false };	

	$scope.loginpassword = { shortWord:false, invalid:false };

	$scope.loginService = { server:false };
	$scope.loginloading = false;

	var makeitFalse = function(){
		$scope.loginloading = false;

		$scope.loginusername.shortWord = false;
		$scope.loginusername.invalid= false;

		$scope.loginpassword.shortWord = false;
		$scope.loginpassword.invalid = false;

		$scope.loginService.server = false;
	};

	var onLoad = function(){
		var check = cacheService.checkFoundCache();
		if(check === true){			
			$location.absUrl() == 'http://localhost:9000/#/';
			$location.path(''); 	
		}
	}

	onLoad();
	
	makeitFalse();

	$scope.login = function() {
		
		var loginReqobject = {
			username : $scope.user.username,
			password : $scope.user.password
		};

		var res = loginservice.signIn(loginReqobject);
		$scope.loginloading = true;
		res.success(function(response) {
			makeitFalse();
			cacheService.saveIntoCahce($scope.user);
			$location.absUrl() == 'http://localhost:9000/#/';
			$location.path(''); 	
		});

		res.error(function(response) {
			if(response === null){
				makeitFalse();
				$scope.loginService.server = true;
			}else if(response.string === "password wrong"){
				makeitFalse();
				$scope.loginpassword.invalid=true;
			}else if(response.string === "user not Found"){
				makeitFalse();
				$scope.loginusername.invalid = true;
			}else {
				makeitFalse();
				$scope.loginService.server = true;
			}
		});
	};

	$scope.validatePassword = function(){
    	var l = $scope.user.password.length;
    	if(l > 0 && l < 3)
    		$scope.loginpassword.shortWord = true;
    	else 
    		$scope.loginpassword.shortWord = false;
    };

    $scope.validateusername = function(){
    	var l = $scope.user.username.length;
    	if(l > 0 && l < 3)
    		$scope.loginusername.shortWord = true;
    	else 
    		$scope.loginusername.shortWord = false;
    };
    
    $scope.forgetPassword = function(){
		$('#ForgetPassword').modal('show');
    }

});
