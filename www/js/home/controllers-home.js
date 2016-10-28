
function HomeController ($http, $scope, $state, $ionicHistory, 
	$ionicListDelegate, $timeout, $mdDialog, $state, $mdDateLocale, 
	HomeService, $rootScope, $ionicScrollDelegate) {


// $ionicHistory, 
// $ionicListDelegate
// $rootScope
// $ionicScrollDelegate




	var ctrl = this;



  ctrl.increase = function(item) {
    var newCount = item.count ++
    var url = "http://localhost:3000/api/ingredients/";
    $http.patch(url + item.id , {count: newCount }).then(function (success) {
      console.log(success)
    }, function (err) {
      console.log(err)
    })  
    }

  

  	ctrl.category_id = $state.params.id 
  
	  ctrl.categories = HomeService.categories;

	  ctrl.new = {};	


	function getAllItems () {
		HomeService.getAllItems().then(function (success) {
			ctrl.allItems = success.data
			console.log(success.data)
		}, function (err) {
			console.log(err)
		})
	}

	ctrl.refresh = function () {
		getAllItems();
	}	

	ctrl.refresh();

  // ---------------------------------------------------------
  //
  // Listening
  //
  // ---------------------------------------------------------


	$rootScope.$on('updateAllItems', function () {
		ctrl.refresh();
	})	//


  // ---------------------------------------------------------
  //
  // New Item
  //
  // ---------------------------------------------------------



  ctrl.newItem = function () {

  	$state.go('tab.new')
  } // when you click on new button, it will go to tab.new page
  

  // ---------------------------------------------------------
  //
  // Edit item
  //
  // ---------------------------------------------------------  


  ctrl.editButton = function(event, item) {
    // this function is called in tab-home.html when you click on edit button.

  	ctrl.edit_item = item

  	if(ctrl.edit_item.expiration_date){

  		ctrl.edit_item.expiration_date = new Date(moment(item.expiration_date)) //changing date string to date object format
  	}
  	if(ctrl.edit_item.purchase_date){
  		ctrl.edit_item.purchase_date = new Date(moment(item.purchase_date))
  	}	
  
    $mdDialog.show({     //angular material dialog
      templateUrl: 'templates/home/dialog-edit.html',
      parent: angular.element(document.body),

      targetEvent: event,    //recieved from ng click event and function argument
      clickOutsideToClose:false,     //you can't close the dialog unless you click the close button
      scope: $scope,    //$scope is currnt scope in the controller
      preserveScope: true,     //option for using current scope in the dialog
    })
  };

  ctrl.edit_confirm = function () {
    // this function is called when confirm button is clicked in edit dialog. 
    $mdDialog.cancel();  //close dialog
    $ionicListDelegate.closeOptionButtons() 
    ctrl.edit(ctrl.edit_item); //edited items from dialog-edit html
  }

  ctrl.edit = function (data) {
    $ionicListDelegate.closeOptionButtons() //to close swipe buttons after click event. $ionicListDelegate is service that control all lists that has different functions.

    var url = "http://localhost:3000/api/ingredients/";
    $http.patch(url + data.id , data).then(function (success) {
      console.log(success)
    }, function (err) {
      console.log(err)
    })  
  }

  ctrl.cancel = function () {
  	$mdDialog.cancel();
  	$ionicListDelegate.closeOptionButtons();
  }


  // ---------------------------------------------------------
  //
  // Delete Item
  //
  // ---------------------------------------------------------

 	ctrl.delete = function (id) {
 		$ionicListDelegate.closeOptionButtons();
		var url = "http://localhost:3000/api/ingredients/";

		$http.delete(url + id).then(function (success) {
			console.log(success)
			ctrl.refresh();
		}, function (err) {
			console.log(err)
		})		
 	}
};




angular.module('starter')
.controller('HomeCtrl', HomeController)


