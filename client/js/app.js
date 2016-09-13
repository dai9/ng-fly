var app = angular.module('ngFlyApp', ['ui.router', 'btford.socket-io']);

app.config(function($stateProvider, $locationProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    controller: 'ChatCtrl',
    templateUrl: 'templates/chatroom.html',
    resolve: {
      username: function(ChatService) {
        return ChatService.generateName();
      }
    }
  });
  $locationProvider.html5Mode(true);
});
