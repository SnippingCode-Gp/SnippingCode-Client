'use strict';
/**
 * @Developed by Nasser
 * @Controller SignUpController
 */

var signUpPassword = angular.module('SnippingCodeApp');

signUpPassword.controller('SignUpController', function($scope, signUpService,$rootScope,
													  cacheService, $location , $cookieStore) {

	$scope.user = {
		username:'',
		password:'',
		repassword:'',
		email:'',
		name :''
	};

	$scope.signUpUsername={
		shortWord:false,
		alreadyExist:false
	};

	$scope.signUpEmail = {
		errorFormat:false,
		alreadyExist:false
	};
	
	$scope.signUpRePassword = {
		notmatch:false
	};

	$scope.signUpPassword = {
		veryShort:false
	};

	$scope.signUpService = {
		server:false
	};

	$scope.signUpname = {
		notFound:false,
	};

	var makeAllWithfalse = function(){
		$scope.signUpUsername.shortWord = false;
		$scope.signUpUsername.alreadyExist = false;
   		$scope.signUpEmail.errorFormat = false;
   		$scope.signUpEmail.alreadyExist = false;
   		$scope.signUpRePassword.notmatch = false;
   		$scope.signUpPassword.veryShort = false;
   		$scope.signUpService.server = false;
   		$scope.signUpname.notFound = false;
	};

	$scope.formsignup = function() {
		var user = {
			username : $scope.user.username,
			password : $scope.user.password,
			email : $scope.user.email,
			name : $scope.user.name,
		};
		
		var res = signUpService.signup(user);

		res.success(function(response) {
			$cookieStore.put('SnippingCodeApp.username',$scope.user.username);
			$rootScope.access = true;
			cacheService.saveIntoCahce(user);
			$location.absUrl() == 'http://localhost:9000/#/';
    		$location.path('');
    		$rootScope.welcoome();
		});

		res.error(function(response) {
			if(response === null){
				makeAllWithfalse();
   				$scope.signUpService.server = true;
			}else if(response.string === "user name already exist"){
				makeAllWithfalse();
				$scope.signUpUsername.alreadyExist = true;
			}else if(response.string === "email already exist"){
				makeAllWithfalse();
				$scope.signUpEmail.alreadyExist = true;
			}
		});
	};

	$scope.validateusername = function(){
		var l = $scope.user.username.length; 
		if(l < 3 && l > 0)
			$scope.signUpUsername.shortWord = true;
		else
			$scope.signUpUsername.shortWord = false;
	};
	
	$scope.validateemail = function(){
    	if(!validateWithRegex($scope.user.email) && $scope.user.email !== "")
    		$scope.signUpEmail.errorFormat = true;
    	else
    		$scope.signUpEmail.errorFormat = false;
	};
	$scope.validatepass = function(){
		var l = $scope.user.password.length;
		if(l > 0 && l < 3)
    		$scope.signUpPassword.veryShort = true;
    	else
    		$scope.signUpPassword.veryShort = false;
	};

	$scope.validaterepass = function(){
		if($scope.user.password !== $scope.user.repassword)
			$scope.signUpRePassword.notmatch = true;
		else
			$scope.signUpRePassword.notmatch = false;
	};

	function validateWithRegex(email) { 
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	};

});
