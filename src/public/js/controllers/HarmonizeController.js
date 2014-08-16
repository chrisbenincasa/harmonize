(function() {
    'use strict';

    var harmonize = angular.module('harmonize');

    harmonize.controller('harmonize.MainController', ['$scope', function($scope) {
        console.log('main');
    }]);

    harmonize.controller('harmonize.HarmonizeController', ['$scope', '$rootScope', function($scope, $rootScope) {
        $scope.Harmonize = {};

        $scope.Harmonize.socket = io();

        $scope.Harmonize.socket.on('connect', function() {
            console.log('connected')
        });
    }]);
})();
