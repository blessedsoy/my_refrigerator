angular.module('starter.controllers-findRecipe', [])

.controller('FindRecipeCtrl', function(HomeService ,$http, $ionicListDelegate, 
	$rootScope, $scope, $ionicHistory, $mdDialog, UtilsService) {

	var ctrl = this;

	ctrl.new = {};	

	ctrl.loading = false;
	$scope.view = 'findRecipe'

  // ---------------------------------------------------------
  //
  // Get All Recipe
  //
  // ---------------------------------------------------------


	function getAllItems () {
		HomeService.getAllItems().then(function (success) {
			ctrl.allItems = success.data
			console.log(success.data)
		}, function (err) {
			console.log(err)
		})
	}

  getAllItems()


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
	  ctrl.loading = false;
	})

  }

  $scope.openInAppBrowser = function (url) {
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
	  	$scope.theRecipe = recipe
	  	ctrl.theRecipe = recipe;
	  
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


  // ---------------------------------------------------------
  //
  // Save Recipe
  //
  // ---------------------------------------------------------  


  ctrl.saveRecipe = function () {
  	// ctrl.selected

  	var ingredients = "";

  	for(var i = 0; i < ctrl.theRecipe.ingredients.length; i++){
  		ingredients += ctrl.theRecipe.ingredients[i]
  		if(i !== ctrl.theRecipe.ingredients.length - 1){
  			ingredients += '|'
  		}
  	}


	var url = "http://localhost:3000/api/recipes";
	var data = {
		title: ctrl.theRecipe.title,
		image_url: ctrl.theRecipe.image_url,
		source_url: ctrl.theRecipe.source_url,
		ingredients_detail: ingredients
	}
	
	$http.post(url, data).then(function (success) {
		
		// $ionicHistory.goBack();
		console.log(success)
		$mdDialog.cancel();

		UtilsService.showMessage('SAVED', 1000)
		
	}, function (err) {
		console.log(err)

	})    	
  }

})

