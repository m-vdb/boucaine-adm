module.exports = function ($scope, Restangular, growl) {
  $scope.value = 1;
  $scope.amount = 10;
  $scope.codes = [[]];

  $scope.generateCodes = function () {
    _.times($scope.amount, createCode);
  };

  $scope.reset = function () {
    $scope.codes = [[]];
  };

  function createCode () {
    $scope.reset();
    var data = {number: $scope.value, type: 'pizza'};
    Restangular.all("codes").post(data).then(function (obj) {
      appendToCodes(obj);
      console.log(obj);
    }, function () {
      growl.error("Une erreur inconnue s'est produite.");
    });
  };

  function appendToCodes(code) {
    if ($scope.codes[$scope.codes.length - 1].length == 4) {
      $scope.codes.push([]);
    }
    $scope.codes[$scope.codes.length - 1].push(code);
  }

};
