(function() {
  'use strict';

  angular
    .module('ngFlyApp')
    .factory('didYouMean', didYouMean);

  function didYouMean() {
      let service = {
        findMatch: findMatch
      };
      return service;

      ////////////

      function findMatch(word, dict, limit) {
        let minDist = Infinity;
        let match = null;
        for (let i = 0; i < dict.length; i++) {
          let currDist = editDist(word, dict[i]);
          if (currDist < minDist) {
            minDist = currDist;
            match = dict[i];
          }
        }
        return minDist <= limit ? match : null;
      }

      function editDist(a, b) {
          if (a.length === 0) {
              return b.length;
          }
          if (b.length === 0) {
              return a.length;
          }
          let delta = a.substr(-1) !== b.substr(-1) ? 1 : 0;
          return Math.min(editDist(a.substr(0, a.length-1), b.substr(0, b.length - 1)) + delta,
            editDist(a.substr(0, a.length-1), b) + 1,
            editDist(a, b.substr(0, b.length - 1)) + 1);
      }
  }
})();
