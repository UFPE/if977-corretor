angular.module('if977App',['ngRoute']);

angular.module('if977App').config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "app/views/criterios.html",
        controller: "i0Ctrl"
    }).when("/i0", {
        templateUrl : "app/views/i0.html",
        controller: "i0Ctrl"
    });
});
