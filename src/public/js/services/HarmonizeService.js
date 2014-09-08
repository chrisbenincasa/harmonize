/*global angular: false */

(function() {
    'use strict';

    angular.module('harmonize').service('HarmonizeService', ['$q', '$http', function($q, $http) {
        this.something = function something() {
            console.log('this');
        };
    }]);
})();
