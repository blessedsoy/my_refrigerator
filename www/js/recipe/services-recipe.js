
function RecipeService($http) {
this.findRecipe = function (selected) {  

  var config = {
    headers: {
      "X-Mashape-Key": "w5sblQdN1NmshBVyem8S5zhGurKkp1oe8KtjsngWWeabPqpfNY",
      "Accept": "application/json"
    }
  }

  var url = "https://community-food2fork.p.mashape.com/search?key=003a7677ea99d47cdeaf6baf634644f3&q="          

  for(var i = 0; i < selected.length; i++){
    url += selected[i].name
    if(i !== selected.length - 1){
      url += '+'
    }   
  }
// "https://community-food2fork.p.mashape.com/get?key=003a7677ea99d47cdeaf6baf634644f3&rId=29159";
            
  return $http.get(url, config)

  }
}
 
angular
    .module('starter')
    .service('RecipeService', RecipeService)
