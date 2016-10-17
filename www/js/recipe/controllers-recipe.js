angular.module('starter.controllers-recipe', [])

.controller('RecipeCtrl', function($http, $ionicModal, $scope, $state, $ionicHistory, 
	$ionicListDelegate, $timeout, $mdDialog, $state, $mdDateLocale, HomeService, 
	$mdDialog, $cordovaInAppBrowser) {

	var ctrl = this;

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
	  	}else{

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
	 				showDialog(res.data.recipe)	 				
	 			}else{
					console.log('no result')
	 			}
	 		}
	 	}, function (error) {	
	 		console.log(error)
	 	}) 
	 };

	function showDialog (recipe) {
	  	ctrl.theRecipe = recipe
	  
	    $mdDialog.show({
	      	// controller: DialogController,
	      	templateUrl: 'templates/recipe/detail.html',
	     	parent: angular.element(document.body),
	     	// targetEvent: event,
	     	clickOutsideToClose:false,
	     	scope: $scope,
    		preserveScope: true,
     		clickOutsideToClose: true,
     		escapeToClose: true	      
	      // scope: $scope.$new()
	    })
        .then(function(answer) {
          console.log(answer)
        }, function() {
          
        });

	   //  function DialogController($scope, $mdDialog, scope) {
		 	// $scope = scope;
		 	// $scope.hide = function() {
		  //   	$mdDialog.hide();
		  // 	};
		  // 	$scope.cancel = function() {
		  //   	$mdDialog.cancel();
		  // 	};
	   //  }
	}

	ctrl.cancel = function () {
		$mdDialog.cancel();
	}


  // ---------------------------------------------------------
  //
  // Edit item
  //
  // ---------------------------------------------------------  


  ctrl.edit = function (data) {
  	$ionicListDelegate.closeOptionButtons()
    console.log(data.id)
  	var url = "http://localhost:3000/api/ingredients/";

  	$http.patch(url + data.id , data).then(function (success) {
  		console.log(success)
  	}, function (err) {
  		console.log(err)
  	})	
  }

  ctrl.showPrompt = function(event, item) {

  	$scope.edit_item = item;

  	$scoep.edit_item.purchaseDate = item.purchase_date;

    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'templates/home/dialog-edit.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose:false,
      scope: $scope.$new()
    })
    .then(function(answer) {
      
    }, function() {
      
    });


    function DialogController($scope, $mdDialog, scope) {
	 	$scope = scope;
	 	$scope.hide = function() {
	    	$mdDialog.hide();
	  	};
	  	$scope.cancel = function() {
	    	$mdDialog.cancel();
        $ionicListDelegate.closeOptionButtons()

	  	};

		$scope.categories = {
			1 : "Vegetables",
			2 : "Fruites",
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
   
  };

  $scope.edit_confirm = function () {
    $mdDialog.cancel();
    $ionicListDelegate.closeOptionButtons()
  	console.log($scope.edit_item)
    ctrl.edit($scope.edit_item);
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

