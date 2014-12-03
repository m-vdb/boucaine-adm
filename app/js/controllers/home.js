module.exports = function ($scope, Restangular, growl) {
  $scope.verify = function () {
    Restangular.one("codes", $scope.code).post().then(
      function () {
        growl.success("Code valide !");
      },
      function (xhr) {
        var err = (xhr.data && xhr.data.message) ? xhr.data.message : "Erreur inconnue.";
        growl.error(err);
      }
    );
  };
};
