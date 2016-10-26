
function AccountController ($http, $scope, Auth, $state, $mdDialog, UtilsService) {

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
            console.log(registeredUser); 

            $state.go('tab.home');
        }, function(error) {
        	console.log(error)

            var error_message = ""
            if(error.data.errors.email){
                error_message += "Email " + error.data.errors.email;
            }
            if(error.data.errors.password){
                error_message += "<br> Password " + error.data.errors.password;
            }

    
            UtilsService.showMessage(error_message, 3000)
            // Registration failed...
        });

	}

	ctrl.login = function () {

		// console.log(ctrl.user)

        Auth.login(ctrl.user, config).then(function(user) {
            console.log('log-in success')
            console.log(user);
            $state.go('tab.home');
            UtilsService.showMessage('LOGGED IN', 1300)
        }, function(error) {
        	console.log(error)
            UtilsService.showMessage(error.data.error, 2000)
            // Authentication failed...
        });

	}

	ctrl.logout = function () {
		var config = {
            headers: {
                'X-HTTP-Method-Override': 'DELETE'
            }
        };
        // Log in user...
        
        Auth.logout(config).then(function(oldUser) {
            // alert(oldUser.name + "you're signed out now.");
            console.log(oldUser)
            $state.go('login')
            UtilsService.showMessage('LOGGED OUT', 1000)
        }, function(error) {
        	console.log(error)
            // An error occurred logging out.
        });

        $scope.$on('devise:logout', function(event, oldCurrentUser) {
            // ...
        });		
	}


  //logout confirm
  ctrl.logoutConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Are you sure to log out?')
          // .textContent('All of the banks have agreed to forgive you your debts.')
          // .ariaLabel('Lucky day')
          // .targetEvent(ev)
          .cancel('Cancel')
          .ok('Log out!')

    $mdDialog.show(confirm).then(function() {
      // $scope.status = 'You decided to get rid of your debt.';
      ctrl.logout();
    }, function() {
      $mdDialog.hide()
      // $scope.status = 'You decided to keep your debt.';
    });
  };      



	$('.toggle').on('click', function() {
	  $('.container').stop().addClass('active');
	});

	$('.close').on('click', function() {
	  $('.container').stop().removeClass('active');
	});

}

angular.module('starter')
.controller('AccountCtrl', AccountController)



