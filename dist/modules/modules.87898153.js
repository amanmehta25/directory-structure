"use strict";angular.module("directoryStructure",["ngAnimate","ngRoute","ngSanitize","ngMessages","ui.router"]),angular.module("directoryStructure").config(["$stateProvider","$urlRouterProvider","$locationProvider",function(a,b,c){a.state("master",{url:"/",controller:"DirectoryManagement as DirectoryManagement",templateUrl:"modules/directory/main.html"}),b.otherwise("/"),c.hashPrefix("")}]),angular.module("directoryStructure").controller("DirectoryManagement",["$scope","DirectoryService",function(a,b){function c(b,d){b.forEach(function(b){var e,f=b.path.split("/"),g=1;for(e=0;e<f.length;e++)if(f[e]!==d[e]){g=0;break}f.length===d.length&&a.newDirectory.push(b),g&&c(b.children,d)})}function d(a,b,c){a.forEach(function(a){var e,f=a.path.split("/"),g=1;for(e=0;e<f.length;e++)if(f[e]!==c[e]){g=0;break}f.length===c.length&&g?a.children.push(b):g&&d(a.children,b,c)})}function e(a,b,c){b.forEach(function(b,d){var f,g=b.path.split("/"),h=c.path.split("/"),i=1;for(f=0;f<g.length;f++)if(g[f]!==h[f]){i=0;break}g.length===h.length&&i?a.children.splice(d,1):i&&e(b,b.children,c)})}var f,g;b.getFolders().then(function(b){f=b.data[0],g=f.children,a.currDirectory=angular.copy(g)}),a.create=function(){var b,c=a.currDirectory.length,e={type:"folder",name:"new-"+c,path:(a.currPath?a.currPath:"")+"/new-"+c,children:[]};a.currDirectory.push(e),a.currPath?(b=a.currPath.split("/"),d(g,e,b)):g.push(e)},a.previous=function(){var b=a.currPath.split("/");a.newDirectory=[],c(g,b),b.pop(),a.currPath=b.join("/"),a.currDirectory=angular.copy(a.newDirectory)},a.next=function(b){"folder"===b.type&&(a.currPath=b.path,a.currDirectory=angular.copy(b.children))},a.remove=function(b,c){e(f,g,b),a.currDirectory.splice(c,1)}}]),angular.module("directoryStructure").factory("DirectoryService",["$http",function(a){function b(){return a.get("json/directory.7633d9f8.json")}return{getFolders:b}}]),angular.module("directoryStructure").run(["$templateCache",function(a){a.put("modules/directory/main.html",'<div class="main-container"> <div class="main-container__heading">Directory Structure Implementation</div> <div class="font-size--medium" ng-show="currPath"> <span class="cursor pull-left" ng-click="previous()">&#8592; Back</span> <span class="pull-right">PWD: {{ currPath }}</span> </div> <div class="clear"><div> <div class="font-size--medium" ng-hide="currPath">Root Directory</div> <button class="btn create-new-btn" ng-click="create()">Create New Directory</button> <div class="folder" ng-repeat="folder in currDirectory"> <div class="folder__subfolder" ng-dblclick="next(folder)"> <span class="folder__subfolder-name">{{ folder.name }}</span> <span ng-click="remove(folder, $index)">x</span> </div> </div> </div></div>')}]);
//# sourceMappingURL=modules.87898153.js.map