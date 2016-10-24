angular.module('starter.controllers-account', [])


.controller('AccountCtrl', function($http, $scope, $auth) {

	var ctrl = this

	ctrl.login = function () {
		if(ctrl.user.email && ctrl.user.pass){
			console.log(ctrl.user.email, ctrl.user.pass)
		}
	}



	ctrl.goRegister = function () {

		$auth.submitRegistration({
		  email:                 ctrl.new.email,
		  password:              ctrl.new.password,
		  password_confirmation: ctrl.new.confirm_password
		})        
		.then(function(resp) {
          // handle success response
          console.log(resp)
        })
        .catch(function(resp) {
          // handle error response
          console.log(resp)
        });

	}

	ctrl.login = function () {

		// console.log({email: ctrl.user.email, password: ctrl.user.password})
      $auth.submitLogin(ctrl.user)
        .then(function(resp) {
          // handle success response
          console.log(resp)
        })
        .catch(function(resp) {
          // handle error response
          console.log(resp)
        });		
	}



	$('.toggle').on('click', function() {
	  $('.container').stop().addClass('active');
	});

	$('.close').on('click', function() {
	  $('.container').stop().removeClass('active');
	});

	

})


