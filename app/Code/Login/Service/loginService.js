'use strict';
/**
 * @Developed by Nasser
 * @factory loginservice
 */

var SnippingCodeApp = angular.module("SnippingCodeApp");

SnippingCodeApp.factory('loginservice', function($http) {
	var BasicUrl = "http://localhost:8080/CodeSnipping/registration";
	return {

		signIn : function(loginReqobject) {
			var url = BasicUrl + "/login";
			return $http.post(url, loginReqobject);
		},forgetPassword : function(email){
			var url = BasicUrl + "/forgetPassword";
			return $http.post(url , email);
		}
	};
});