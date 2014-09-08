/*global angular: false */

(function() {
    'use strict';

    var harmonize = angular.module('harmonize', ['ngRoute', 'ui.router']);

    harmonize.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
        function($locationProvider, $stateProvider, $urlRouterProvider) {
            // $locationProvider.html5Mode(true);
            //
            // // All routes that shouldn't reload the page should be registered here
            // $stateProvider.
            //     state('index', {
            //         url: '/'
            //     }).
            //     state('room', {
            //         url: '/room/:roomId',
            //         templateUrl: '/partials/room.html',
            //         controller: 'harmonize.RoomController'
            //     });

            // Anything that needs to actually go off page get caught here
            $urlRouterProvider.otherwise(function($injector, $location) {
                window.location = $location.absUrl();
            });
        }
    ]);
})();
