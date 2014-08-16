(function() {
    'use strict';

    angular.module('harmonize').factory('HarmonizeWebSocket', function() {
        return function() {

            return {
                socket: io()
            };
        };
    });
})();
