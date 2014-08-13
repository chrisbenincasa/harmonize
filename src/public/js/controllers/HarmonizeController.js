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

    harmonize.controller('harmonize.RoomController', ['$scope', function($scope) {
        console.log('room controller')
        var playbackToken = '1234';
        var flashVars = {
            playbackToken: playbackToken,
            domain: window.location.hostname,
            listener: 'Harmonize'
            // enableLogging: 1
        };

        var params = {
            allowScriptAccess: 'always'
        };

        var attributes = {};

        swfobject.embedSWF(
            'http://www.rdio.com/api/swf/',
            'apiswf', 1, 1,
            '9.0.0',
            'expressInstall.swf',
            flashVars,
            params,
            attributes);
    }]);
})();
