angular.module('starter.controllers-home', [])

.controller('HomeCtrl', function($http, $ionicModal, $scope, $state, $ionicHistory, 
	$ionicListDelegate, $timeout, $mdDialog, $state, $mdDateLocale, HomeService, $rootScope) {

	var ctrl = this;

	ctrl.refresh = function () {
		getAllItems();
	}

  ctrl.category_id = $state.params.id
  
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

	ctrl.new = {};	


	function getAllItems () {
		HomeService.getAllItems().then(function (success) {
			ctrl.allItems = success.data
			console.log(success.data)
		}, function (err) {
			console.log(err)
		})
	}

	ctrl.refresh();

  // ---------------------------------------------------------
  //
  // Listening
  //
  // ---------------------------------------------------------


	$rootScope.$on('updateAllItems', function () {
		ctrl.refresh();
	})	


  // ---------------------------------------------------------
  //
  // New Item
  //
  // ---------------------------------------------------------



  ctrl.newItem = function () {

  	$state.go('tab.new')
  }


  ctrl.addNewItem = function () {

  	
  	if(ctrl.purchaseDate){
	  	var date = ctrl.purchaseDate;
	  	var result = date ? moment(date).format('YYYY-MM-DD') : null
	  	ctrl.new.purchase_date = result;
  	}

  	if(ctrl.expirationDate){
	  	var date_expiration = ctrl.expirationDate;
	  	var result_expiration =  date_expiration ? moment(date_expiration).format('YYYY-MM-DD') : null
	  	ctrl.new.expiration_date = result_expiration;
  	}


	var url = "http://localhost:3000/api/ingredients/";
	var data = ctrl.new
	
	$http.post(url, data).then(function (success) {
		
		$ionicHistory.goBack();
		ctrl.refresh();
	
	}, function (err) {
		console.log(err)
	})  	
  }


  // ---------------------------------------------------------
  //
  // Edit item
  //
  // ---------------------------------------------------------  


  ctrl.edit = function (data) {
  	$ionicListDelegate.closeOptionButtons()
   
  	if(data.purchase_date){
	  	var result = moment(data.purchase_date).format('YYYY-MM-DD');
	  	data.purchase_date = result;
  	}

  	if(data.expiration_date){
	  	var result_expiration = moment(data.expiration_date).format('YYYY-MM-DD');
	  	data.expiration_date = result_expiration;
  	}

  	var url = "http://localhost:3000/api/ingredients/";

  	$http.patch(url + data.id , data).then(function (success) {
  		console.log(success)
  	}, function (err) {
  		console.log(err)
  	})	
  }

  ctrl.showPrompt = function(event, item) {

  	// $scope.edit_item = item;

  	ctrl.edit_item = item


  	if(ctrl.edit_item.expiration_date){
  		ctrl.edit_item.expiration_date = new Date(moment(item.expiration_date))

  	}
  	if(ctrl.edit_item.purchase_date){
  		ctrl.edit_item.purchase_date = new Date(moment(item.purchase_date))
  	}	
  
    $mdDialog.show({
      // controller: DialogController,
      templateUrl: 'templates/home/dialog-edit.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose:false,
      // scope: $scope.$new()
      scope: $scope,
      preserveScope: true,
    })
    .then(function(answer) {
      
    }, function() {
      
    });
   
  };

  ctrl.cancel = function () {
  	$mdDialog.cancel();
  	$ionicListDelegate.closeOptionButtons();
  }

  ctrl.edit_confirm = function () {
    $mdDialog.cancel();
    $ionicListDelegate.closeOptionButtons()
    ctrl.edit(ctrl.edit_item);
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

