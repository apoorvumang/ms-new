'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]).
  filter('printableDate', function() {
    return function(date) {
      var printableDate = new Date(date);
      return printableDate.toDateString();
    };
  }).
  filter('prettyJson', function() {
    return function(json) {
      return JSON.stringify(json, null, "\t");
    };
  });
