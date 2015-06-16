'use strict';

/**
 * @Developed by Nasser
 * @Controller mainController
 */

var SnippingConfig = angular.module('SnippingCodeApp', [ 'ngAnimate', 'ngAria',
		 'ngMessages', 'ngResource', 'ngRoute', 'ngSanitize', 'ngCookies' ,
		'ngTouch', 'ui.router', 'ng-token-auth','ui.ace','ngTagsInput','base64','ab-base64']);

SnippingConfig.config(function($routeProvider, $authProvider, $stateProvider,$httpProvider) {
	$routeProvider.when('/', {
		templateUrl : 'Code/Main/main.html',
		controller : 'MainCtrl'
	}).when('/Contact', {
		templateUrl : 'Code/Contact/contact.html',
		controller : 'ContactController'
	}).when('/Login', {
		templateUrl : 'Code/Login/login.html',
		controller : 'LoginController'
	}).when('/SignUp', {
		templateUrl : 'Code/SignUp/signUp.html',
		controller : 'SignUpController'
	}).when('/Contact', {
		templateUrl : 'Code/Contact/contact.html',
		controller : 'ContactController'
	}).when('/Code', {
		templateUrl : 'Code/CodeTree/CodeTree.html',
		controller : 'CodeTreeController'
	}).when('/Code/addNew', {
		templateUrl : 'Code/CodeTree/addNewCode/addNewCode.html',
		controller : 'newCodeController'
	}).when('/Code/edit/', {
		templateUrl : 'Code/CodeTree/editCode/editCode.html',
		controller : 'editCodeController'
	}).when('/Code/view/', {
		templateUrl : 'Code/CodeTree/viewCode/viewCode.html',
		controller : 'viewCodeController'
	}).when('/search/:searchString', {
		templateUrl : 'Code/Search/search.html',
		controller : 'searchController'
	}).when('/editProfile', {
		templateUrl : 'Code/editProfile/editProfile.html',
		controller : 'editProfileController'
	}).otherwise({
		redirectTo : '/'
	});
});

SnippingConfig.config(function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
	
});



