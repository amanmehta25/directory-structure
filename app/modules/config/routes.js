'use strict';
/**
 * @ngdoc overview
 * @name directoryStructure:routes
 * @description
 * # routes.js
 *
 * Configure routes for use with Angular
 */
angular
    .module('directoryStructure')
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('master', {
                url: '/',
                controller: 'DirectoryManagement as DirectoryManagement',
                templateUrl: 'modules/directory/main.html'
            });

        $urlRouterProvider.otherwise('/');
        $locationProvider.hashPrefix('');
    });
