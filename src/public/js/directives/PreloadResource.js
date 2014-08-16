(function() {
    'use scrict';

    angular.module('harmonize').directive('preloadResource', ['$q', function($q) {
        return {
            link: function(scope, element, attrs) {
                // replace with JSON endpoint?
                scope.pageData = JSON.parse(element.text());
                element.remove();
            }
        };
    }]);
})();
