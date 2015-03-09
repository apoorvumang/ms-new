'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj === null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}


/* Controllers */

function AppCtrl($scope, $http) {
    $http({method: 'GET', url: '/api/name'}).
        success(function (data, status, headers, config) {
            $scope.name = data.name;
        }).
        error(function (data, status, headers, config) {
            $scope.name = 'Error!';
        });
}

function MyCtrl1($scope) {
    $scope.message = "asd";
    console.log($scope.message);
}
MyCtrl1.$inject = ['$scope'];

function MyCtrl2() {
}
MyCtrl2.$inject = [];

function AddPatientCtrl() {
}
AddPatientCtrl.$inject = [];

function EditPatientCtrl($scope, $http, $routeParams) {
    $scope.editPatient = false;
    $scope.toggleEditing = function () {
        $scope.editPatient = true;
    };
    $http({method: 'GET', url: '/api/patient/' + $routeParams['patientID']}).
        success(function (data, status, headers, config) {
            $scope.patient = data;
            $scope.patient.siblings = [];
            $http({method: 'GET', url: '/api/patient/siblings/' + $routeParams['patientID']}).
                success(function (data, status, headers, config) {
                    $scope.patient.siblings = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.patient.siblings = [];
                });
        }).
        error(function (data, status, headers, config) {
            $scope.patient = {};
        });
}
EditPatientCtrl.$inject = ['$scope', '$http', '$routeParams'];

function SearchPatientCtrl($scope, $http) {
    $scope.patient = {};
    $scope.patientList = [];
    $scope.fieldList = [
        {name: "id", displayName: "ID"},
        {name: "name", displayName: "Name"},
        {name: "dob", displayName: "DOB"},
        {name: "sex", displayName: "Sex"},
        {name: "phone", displayName: "Phone"}
    ];
    $scope.orderByField = 'id';
    $scope.reverseSort = false;
    $scope.defaultSMSMessage = "Dear parent,\nWishing your child %name% a very Happy Birthday!\nDr. Mahima\n981129950";
    $scope.smsMessage = $scope.defaultSMSMessage;
    $scope.smsSuccess = false;
    $scope.numSMSSuccess = 0;
    $scope.smsFailed = false;

    var processData = function (pList) {
        for (var i = 0; i < pList.length; i++) {
            pList[i].sms = false;
        }
        return pList;
    };

    $scope.searchByID = function (patientId) {
        $http({method: 'GET', url: '/api/patient/' + patientId}).
            success(function (data, status, headers, config) {
                if (!isEmpty(data))
                    $scope.patientList = processData([data]);
            }).
            error(function (data, status, headers, config) {
                $scope.patientList = [];
            });
    };

    $scope.searchByDOB = function (dob) {
        $http({method: 'GET', url: '/api/patient/dob/' + dob}).
            success(function (data, status, headers, config) {
                $scope.patientList = processData(data);
            }).
            error(function (data, status, headers, config) {
                $scope.patientList = [];
            });
    };

    $scope.searchByName = function (name) {
        $http({method: 'GET', url: '/api/patient/name/' + name}).
            success(function (data, status, headers, config) {
                $scope.patientList = processData(data);
            }).
            error(function (data, status, headers, config) {
                $scope.patientList = [];
            });
    };

    $scope.changeOrdering = function (field) {
        $scope.orderByField = field.name;
        $scope.reverseSort = !$scope.reverseSort;
    };

    $scope.toggleAllSMS = function () {
        for (var i = 0; i < $scope.patientList.length; i++) {
            $scope.patientList[i].sms = !$scope.patientList[i].sms;
        }
    };

    $scope.deselectAllSMS = function () {
        for (var i = 0; i < $scope.patientList.length; i++) {
            $scope.patientList[i].sms = false;
        }
    };

    $scope.sendSMS = function (smsMessage) {
        var smsList = [];
        for (var i = 0; i < $scope.patientList.length; i++) {
            if ($scope.patientList[i].sms === true)
                smsList.push({id: $scope.patientList[i].id, phone: $scope.patientList[i].phone});
        }
        $http.post('/api/patient/sms', {message: smsMessage, smsList: smsList}).
            success(function (data, status, headers, config) {
                $scope.smsSuccess = true;
                $scope.smsFailed = false;
                $scope.numSMSSuccess = data.numSent;
            }).
            error(function (data, status, headers, config) {
                $scope.smsSuccess = false;
                $scope.smsFailed = true;
            });
    };

    $scope.getSelectedLength = function () {
        var numSelected = 0;
        for (var i = 0; i < $scope.patientList.length; i++) {
            if ($scope.patientList[i].sms === true)
                numSelected++;
        }
        return numSelected;
    };

    $scope.resetSMSMessage = function () {
        $scope.smsMessage = $scope.defaultSMSMessage;
    };

    $scope.pretty = function () {
        return JSON.stringify($scope.patientList, undefined, 2, 2);
    };
}
SearchPatientCtrl.$inject = ['$scope', '$http'];

function IndexCtrl() {
}
IndexCtrl.$inject = [];