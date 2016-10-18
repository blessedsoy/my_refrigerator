angular.module('starter.controllers-recipe', [])

.controller('RecipeCtrl', function($http, $ionicModal, $scope, $state, $ionicHistory, 
	$ionicListDelegate, $timeout, $mdDialog, $state, $mdDateLocale, HomeService, 
	$mdDialog, $cordovaInAppBrowser, $ionicScrollDelegate) {

	var ctrl = this;

	ctrl.loading = false;

	ctrl.refresh = function () {
		getAllRecipes();
		$scope.$broadcast('scroll.refreshComplete');
	}  
	ctrl.refresh();


  // ---------------------------------------------------------
  //
  // Get All Recipe
  //
  // ---------------------------------------------------------

  function getAllRecipes () {
	 HomeService.getAllRecipes().then(function (res) {
	  	if(res.status === 200 & res.data.length > 0){
	  		console.log(res.data)
	  		ctrl.allRecipes = res.data
	  		$ionicScrollDelegate.resize();	
	  	}
	  	
	 },function (error) {
	  	console.log(error)
	 })  	
  }

  // ---------------------------------------------------------
  //
  // New Recipe
  //
  // ---------------------------------------------------------

  	ctrl.newRecipe = function () {
  		$state.go('tab.newRecipe')
  	}


	ctrl.showDialog = function (recipe) {
	  	$scope.theRecipe = recipe
	  	if(recipe.ingredients_detail){
			$scope.theRecipe.ingredients_detail = recipe.ingredients_detail.split('|')	
	  	}
	  
	    $mdDialog.show({
	      	templateUrl: 'templates/recipe/detail.html',
	     	parent: angular.element(document.body),
	     	clickOutsideToClose:false,
	     	scope: $scope,
    		preserveScope: true,
     		clickOutsideToClose: true,
     		escapeToClose: true	      
	    })
	}

	$scope.cancel = function () {
		$mdDialog.cancel();
	}  



  $scope.openInAppBrowser = function (url) {
  	window.open(url, '_blank', 'location=no')
  }


	$scope.view = 'recipe'



  // ---------------------------------------------------------
  //
  // Delete Item
  //
  // ---------------------------------------------------------

 	ctrl.deleteRecipe = function (item) {
 	
		var url = "http://localhost:3000/api/recipes/";

		$http.delete(url + item.id).then(function (success) {
			console.log(success)
			ctrl.refresh();
		}, function (err) {
			console.log(err)
		})		

 	}



	// $scope.getList = function () {

	// 	var url = "http://localhost:3000/api/ingredients";
	// 	$http.get(url).then(function (success) {
	// 		console.log(success.data)
	// 	}, function (error) {
	// 		console.log(error)
	// 	})

	// }	

	// $scope.register = function (){
	// 	var url = "http://localhost:3000/api/ingredients";
	// 	var data = {
	// 		name : "Apple",
	// 		category_id: 2
	// 	}

	// 	$http.post(url, data).then(function (success) {
	// 		console.log(success)
	// 	}, function (err) {
	// 		console.log(err)
	// 	})
	// }

	// $scope.delete = function () {
	// 	var url = "http://localhost:3000/api/ingredients/3";

	// 	$http.delete(url).then(function (success) {
	// 		console.log(success)
	// 	}, function (err) {
	// 		console.log(err)
	// 	})		
	// }

	// $scope.edit = function () {
	// 	var url = "http://localhost:3000/api/ingredients/1";
	// 	var data = {
	// 		name : 'Carrot'
	// 	}

	// 	$http.patch(url, data).then(function (success) {
	// 		console.log(success)
	// 	}, function (err) {
	// 		console.log(err)
	// 	})		
	// }
})

