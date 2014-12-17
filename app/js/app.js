window.$ = require("jquery");
window._ = require("lodash");
require("angular");
require("restangular");
require("angular-ui-router");
require("angular-bootstrap");
require("angular-growl-v2");
require("angular-qr");

var homeController = require('./controllers/home.js');
var printController = require('./controllers/print.js');

var app = angular.module('main', [
  'ui.router',
  'restangular',
  'ui.bootstrap',
  'angular-growl',
  'ja.qr'  // angular-qr
]);

// controllers
app.controller('HomeController', ['$scope', 'Restangular', 'growl', homeController]);
app.controller('PrintController', ['$scope', 'Restangular', 'growl', printController]);

// config
app.config(['RestangularProvider',
  function(RestangularProvider) {
    RestangularProvider.setBaseUrl(__apiRoute);
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
        template: require("./partials/print.html"),
        controller: 'PrintController'
      });
  }
]);

app.config(['growlProvider', function(growlProvider) {
  growlProvider.globalTimeToLive({error: 5000, success: 10000});
  growlProvider.globalPosition('top-right');
  growlProvider.globalDisableCountDown(true);
}]);
