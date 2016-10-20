var Badge = {
templateUrl: 'templates/home/badge.html',
  bindings: {
    ck: '=',
    cv: '='
  }, //getting key and value of category from the tab-home.html
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
  controllerAs: 'badge' //use this component as this name in the view
}

angular.module('starter')
  .component('badge', Badge)