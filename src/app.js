(function () {
    'use strict';

    var app = angular.module('app', [
        // Angular Modules
        'ngRoute',
        // Angular-Local-Storage: HTML5 storage, cookies for older browsers.
        'LocalStorageModule'
    ]);
  
    /* 
     * Global App Configuration 
     */

    app.config([
    
        'localStorageServiceProvider',
        '$routeProvider',
        '@config',
        '$locationProvider',
     
        function(localStorageServiceProvider, $routeProvider, config, $locationProvider) {

            localStorageServiceProvider.setPrefix(config.sessionService.storageKey);
            localStorageServiceProvider.setStorageCookieDomain(config.sessionService.cookieDomain);

            $routeProvider

                .when('/', {
                    templateUrl: 'Modules/home/templates/linkCode.html'
                })
                .when('/:linkCode*', {
                    templateUrl: 'Modules/home/templates/linkCode.html'
                })
                .otherwise({
                    redirectTo: '/'
                });

                //$locationProvider.hashPrefix('!');
                //$locationProvider.html5Mode(config.html5Mode);

            //http://localhost:8282/#/linkCode

        }

    ]);


    /* 
     * This cache interceptor is used to make sure the http get calls are pulling new version of files
     * that potentially changed through a get request.
     */
    app.config([
            '$httpProvider', 

            function($httpProvider) {

                $httpProvider.interceptors.push('noCacheInterceptor');

            }]).factory('noCacheInterceptor', function () {
            
                 //initialize get if not there
   
            return {
                
                request: function (config) {

                    // console.log(config.method);
                    // console.log(config.url);
                    if(config.method=='GET'){
                         var separator = config.url.indexOf('?') === -1 ? '?' : '&';
                         config.url = config.url+separator+'noCache=' + new Date().getTime();
                    }

                    return config;
               }
           };
    });

})();
