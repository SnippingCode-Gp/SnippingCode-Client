'use strict';
/**
 * @Developed by Nasser
 * @factory loginservice
 */

var SnippingCodeApp = angular.module("SnippingCodeApp");

SnippingCodeApp.factory('SearchService', function($http , cacheService) {
	var url = "http://localhost:8080/CodeSnipping/Code/getCode";
	return {
		search : function( searchString , number ) {
			var newurl =url+ "/{" + number.toString() + "}";
			var requestObj = {
				username : cacheService.getUser().username,
				password : cacheService.getUser().password,
				search 	 : searchString
			}
			return $http.post(newurl , requestObj);
		}
	};
});
