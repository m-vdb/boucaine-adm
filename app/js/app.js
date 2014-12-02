window.$ = require("jquery");
window._ = require("lodash");
require("angular");
require("restangular");
require("angular-ui-router");
require("angular-bootstrap");
require("angular-growl"); // TODO: fork it and make it requireable

var homeController = require('./controllers/home.js');

var app = angular.module('main', [
  'ui.router',
  'restangular',
  'ui.bootstrap',
  'angular-growl'
]);
var api = "http://localhost:8080"; //"http://boucaine-api.herokuapp.com";

// controllers
app.controller('HomeController', ['$scope', 'Restangular', 'growl', homeController]);

// config
app.config(['RestangularProvider',
  function(RestangularProvider) {
    RestangularProvider.setBaseUrl(api);
    RestangularProvider.setDefaultHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
  }
]);

app.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', {
        url: "/",
        template: require("./partials/home.html"),
        controller: 'HomeController'
      })
      .state('print', {
        url: "/imprimer",
        template: require("./partials/print.html")
      });
  }
]);
