angular.module('starter.controllers-home', [])

.controller('HomeCtrl', function($scope, $http) {

	// var config = {
	//   headers: {
	//     "X-Mashape-Key": "w5sblQdN1NmshBVyem8S5zhGurKkp1oe8KtjsngWWeabPqpfNY",
	//     "Accept": "application/json"
	//   }
	// }

	// var url = "https://community-food2fork.p.mashape.com/get?key=003a7677ea99d47cdeaf6baf634644f3&rId=29159";
	// // "https://community-food2fork.p.mashape.com/search?key=003a7677ea99d47cdeaf6baf634644f3&q=shredded+chicken"          

	          
	// $http.get(url, config).then(function(success){
	//   console.log(success)
	// }, function (error) {
	//   console.log(error)
	// })

	$scope.getList = function () {

		var url = "http://localhost:3000/api/ingredients";
		$http.get(url).then(function (success) {
			console.log(success.data)
		}, function (error) {
			console.log(error)
		})

	}	

	$scope.register = function (){
		var url = "http://localhost:3000/api/recipes";
		var data = {
			title : "Apple"
		}

		$http.post(url, data).then(function (success) {
			console.log(success)
		}, function (err) {
			console.log(err)
		})
	}
})
