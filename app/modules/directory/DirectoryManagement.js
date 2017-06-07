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

            var directory, childDirectory;

            function previousDirectory(directory, path) {
                directory.forEach(function(subDir) {
                    var a = subDir.path.split('/'), i, flag = 1;
                    for (i = 0; i < a.length; i++) {
                        if (a[i] === path[i]) {
                            continue;
                        } else {
                            flag = 0;
                            break;
                        }
                    }
                    if (a.length === path.length) {
                        $scope.newDirectory.push(subDir);
                    }
                    if (flag) {
                        previousDirectory(subDir.children, path);
                    }
                });
            }

            function createDirectory(directory, newDirectory, path) {
                directory.forEach(function(subDir) {
                    var a = subDir.path.split('/'), i, flag = 1;
                    for (i = 0; i < a.length; i++) {
                        if (a[i] === path[i]) {
                            continue;
                        } else {
                            flag = 0;
                            break;
                        }
                    }
                    if (a.length === path.length && flag) {
                        subDir.children.push(newDirectory);
                    } else if (flag) {
                        createDirectory(subDir.children, newDirectory, path);
                    }
                });
            }

            function removeDirectory(directory, childDirectory, folder) {
                childDirectory.forEach(function(subDir, index) {
                    var a = subDir.path.split('/'),
                        path = folder.path.split('/'),
                        flag = 1,
                        i;
                    for (i = 0; i < a.length; i++) {
                        if (a[i] === path[i]) {
                            continue;
                        } else {
                            flag = 0;
                            break;
                        }
                    }
                    if (a.length === path.length && flag) {
                        directory.children.splice(index, 1);
                    } else if (flag) {
                        removeDirectory(subDir, subDir.children, folder);
                    }
                });
            }

            DirectoryService.getFolders().then(function (response) {
                directory = response.data[0];
                childDirectory = directory.children;
                $scope.currDirectory = angular.copy(childDirectory);
            });

            $scope.create = function() {
                var length = $scope.currDirectory.length,
                    newDirectory = {
                        type: 'folder',
                        name: 'new-' + length,
                        path: ($scope.currPath ? $scope.currPath : '') + '/new-' + length,
                        children: []
                    },
                    path;

                $scope.currDirectory.push(newDirectory);

                if (!$scope.currPath) {
                    childDirectory.push(newDirectory);
                } else {
                    path = $scope.currPath.split('/');
                    createDirectory(childDirectory, newDirectory, path);
                }
            };

            $scope.previous = function() {
                var path = $scope.currPath.split('/');
                $scope.newDirectory = [];
                previousDirectory(childDirectory, path);
                path.pop();
                $scope.currPath = path.join('/');
                $scope.currDirectory = angular.copy($scope.newDirectory);
            };

            $scope.next = function(folder) {
                if (folder.type === 'folder') {
                    $scope.currPath = folder.path;
                    $scope.currDirectory = angular.copy(folder.children);
                }
            };

            $scope.remove = function(folder, index) {
                removeDirectory(directory, childDirectory, folder);
                $scope.currDirectory.splice(index, 1);
            };
        }
    ]);
