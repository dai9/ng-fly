angular.module('ngFlyApp')
.directive('menu', function() {
  return {
    template: '&#9776;',
    restrict: 'A',
    link: function(scope, elem, attrs) {
      scope.showMenu = false;
      elem.bind('click', function() {
        let header = document.getElementsByClassName('header')[0];
        let navItems = document.getElementsByClassName('nav-items')[0];
        if (scope.showMenu) {
          header.style.height = '3.5rem';
        } else {
          header.style.height = '8rem';
        }
        scope.showMenu = !scope.showMenu;
      });
    }
  };
});
