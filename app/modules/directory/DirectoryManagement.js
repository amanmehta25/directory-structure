'use strict';

/**
 * @ngdoc function
 * @name directoryStructure.controller:DirectoryManagement
 * @description
 * # MainCtrl
 * Controller of the directoryStructure
 */
angular
    .module('directoryStructure')
    .controller('DirectoryManagement', [
        '$scope', 'DirectoryService',
        function ($scope, DirectoryService) {
            var directoryManagement = this;

            function getDir(dir, path) {
                dir.forEach( function(obj, index) {
                    var a = obj.path.split('/');
                    var i, flag = 1;
                    for(i = 0; i < a.length; i++) {
                        if (a[i] === path[i]) {
                            continue;
                        } else {
                            flag = 0;
                            break;
                        }
                    }
                    if (a.length === path.length) {
                        $scope.newDirectory.push(obj);
                    }
                    if (flag) {
                        getDir(obj.children, path);
                    }
                });
            }

            DirectoryService.getFolders().then(function (response) {
                $scope.directory = response.data;
                $scope.currDirectory = angular.copy($scope.directory);
            });

            $scope.prevDir = function() {
                var path = $scope.currPath.split('/');
                $scope.newDirectory = [];
                getDir($scope.directory, path);
                path.pop();
                $scope.currPath = path.join('/');
                $scope.currDirectory = angular.copy($scope.newDirectory);
            };

            $scope.nextDir = function(folder) {
                if (folder.type === 'folder' && folder.children.length) {
                    $scope.currPath = folder.path;
                    $scope.currDirectory = folder.children;
                } else {
                    console.log('its a ' + folder.type);
                }
            };
        }
    ]);
