

function HomeService($http) {
	this.getAllItems = function () {
		var url = "http://localhost:3000/api/ingredients";
		return	$http.get(url)
	}

	this.getAllRecipes = function () {
		var url = "http://localhost:3000/api/recipes";
		return $http.get(url)
	}

}
 
angular
    .module('starter')
    .service('HomeService', HomeService)