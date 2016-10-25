
function AccountController ($http, $scope, Auth, $state) {

	var ctrl = this

		var config = {
			headers: {
				'X-HTTP-Method-Override': 'POST'
			}
		};	

	ctrl.goRegister = function () {

		var credentials = {
			email: ctrl.new.email,
			password : ctrl.new.password,
			// password_confirmation: ctrl.new.confirm_password
		}

	    Auth.register(ctrl.new, config).then(function(registeredUser) {
            console.log('register success !!!')
            console.log(registeredUser); // => {id: 1, ect: '...'}
            $state.go('tab.home');
        }, function(error) {
        	console.log(error)
            // Registration failed...
        });
        $scope.$on('devise:new-registration', function(event, user) {
            // ...
        });
	}

	ctrl.login = function () {


		// console.log({email: ctrl.user.email, password: ctrl.user.password})

        Auth.login(ctrl.user, config).then(function(user) {
            console.log('log-in success')
            console.log(user);
            $state.go('tab.home');
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

	ctrl.logout = function () {
		console.log('hey !!!')
		var config = {
            headers: {
                'X-HTTP-Method-Override': 'DELETE'
            }
        };
        // Log in user...
        
        Auth.logout(config).then(function(oldUser) {
            // alert(oldUser.name + "you're signed out now.");
            console.log(oldUser)
        }, function(error) {
        	console.log(error)
            // An error occurred logging out.
        });

        $scope.$on('devise:logout', function(event, oldCurrentUser) {
            // ...
        });		
	}

	ctrl.currentUser = function () {
  var parameters = {
            email: 'soulmecca@gmail.com'
        };

        Auth.sendResetPasswordInstructions(parameters).then(function() {
            // Sended email if user found otherwise email not sended...
        });

        $scope.$on('devise:send-reset-password-instructions-successfully', function(event) {
            // ...
        });
	}



	$('.toggle').on('click', function() {
	  $('.container').stop().addClass('active');
	});

	$('.close').on('click', function() {
	  $('.container').stop().removeClass('active');
	});

}

angular.module('starter')
.controller('AccountCtrl', AccountController)



