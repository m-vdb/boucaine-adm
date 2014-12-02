module.exports = function ($scope, Restangular) {
  $scope.verify = function () {
    Restangular.one("codes", $scope.code).post().then(
      function () {
        console.log("success");
      },
      function (xhr) {
        var err = (xhr.data && xhr.data.message) ? xhr.data.message : "Erreur inconnue.";
        console.log(err);
      }
    );
  };
};
