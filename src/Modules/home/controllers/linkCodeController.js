(function() {
    'use strict';

    const controllerName = 'linkCode';
    const controllerId = 'linkCodeController';

    angular
        .module('app')
        .controller(controllerId, controller);

    controller.$inject = [
        '$http',
        '$routeParams',
        '$window',
        '$timeout',
        'sessionService',
        'logService'
    ];

    function controller($http, $routeParams, $window, $timeout, session, log) {

        var vm = this;
        vm.debugMode = $routeParams.debug;
        vm.lookupDelay = (vm.debugMode) ? 2000 : 0;
        vm.linkCode = $routeParams.linkCode;
        vm.linkUrl = '';
        vm.isError = false;
        vm.status = 'Preparing...';

        function init() {

            log.debug('Link Code = ' + vm.linkCode);

            $timeout(function() {
                getLink();
            }, vm.lookupDelay);

        }

        function getLink() {

            vm.status = 'Searching...';
            vm.isError = false;

            $http({
                method: 'POST',
                url: session.config.serviceUrl + 'cms/' + vm.linkCode
            }).success(function(data) {

                log.debug('Link Response...', data);
                vm.status = 'Success';
                vm.linkUrl = data.Url;
                vm.responseStr = JSON.stringify(data);

                // Did we find the link code?
                vm.isError = (!vm.linkUrl);

                // Are we going to redirect?
                if ((!vm.debugMode) && (!vm.isError))
                    $window.location.href = vm.linkUrl;

            }).error(function(error) {

                log.error('Link Error...', error);
                vm.status = 'Error';
                vm.isError = true;
                vm.responseStr = JSON.stringify(error);

            });

        }

        init();
    }    


})();