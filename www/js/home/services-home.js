

function HomeService($http) {
	this.getAllItems = function () {
		var url = "http://localhost:3000/api/ingredients";
		return	$http.get(url)
	}

	this.getAllRecipes = function () {
		var url = "http://localhost:3000/api/recipes";
		return $http.get(url)
	}

	this.categories = {
		1 : "Vegetables",
		2 : "Fruits",
		3 : "Meat", 
		4 : "Dairy",
		5 : "Fish",
		6 : "Cooked Foods",
		7 : "Fermented Foods",
		8 : "Drinks",
		9 : "Sauce or Salad Dressings",
		10 : "Etc."
	}	

}
 
angular
    .module('starter')
    .service('HomeService', HomeService)