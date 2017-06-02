'use strict';
/**
 * @ngdoc services
 * @name merchantApp.services: DirectoryService
 * @description
 * # Directory Service to get the folders
 */

angular
    .module('directoryStructure')
    .factory('DirectoryService', [
        '$http',
        function($http) {

            function getFolders() {
                return $http.get('json/directory.json');
            }

            return {
                getFolders: getFolders
            };
        }
    ]);
