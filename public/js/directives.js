'use strict';

/* Directives */


angular.module('myApp.directives', []).
    directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]).
    directive('displayPatient', [function () {
        return {
            restrict: 'E',
            templateUrl: 'patient/displayPatient'
        };
    }]).
    directive('editPatient', [function () {
        return {
            restrict: 'E',
            templateUrl: 'patient/editPatient'
        };
    }]);
