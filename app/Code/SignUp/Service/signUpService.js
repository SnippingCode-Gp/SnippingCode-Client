'use strict';
/**
 * @Developed by Nasser
 * @factory signUpService
 */

var SnippingCodeApp = angular.module("SnippingCodeApp");

SnippingCodeApp.factory('signUpService', function($http) {
	var url = "http://localhost:8080/CodeSnipping/SignUp";
	return {

		signup : function(user) {
			return $http.post(url, user);
		},
	};

});