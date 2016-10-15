angular.module('starter.controllers-home', [])

.controller('HomeCtrl', function($http, $ionicModal, $scope, $state, $ionicHistory, 
	$ionicListDelegate, $timeout, $mdDialog) {

	var ctrl = this;

	ctrl.refresh = function () {
		getAllItems();
	}


	ctrl.categories = {
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

	function getAllItems () {
		var url = "http://localhost:3000/api/ingredients";
		$http.get(url).then(function (success) {
			ctrl.allItems =  success.data;
		}, function (error) {
			console.log(error)
		})
	}

	ctrl.refresh();

  // ---------------------------------------------------------
  //
  // New Item
  //
  // ---------------------------------------------------------
	

  ctrl.newItem = function () {

  	$state.go('tab.new')
  }


  ctrl.addNewItem = function () {
	var url = "http://localhost:3000/api/ingredients/";
	var data = ctrl.new

	$http.post(url, data).then(function (success) {
		
		$ionicHistory.goBack();
		$timeout(function(){
			ctrl.refresh();
		},1000)
		
	}, function (err) {
		console.log(err)
	})  	
  }

  // ---------------------------------------------------------
  //
  // Edit item
  //
  // ---------------------------------------------------------  


  ctrl.edit = function (id) {
  	$ionicListDelegate.closeOptionButtons()
	// var url = "http://localhost:3000/api/ingredients/";
	// var data = {
	// 	name : 'Carrot'
	// }

	// $http.patch(url + id , data).then(function (success) {
	// 	console.log(success)
	// }, function (err) {
	// 	console.log(err)
	// })	
  }

  ctrl.showPrompt = function(event, item) {

  	$scope.edit_item = item;

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
  	console.log($scope.edit_item)
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

	// var config = {
	//   headers: {
	//     "X-Mashape-Key": "w5sblQdN1NmshBVyem8S5zhGurKkp1oe8KtjsngWWeabPqpfNY",
	//     "Accept": "application/json"
	//   }
	// }

	// var url = "https://community-food2fork.p.mashape.com/get?key=003a7677ea99d47cdeaf6baf634644f3&rId=29159";
	// // "https://community-food2fork.p.mashape.com/search?key=003a7677ea99d47cdeaf6baf634644f3&q=shredded+chicken"          

	          
	// $http.get(url, config).then(function(success){
	//   console.log(success)
	// }, function (error) {
	//   console.log(error)
	// })


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

