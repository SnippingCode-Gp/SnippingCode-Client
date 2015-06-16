'use strict';
/**
 * @Developed by Nasser
 * @Controller editCode
 */

var editCodeController = angular.module('SnippingCodeApp');

editCodeController.controller('editCodeController', function($scope,$rootScope,
												$location,$routeParams , CodeTreeService,$cookieStore) {
	
	$scope.file = {
		name : '',
		type : '',
		code : '',
		id : '',
		username : '',
		password : ''
	};
	
	var oldName;
	var username = $cookieStore.get('SnippingCodeApp.username');
	var password = $cookieStore.get('SnippingCodeApp.password');
	
	$scope.fileAuth = {
		typeWrong : false,
		userNameExist : false,
		server : false,
		code : false
	};

	var copyTwoItem = function(item1 , item2 , check){
		if(item2 === undefined){
			$location.absUrl() == 'http://localhost:9000/#/';
			$location.path('Code'); 	
		}	
		if(check === true)
			oldName = item2.name;
		item1.name = item2.name;
		item1.type = item2.type;
		item1.id = item2.id;
		item1.code = item2.code;
		item1.tags = item2.tags;
		item1.description = item2.description;
		item1.username = item2.username;
	};
	
 	$scope.loadTags = function(query) {
        return  query;
    };

	var makeAllFalse = function(){
		$scope.fileAuth.typeWrong = false;
		$scope.fileAuth.userNameExist = false;
		$scope.fileAuth.server = false;
		$scope.fileAuth.code = false;
	}

	var checkEmpty = function(value){
		if(value === null || value === "")
			return true;
		return false;
	}

	$scope.onSubmitNewCode = function(){
		if(checkEmpty($scope.file.type)){
			makeAllFalse();
			$scope.fileAuth.typeWrong = true;
		}else if (checkEmpty($scope.file.code)){
			makeAllFalse();
			$scope.fileAuth.code = true;
		}else{
			var newFile ;	

			var array = [];
			for(var i in $scope.file.tags){
				array.push($scope.file.tags[i]["text"]);
			}

			var uploadReqObj = {
				username : username,
				password : password,
				name : $scope.file.name,
				id : $scope.file.id,
				type : $scope.file.type,
				code : $scope.file.code,
				description : $scope.file.description,
				tags : array
			};

			var res = CodeTreeService.update(uploadReqObj , oldName);

			res.success(function(){
				// copyTwoItem(newFile , $scope.file , false);
				$location.absUrl() == 'http://localhost:9000/#/';
				$location.path('Code'); 	
			});			
			res.error(function(response){
				if(response === null){
					makeAllFalse();
					$scope.fileAuth.server = true;
				}else{
					makeAllFalse();
					$scope.fileAuth.userNameExist = true;
				}
			});
		}
	};
	copyTwoItem($scope.file , $rootScope.codeItem , true);
});

