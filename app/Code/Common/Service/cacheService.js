'use strict';
/**
 * @Developed by Nasser
 * @factory cahceService
 */
var cacheService = angular.module("SnippingCodeApp");

cacheService.factory('cacheService', function( $location , $cookieStore , loginservice) {
	return {
		saveIntoCahce : function(user){
			$cookieStore.put('SnippingCodeApp.username' , user.username);	
			$cookieStore.put('SnippingCodeApp.password' , user.password);
		},

		checkFoundCache : function(){
			var user = {
				username : $cookieStore.get('SnippingCodeApp.username'),
				password : $cookieStore.get('SnippingCodeApp.password')
			}
			if(user.username === undefined || user.password === undefined){
				return false;
			}
			return true;
		},

		routingExist : function(){
			var user = {
				username : $cookieStore.get('SnippingCodeApp.username'),
				password : $cookieStore.get('SnippingCodeApp.password')
			}
			if(user.username === undefined || user.password === undefined){
				$location.absUrl() == 'http://localhost:9000/#/';
				$location.path(''); 
				return false;
			}
			var response = loginservice.signIn(user);
			response.error(function(response){ 
				$location.absUrl() == 'http://localhost:9000/#/';
				$location.path(''); 			
			});
			return true;
		},

		getUser : function(){
			var user = {
				username : $cookieStore.get('SnippingCodeApp.username'),
				password : $cookieStore.get('SnippingCodeApp.password')
			}
			return user;
		}

		,loginExist : function(user){
			var loginReqobject = {
				username : user.username,
				password : user.password
			};

			var response = loginservice.signIn(loginReqobject);
			var res = false;
			response.success(function(response) { res = true; });
			response.error(function(response){ res = false; });
			return res;
		}

		,remove : function(){
			$cookieStore.remove('SnippingCodeApp.username');
			$cookieStore.remove('SnippingCodeApp.password');
		}
	};
});

