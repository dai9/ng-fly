(function() {
  'use strict';

  angular
    .module('ngFlyApp')
    .factory('socket', socket);

  socket.$inject = ['socketFactory'];

  function socket(socketFactory) {
    return socketFactory();
  }
})();
