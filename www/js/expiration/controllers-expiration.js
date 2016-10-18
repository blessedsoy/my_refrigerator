angular.module('starter.controllers-expiration', [])

.controller('ExpirationCtrl', function($http, $scope, $state, $ionicHistory, 
	$ionicListDelegate, $timeout, $mdDialog, $state, $mdDateLocale, HomeService, 
	$mdDialog, $cordovaInAppBrowser, $ionicScrollDelegate, UtilsService) {

	var ctrl = this;

	ctrl.loading = false;
	ctrl.categories = HomeService.categories;

	ctrl.refresh = function () {
		getAllRecipes();
		$scope.$broadcast('scroll.refreshComplete');
	}  
	ctrl.refresh();


  // ---------------------------------------------------------
  //
  // Get All Items
  //
  // ---------------------------------------------------------

  function getAllRecipes () {
	 HomeService.getAllItems().then(function (res) {
	  	if(res.status === 200 & res.data.length > 0){
	  		console.log(res.data)
	  		ctrl.allItems = res.data
	  		// $ionicScrollDelegate.resize();	
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

 //  	ctrl.newRecipe = function () {
 //  		$state.go('tab.newRecipe')
 //  	}


	// ctrl.showDialog = function (recipe) {
	//   	$scope.theRecipe = recipe
	//   	if(recipe.ingredients_detail){
	// 		$scope.theRecipe.ingredients_detail = recipe.ingredients_detail.split('|')	
	//   	}
	  
	//     $mdDialog.show({
	//       	templateUrl: 'templates/recipe/detail.html',
	//      	parent: angular.element(document.body),
	//      	clickOutsideToClose:false,
	//      	scope: $scope,
 //    		preserveScope: true,
 //     		clickOutsideToClose: true,
 //     		escapeToClose: true	      
	//     })
	// }

	// $scope.cancel = function () {
	// 	$mdDialog.cancel();
	// }  



 //  $scope.openInAppBrowser = function (url) {
 //  	window.open(url, '_blank', 'location=no')
 //  }


	// $scope.view = 'recipe'



 //  // ---------------------------------------------------------
 //  //
 //  // Delete Item
 //  //
 //  // ---------------------------------------------------------

 // 	ctrl.deleteRecipe = function (item) {
 	
	// 	var url = "http://localhost:3000/api/recipes/";

	// 	$http.delete(url + item.id).then(function (success) {
	// 		console.log(success)
	// 		ctrl.refresh();
	// 		UtilsService.showMessage('DELETED', 1000)
	// 	}, function (err) {
	// 		console.log(err)
	// 	})		

 // 	}
})

