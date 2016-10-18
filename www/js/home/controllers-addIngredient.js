angular.module('starter.controllers-addIngredient', [])

.controller('AddIngredientCtrl', function($http, $ionicListDelegate, $rootScope, $scope, $ionicHistory) {

	var ctrl = this;

	ctrl.new = {};	


  // ---------------------------------------------------------
  //
  // New Item
  //
  // ---------------------------------------------------------
	


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
		$scope.$emit('updateAllItems')    	
		$ionicHistory.goBack();
	
	}, function (err) {
		console.log(err)
	})  	
  }


})

