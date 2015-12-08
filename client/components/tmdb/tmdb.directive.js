angular.module('movieSyncApp')
  .directive('poster', function(){
    return {
      restrict: 'E',
      scope:{link:'@' },
      link: function(scope,element,attr){
        scope.$watchCollection('link', function(newValue, oldValue) {
          if (attr.link){
            scope.address = 'http://image.tmdb.org/t/p/' + attr.size + attr.link
          }
          else scope.address = 'http://placehold.it/185x260?text=No+Poster'
        });

        },
      replace: true,
      template: '<img src="{{address}}">'
    }
  })
