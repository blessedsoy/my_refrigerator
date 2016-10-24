angular.module('starter.controllers-account', [])

.controller('AccountCtrl', function($http, $scope, $auth) {
	var ctrl = this

	$('.toggle').on('click', function() {
	  $('.container').stop().addClass('active');
	});

	$('.close').on('click', function() {
	  $('.container').stop().removeClass('active');
	});
		
	ctrl.goRegister = function () {

		// if(ctrl.new.email && ctrl.new.password){
		// 	var url = "http://localhost:3000/auth"
		// 	var data = {email: ctrl.new.email, password: ctrl.new.password}
		// 	// var config = {
		// 	//   headers: {
		// 	//     "Accept": "application/json"
		// 	//   }
		// 	// }			

		// 	$http.post(url, data).then(function (success) {
		// 		console.log(success)
		// 	}, function (error) {	
		// 		console.log(error)
		// 	})			
		// }

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

// 	ctrl.goRegister= function () {

//         var credentials = {
//             email: ctrl.new.email,
//             password: ctrl.new.password
//         };
//         var config = {
//             headers: {
//                 'X-HTTP-Method-Override': 'POST'
//             }
//         };

// 		// var url = "http://localhost:3000/users"


//    		Auth.register(credentials, config).then(function(registeredUser) {
//             console.log(registeredUser); // => {id: 1, ect: '...'}
//         }, function(error) {
//             // Registration failed...
//         });

//         $scope.$on('devise:new-registration', function(event, user) {
//             // ...
//         });        
//    
// 	}
	
	

})


