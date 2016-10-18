// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic', 
  'ngCordova',

  'ngMaterial',
  'ngMessages',
  'ngAnimate',
  'angularMoment',

  'starter.controllers-home', 
  'starter.controllers-account',
  'starter.controllers-recipe',  
  'starter.controllers-addIngredient',
  'starter.controllers-findRecipe',
  'starter.controllers-expiration',

  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $mdDateLocaleProvider) {


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('login', {
    url: '/login',    
    templateUrl: 'templates/auth/login.html',
    controller: 'AccountCtrl as account',
    cache: false
  })    

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/home/tab-home.html',
        controller: 'HomeCtrl as home'
      }
    }
  })

  .state('tab.new', {
    url: '/new',
    views: {
      'tab-home': {
        templateUrl: 'templates/home/new-item.html',
        controller: 'AddIngredientCtrl as ingredient'
      }
    }
  })    

  .state('tab.category', {
    url: '/category/:id',
    views: {
      'tab-home': {
        templateUrl: 'templates/home/category.html',
        controller: 'HomeCtrl as home'
      }
    }
  })

  .state('tab.recipes', {
    url: '/recipes',
    views: {
      'tab-recipes': {
        templateUrl: 'templates/recipe/tab-recipe.html',
        controller: 'RecipeCtrl as recipe'
      }
    }
  })

  .state('tab.newRecipe', {
    url: '/newRecipe',
    views: {
      'tab-recipes': {
        templateUrl: 'templates/recipe/new-recipe.html',
        controller: 'FindRecipeCtrl as find'
      }
    }
  }) 

  .state('tab.expiration', {
    url: '/expiration',
    views: {
      'tab-expiration': {
        templateUrl: 'templates/expiration/expiration.html',
        controller: 'ExpirationCtrl as expiration'
      }
    }
  })     

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');
  $ionicConfigProvider.backButton.previousTitleText(false).text('');


});
