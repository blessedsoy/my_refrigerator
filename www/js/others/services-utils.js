

function UtilsService($http, $ionicLoading, $timeout) {

  	this.showMessage = function(message, optHideTime) {
  
    	if(optHideTime != undefined && optHideTime > 100) {
        	// error message or notification (no spinner)
	        $ionicLoading.show({
	            template: message
	        }); 
        
	        $timeout(function(){
	            $ionicLoading.hide();
	        }, optHideTime)
        
    	}else{
    		$ionicLoading.hide();
    	}
    }
}
 
angular
    .module('starter')
    .service('UtilsService', UtilsService)