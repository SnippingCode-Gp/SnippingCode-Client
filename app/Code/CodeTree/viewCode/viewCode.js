'use strict';
/**
 * @Developed by Nasser
 * @Controller newCode
 */

var viewCodeController = angular.module('SnippingCodeApp');

viewCodeController.controller('viewCodeController', function($scope, $rootScope , 
														cacheService , $location ,
														CodeTreeService , $routeParams) {
	$scope.file;
	$scope.comments = [];
	var getCodeEdit = function(){
		$scope.file = $rootScope.codeItem;

		if($rootScope.codeItem === undefined){
			$location.absUrl() == 'http://localhost:9000/#/';
			$location.path('Code'); 	
		}
		var commentRequestObject = {
			username : cacheService.getUser().username,
			password : cacheService.getUser().password,
			codeName : $scope.file.name ,
		}
		var res = CodeTreeService.getComment(commentRequestObject,1);
		res.success(function(response){
			$scope.comments = response;
		});
		res.error(function(){

		});
	}

	$scope.addComment = function(){
		console.log($scope.comments);
		var commentRequestObject = {
			username : cacheService.getUser().username,
			password : cacheService.getUser().password,
			codeName : $scope.file.name ,
			description : $scope.comment
		}
		var res = CodeTreeService.newComment(commentRequestObject);
		res.success(function(response){
			var obj = {
				codeName : commentRequestObject.codeName,
				username : commentRequestObject.username,
				description  : commentRequestObject.description
			};
			$scope.comments.push(obj);
		});
		res.error(function(response){

		});
	}

	getCodeEdit();
});

