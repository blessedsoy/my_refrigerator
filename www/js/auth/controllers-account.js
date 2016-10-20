angular.module('starter.controllers-account', [])

.controller('AccountCtrl', function($http, $scope) {
	var ctrl = this

	ctrl.login = function () {
		if(ctrl.user.email && ctrl.user.pass){
			console.log(ctrl.user.email, ctrl.user.pass)
		}
	}



	ctrl.goRegister = function () {

		if(ctrl.new.email && ctrl.new.password){

			console.log(ctrl.new.email, ctrl.new.password)
			// var url = "http://localhost:3000/users"
			// var data = {email: ctrl.new.email, password: ctrl.new.password}
			// var config = {
			//   headers: {
			//     "Accept": "application/json"
			//   }
			// }			

		// 	$http.post(url, data).then(function (success) {
		// 		console.log(success)
		// 	}, function (error) {	
		// 		console.log(error)
		// 	})	

		}

	}



	$('.toggle').on('click', function() {
	  $('.container').stop().addClass('active');
	});

	$('.close').on('click', function() {
	  $('.container').stop().removeClass('active');
	});

	

})


