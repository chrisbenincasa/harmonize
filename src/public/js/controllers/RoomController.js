(function() {
    'use strict';

    var harmonize = angular.module('harmonize');

    harmonize.controller('harmonize.RoomController', ['$scope', 'HarmonizeWebSocket', function($scope, HarmonizeWebSocket) {
        var socket = new HarmonizeWebSocket();
        socket.socket.emit('join_room', {
            room: $scope.pageData.room
        });
        
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
