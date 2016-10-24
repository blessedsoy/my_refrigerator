angular.module('starter.controllers-account', [])


.controller('AccountCtrl', function($http, $scope, Auth) {

	var ctrl = this

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

		var config = {
			headers: {
				'X-HTTP-Method-Override': 'POST'
			}
		};

		// console.log({email: ctrl.user.email, password: ctrl.user.password})

        Auth.login(ctrl.user, config).then(function(user) {
            console.log(user);
        }, function(error) {
        	console.log(error)
            // Authentication failed...
        });

        $scope.$on('devise:login', function(event, currentUser) {
            // after a login, a hard refresh, a new tab
        });

        $scope.$on('devise:new-session', function(event, currentUser) {
            // user logged in by Auth.login({...})
        });


		
	
	}



	$('.toggle').on('click', function() {
	  $('.container').stop().addClass('active');
	});

	$('.close').on('click', function() {
	  $('.container').stop().removeClass('active');
	});

	

})


