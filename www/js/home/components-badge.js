var Badge = {
templateUrl: 'templates/home/badge.html',
  bindings: {
    ck: '=',
    cv: '='
  },
  controller: function (HomeService) {
  var ctrl = this
  var category_key = this.ck;
  var category_value = this.cv;

  function getAllItems () {
    HomeService.getAllItems().then(function (success) {
      var allItems = success.data
      ctrl.howmany = 0;

      for(var i = 0; i < allItems.length; i++){
        
        if(allItems[i].category_id == category_key){
          ctrl.howmany += 1;
        }
      }
    }, function (err) {
      console.log(err)
    })
  }    

  getAllItems()
  
  },
  controllerAs: 'badge'
}

angular.module('starter')
  .component('badge', Badge)