'use strict';
/**
 * @Developed by Nasser
 * @Controller newCode
 */

var newCodeController = angular.module('SnippingCodeApp');

newCodeController.controller('newCodeController', function($http,$scope, $rootScope ,
												$location, cacheService , CodeTreeService ,$cookieStore) {

	$scope.file = {
		name:'',
		type:'',
		code:'',
		tags:[],
		description:'',
		id : -1
	};

	$scope.filename = {
		exist : false,
		wrong : false,
	};

	
    $scope.loadTags = function(query) {
        return  query;
    };

	var IsEmpty = function(){
		if($rootScope.userInfo.length === 0)$rootScope.userInfo = [];
		if($scope.code === "" || $scope.type === "" || $scope.name === "")
			return 	true;
		return false;
	}

	$scope.onSubmitNewCode = function(){
		
		if(!IsEmpty()){
			
			var user = cacheService.getUser();
			
			var mp = $scope.file.tags;
			var array = [];
			for(var i in mp){
				array.push(mp[i]["text"]);
			}
			
			var uploadReqObj = {
				username : user.username,
				password : user.password,
				name : $scope.file.name,
				type : $scope.file.type,
				code : $scope.file.code,
				description : $scope.file.description,
				tags : array
			};

			var res = CodeTreeService.upload(uploadReqObj);
			
			res.success(function(data){
				$scope.file.id = data;				

				var newObj = {
					id : data,
					name : $scope.file.name,
					type : $scope.file.type,
					code : $scope.file.code,
					description : $scope.file.description,
					tags : array
				};

				$rootScope.userInfo.push(newObj);
				makeFileEmpty();
				$location.absUrl() == 'http://localhost:9000/#/';
				$location.path('Code'); 	
			});
			res.error(function(){
				console.log("error");
				$scope.filename.exist = true;
			});
		}
	};

	var makeFileEmpty = function(){
		$scope.file.name = "";
		$scope.file.type = "";
		$scope.file.code = "";
	};
});

