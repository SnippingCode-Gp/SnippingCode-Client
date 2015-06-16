'use strict';
/**
 * @Developed by Nasser
 * @factory Code Service
 */

var CodeTreeService = angular.module("SnippingCodeApp");

CodeTreeService.factory('CodeTreeService', function($http , cacheService) {
	var BASICURL = "http://localhost:8080/CodeSnipping/File";
	return {
		getCode : function (name){
			var url = BASICURL + "/getFile/"+name;

			var validationObject = {
				username : cacheService.getUser().username,
				password : cacheService.getUser().password
			}
			return $http.post(url, validationObject);
		},
		getFileView : function(number) {
			var url = BASICURL + "/view/"+number;
			var eclipse = {
				username : cacheService.getUser().username,
				password : cacheService.getUser().password,
			}
			return $http.post(url, eclipse);
		},
		remove : function(deleteObjReq , name){
			var url = BASICURL + "/delete/{"+name+"}";
			return $http.post(url , deleteObjReq);
		},
		upload : function(code) {
			var url = BASICURL + "/upload";
			return $http.post(url, code);
		},
		update : function(updateReqObject , oldName){
			var url = BASICURL + "/update/"+oldName;
			return $http.post(url , updateReqObject);
		},
		retreiveProfile : function(username , password){
			var url = "http://localhost:8080/CodeSnipping/profile" + "/getUser";
			var user = {
				username : username,
				password : password
			};
			return $http.post(url, user);
		},
		newComment : function(commentRequestObject){
			var url = "http://localhost:8080/CodeSnipping/Comment/newComment";
			return $http.post(url, commentRequestObject);
		},
		getComment : function(commentRequestObject , number){
			var url = "http://localhost:8080/CodeSnipping/Comment/getComments/{"+number+"}";
			return $http.post(url, commentRequestObject);
		}
	};
});
