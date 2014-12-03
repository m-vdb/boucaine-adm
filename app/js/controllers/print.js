module.exports = function ($scope, Restangular, growl) {
  $scope.value = 1;
  $scope.amount = 10;
  $scope.codes = [];

  $scope.generateCodes = function () {
    _.times($scope.amount, createCode);
  };

  function createCode () {
    var data = {number: $scope.value, type: 'pizza'};
    Restangular.all("codes").post(data).then(function (obj) {
      $scope.codes.push(obj);
      console.log(obj);
    }, function () {
      growl.error("Une erreur inconnue s'est produite.");
    });
  };
};
