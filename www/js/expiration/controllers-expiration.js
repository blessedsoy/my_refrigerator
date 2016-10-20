
function ExpirationController ($http, $scope, $state, $ionicHistory, 
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

}


angular.module('starter')
.controller('ExpirationCtrl', ExpirationController)