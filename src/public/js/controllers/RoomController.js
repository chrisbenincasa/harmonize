/*global angular: false */

(function() {
    'use strict';

    var harmonize = angular.module('harmonize');

    harmonize.service('RdioPlaybackCallbacks', ['$window', function($window) {
        var registeredCallbacks = {};

        this.registerCallback = function(event, callback) {
            if (!registeredCallbacks[event]) {
                registeredCallbacks[event] = [];
            }

            registeredCallbacks[event].push(callback);
        };

        this.ready = function(user) {
            if (registeredCallbacks['ready']) {
                angular.forEach(registeredCallbacks['ready'], function(value) {
                    if (angular.isFunction(value)) {
                        value.call(this, user);
                    }
                });
            }
        };

        $window.RdioPlaybackCallbacks = this;
    }]);

    harmonize.controller('harmonize.RoomController', ['$scope', 'HarmonizeService', 'HarmonizeWebSocket', 'RdioPlaybackCallbacks',
        function($scope, HarmonizeService, HarmonizeWebSocket, RdioPlaybackCallbacks) {
            $scope.room = {
                playKey: 'a239851',
                playbackToken: $scope.pageData.playbackToken,
                playing: false,
                listener: {},
                socket: new HarmonizeWebSocket(),
                rdioElem: null
            };

            var onReady = function(user) {
                $scope.$apply(function() {
                    $scope.room.rdioElem = angular.element('#apiswf')[0];
                });
            };

            RdioPlaybackCallbacks.registerCallback('ready', onReady);

            $scope.onPlay = function() {
                if ($scope.room.playing) {
                    $scope.room.rdioElem.rdio_play();
                } else {
                    $scope.room.rdioElem.rdio_play($scope.room.playKey);
                    $scope.room.playing = true;
                }
            };

            $scope.onPause = function() {
                $scope.room.rdioElem.rdio_pause();
            };

            $scope.shouldEnable = function() {
                console.log('should enable', $scope.room.rdioElem)
                return $scope.room.rdioElem === null;
            }

            var flashVars = {
                playbackToken: $scope.room.playbackToken,
                domain: window.location.hostname,
                listener: 'RdioPlaybackCallbacks'
            };

            var params = {
                allowScriptAccess: 'always'
            };

            swfobject.embedSWF(
                'http://www.rdio.com/api/swf/',
                'apiswf', 1, 1,
                '9.0.0',
                'expressInstall.swf',
                flashVars,
                params,
                {}
            );

            $scope.room.socket.socket.emit('join_room', {
                room: $scope.pageData.room
            });
    }]);
})();
