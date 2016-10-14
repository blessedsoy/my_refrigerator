angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {

var config = {
  headers: {
    "X-Mashape-Key": "w5sblQdN1NmshBVyem8S5zhGurKkp1oe8KtjsngWWeabPqpfNY",
    "Accept": "application/json"
  }
}

var url = "https://community-food2fork.p.mashape.com/get?key=003a7677ea99d47cdeaf6baf634644f3&rId=29159";
// "https://community-food2fork.p.mashape.com/search?key=003a7677ea99d47cdeaf6baf634644f3&q=shredded+chicken"          

          
$http.get(url, config).then(function(success){
  console.log(success)
}, function (error) {
  console.log(error)
})

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
