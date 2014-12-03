module.exports = function ($scope, Restangular, growl) {
  $scope.value = 1;
  $scope.amount = 10;
  $scope.generateCodes = function () {
    console.log("amount", $scope.amount, "value", $scope.value);
  }
};
