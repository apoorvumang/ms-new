'use strict';

/* Filters */

angular.module('myApp.filters', []).
    filter('interpolate', ['version', function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }]).
    filter('printableDate', function () {
        return function (date) {
            date = new Date(date);
            var mS = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            var printableDate = date.getDate() + " " + mS[date.getMonth()] + " " + date.getFullYear();
            return printableDate;
        };
    }).
    filter('printableSex', function () {
        return function (sex) {
            if (sex == "M")
                return "Male";
            else if (sex == "F")
                return "Female";
            else
                return sex;
        };
    }).
    filter('prettyJson', function () {
        return function (json) {
            return JSON.stringify(json, null, "\t");
        };
    }).
    filter('addressFormat', function () {
        return function (address) {
            //var arr = address.split(",");
            //var result = "";
            //for(var i = 0; i < arr.length; ++i) {
            //    result = result + arr[i] + "\n";
            //}
            if (address)
                return address.replace(/ *, */g, '\n');
            else
                return address;
        };
    }).
    filter('tel', function () {
        return function (tel) {
            if (!tel) {
                return '';
            }

            var value = tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            var country, city, number;

            switch (value.length) {
                case 10: // (+)########### -> +91 ##########
                    country = 91;
                    number = value;
                    break;

                case 11: // (+)C########## -> +C ##########
                    if (value[0] == "0")
                        country = 91;
                    else
                        country = value[0];
                    number = value.slice(1);
                    break;

                case 12: // (+) CC ########## -> +CC ##########
                    country = value.slice(0, 2);
                    number = value.slice(2);
                    break;

                default:
                    return tel;
            }

            return "+" + country + " " + number.trim();
        };
    });
