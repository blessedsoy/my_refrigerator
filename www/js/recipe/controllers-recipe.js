angular.module('starter.controllers-recipe', [])

.controller('RecipeCtrl', function($http, $ionicModal, $scope, $state, $ionicHistory, 
	$ionicListDelegate, $timeout, $mdDialog, $state, $mdDateLocale, HomeService, 
	$mdDialog, $cordovaInAppBrowser) {

	var ctrl = this;

	ctrl.loading = false;

	ctrl.refresh = function () {
		getAllItems();
	}

  	ctrl.category_id = $state.params.id
  
	function getAllItems () {
		HomeService.getAllItems().then(function (success) {
			ctrl.allItems = success.data
		}, function (err) {
			console.log(err)
		})
	}

	ctrl.refresh();

  // ---------------------------------------------------------
  //
  // Get All Recipe
  //
  // ---------------------------------------------------------

  HomeService.getAllRecipes().then(function (res) {
  	if(res.status === 200 & res.data.length > 0){
  		console.log(res.data)
  		ctrl.allRecipes = res.data
  	}
  	
  },function (error) {
  	console.log(error)
  })

  // ---------------------------------------------------------
  //
  // New Recipe
  //
  // ---------------------------------------------------------  	

  // ---------------------------------------------------------
  //
  // New Recipe
  //
  // ---------------------------------------------------------
	
  ctrl.selected = [];

  ctrl.exists = function (item, list) {
    return list.indexOf(item) > -1;
  };  

  ctrl.isChecked = function() {
  	if(ctrl.selected && ctrl.allItems){
  		return ctrl.selected.length === ctrl.allItems.length;	
  	}
  };

  ctrl.newRecipe = function () {

  	$state.go('tab.newRecipe')
  }

  ctrl.toggle = function (item, list) {
    var idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item);
    }
  };

  ctrl.toggleAll = function() {
  	if(ctrl.selected && ctrl.allItems){
	    if (ctrl.selected.length === ctrl.allItems.length) {
	      ctrl.selected = [];
	    } else if (ctrl.selected.length === 0 || ctrl.selected.length > 0) {
	      ctrl.selected = ctrl.allItems
	    }  		
  	}

  };  

  ctrl.findRecipe = function () {
  	ctrl.loading = true;

	console.log(ctrl.selected)  	

	var config = {
	  headers: {
	    "X-Mashape-Key": "w5sblQdN1NmshBVyem8S5zhGurKkp1oe8KtjsngWWeabPqpfNY",
	    "Accept": "application/json"
	  }
	}

	var url = "https://community-food2fork.p.mashape.com/search?key=003a7677ea99d47cdeaf6baf634644f3&q="          

	for(var i = 0; i < ctrl.selected.length; i++){
		url += ctrl.selected[i].name
		if(i !== ctrl.selected.length - 1){
			url += '+'
		}		
	}
// "https://community-food2fork.p.mashape.com/get?key=003a7677ea99d47cdeaf6baf634644f3&rId=29159";
	          
	$http.get(url, config).then(function(success){
	  if(success.status === 200){
	  	console.log(success.data)	
	  	if(success.data.count > 0){
	  		ctrl.recipes = success.data.recipes;	
	  		ctrl.loading = false;
	  		ctrl.gotResult = true;
	  	}else{
	  		ctrl.loading = false;
	  		ctrl.gotResult = false;
	  	}
	  	
	  }
	}, function (error) {
	  console.log(error)
	})

  }

  ctrl.openInAppBrowser = function (url) {
  	window.open(url, '_blank', 'location=no')
  }


  // ---------------------------------------------------------
  //
  // Detail dialog
  //
  // ---------------------------------------------------------  


  	ctrl.getDetailedRecipe = function (id) {
  		
  		var url = "https://community-food2fork.p.mashape.com/get?key=003a7677ea99d47cdeaf6baf634644f3&rId="

		var config = {
		  headers: {
		    "X-Mashape-Key": "w5sblQdN1NmshBVyem8S5zhGurKkp1oe8KtjsngWWeabPqpfNY",
		    "Accept": "application/json"
		  }
		}  		

		return $http.get(url + id, config)
  	}

	 ctrl.showDetail = function(id) {

	 	ctrl.getDetailedRecipe(id).then(function (res) {

	 		if(res.status === 200){
	 			if(res.data.recipe){
	 				console.log(res.data)
	 				ctrl.showDialog(res.data.recipe)	 				
	 			}else{
					console.log('no result')
	 			}
	 		}
	 	}, function (error) {	
	 		console.log(error)
	 	}) 
	 };

	ctrl.showDialog = function (recipe) {
	  	ctrl.theRecipe = recipe
	  
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

	ctrl.cancel = function () {
		$mdDialog.cancel();
	}


  // ---------------------------------------------------------
  //
  // Save Recipe
  //
  // ---------------------------------------------------------  


  ctrl.saveRecipe = function () {
  	// ctrl.selected

	var url = "http://localhost:3000/api/recipes";
	var data = {
		title: ctrl.theRecipe.title,
		image_url: ctrl.theRecipe.image_url,
		source_url: ctrl.theRecipe.source_url,
		ingredients_detail: ctrl.theRecipe.ingredients
	}
	
	$http.post(url, data).then(function (success) {
		
		// $ionicHistory.goBack();
		$mdDialog.cancel();
	
	}, function (err) {
		console.log(err)

	})    	
  }

  // ---------------------------------------------------------
  //
  // Delete Item
  //
  // ---------------------------------------------------------

 	ctrl.delete = function (id) {
 		$ionicListDelegate.closeOptionButtons()
		var url = "http://localhost:3000/api/ingredients/";

		$http.delete(url + id).then(function (success) {
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

