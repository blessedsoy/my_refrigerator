 function RecipeController ($http, $ionicModal, $scope, $state, 
	$ionicListDelegate, $timeout, $mdDialog, $state, $mdDateLocale, HomeService, 
	$mdDialog, $cordovaInAppBrowser, $ionicScrollDelegate, UtilsService) {

	var ctrl = this;

	ctrl.loading = false;

	ctrl.refresh = function () {
		getAllRecipes();
		$scope.$broadcast('scroll.refreshComplete'); //after pull to refresh, completes refresh 
	}  

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
	  		$ionicScrollDelegate.resize();	// resizing the recipe cards section after delete.
	  	}
	  	
	 },function (error) {
	  	console.log(error)
	 })  	
  }

  getAllRecipes()

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
	  	if($scope.theRecipe.ingredients_detail){
	  		if(typeof $scope.theRecipe.ingredients_detail === 'string'){
	  			$scope.theRecipe.ingredients_detail = $scope.theRecipe.ingredients_detail.split('|')	
	  		}else if((typeof $scope.theRecipe.ingredients_detail === 'object')){
	  			$scope.theRecipe.ingredients_detail = $scope.theRecipe.ingredients_detail[0].split('|')	

	  		} // for changing the format of details 
	  	}
	  
	    $mdDialog.show({ //angular material dialog 
	      templateUrl: 'templates/recipe/detail.html',
	     	parent: angular.element(document.body),
	     	clickOutsideToClose:false,
	     	scope: $scope,
    		preserveScope: true, //ebables controller as
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
			UtilsService.showMessage('DELETED', 1000)
		}, function (err) {
			console.log(err)
		})		

 	}
}

angular.module('starter')
.controller('RecipeCtrl', RecipeController)



