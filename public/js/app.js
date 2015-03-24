'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.controllers', 'myApp.filters', 'myApp.services', 'myApp.directives', 'ngRoute', 'ui.bootstrap.showErrors']).
    config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/view1', {templateUrl: 'partial/1', controller: 'MyCtrl1'});
        $routeProvider.when('/view2', {templateUrl: 'partial/2', controller: 'MyCtrl2'});
        $routeProvider.when('/', {templateUrl: 'dash', controller: 'IndexCtrl'});
        $routeProvider.when('/add-patient', {templateUrl: 'patient/add', controller: 'AddPatientCtrl'});
        $routeProvider.when('/search-patient', {templateUrl: 'patient/search', controller: 'SearchPatientCtrl'});
        $routeProvider.when('/edit-patient/:patientID', {templateUrl: 'patient/edit', controller: 'EditPatientCtrl'});
        $routeProvider.otherwise({redirectTo: '/view1'});
        $locationProvider.html5Mode(true);
    }]);