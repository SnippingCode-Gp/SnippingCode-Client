'use strict';
/**
 * @Developed by Nasser
 * @factory editProfileService
 */

var SnippingCodeApp = angular.module("SnippingCodeApp");

SnippingCodeApp.factory('editProfileService', function($http) {
	var BASIC_URL = "http://localhost:8080/CodeSnipping/profile";
	return {

		editUser : function(user) {	
			var url = BASIC_URL + "/editUser";
			console.log(url);
			return $http.post(url, user);
		},
		retreiveProfile : function(username , password){
			var user = {
				username : username,
				password : password
			};
			var url = BASIC_URL + "/getUser";
			return $http.post(url, user);	
		}
	};

});