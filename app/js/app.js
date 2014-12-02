window.$ = require("jquery");
window._ = require("lodash");
require("angular");
require("restangular");
require("angular-ui-router");
require("angular-bootstrap");


var app = angular.module('main', [
  'ui.router',
  'restangular',
  'ui.bootstrap'
]);


app.config(['RestangularProvider',
  function(RestangularProvider) {
    RestangularProvider.setRequestSuffix('/');
  }
]);

app.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', {
        url: "/",
        template: require("./partials/home.html")
      })
      .state('print', {
        url: "/imprimer",
        template: require("./partials/print.html")
      });
  }
]);
