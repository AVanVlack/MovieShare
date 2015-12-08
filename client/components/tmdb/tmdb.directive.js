angular.module('movieSyncApp')
  .directive('poster', function(){
    return {
      restrict: 'E',
      link: function(scope,element,attr){
          if (attr.link){
            scope.address = 'http://image.tmdb.org/t/p/' + attr.size + attr.link
          }
          else scope.address = 'http://placehold.it/185x260?text=No+Poster'
        },
      replace: true,
      template: '<img src="{{address}}">'
    }
  })
