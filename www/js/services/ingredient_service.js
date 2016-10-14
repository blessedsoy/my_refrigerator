
angular
  .module('app', [])
  .service("ingredientService",function($window, $http, $q){
    var ctrl = this
    var url = "http://localhost:3000/api/ingredients/";

  function getIngredients () {
      var url = 'http://localhost:3000/api/ingredients';

      $http.get(url)
        .success(function (ingredients) {
          return $scope.ingredients = ingredients;
        })
        .error(function () {
          console.log('server side error occuerred.')
        })      
    }


});