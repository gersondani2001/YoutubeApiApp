/*codigo de logico angular js*/


var searchTerm = document.querySelector('.search');
var searchForm = document.querySelector('form');
var submitBtn = document.querySelector('.submit');
var section = document.querySelector('section');

window.onload = onClientLoad;

function onClientLoad() {
  gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {

  gapi.client.setApiKey('AIzaSyB6B_1tjwrSuM_NYS2HbqINbaapkEi2ThA');


  searchForm.addEventListener('submit', search);
}
function search(e) {
  e.preventDefault();

  var request = gapi.client.youtube.search.list({

    part: 'snippet',

    maxResults: 10,

    q: searchTerm.value
  });

  request.execute(onSearchResponse);
}

function onSearchResponse(response) {

  while (section.firstChild) {
      section.removeChild(section.firstChild);
  }

  var results = response.items;

  for(var i = 0; i < results.length; i++) {
    displayVideo(results[i], i);
  }
}
function displayVideo(result, i) {

  
  var vid = document.createElement('div');
  vidId = 'vid' + i;
  vid.id = vidId;
  section.appendChild(vid);

  
  var player = new YT.Player(vidId, {
    height: '250',
    width: '300',
    videoId: result.id.videoId,
    events: {
      'onReady': onPlayerReady
    }
  });

  
  function onPlayerReady(e) {
    var myId = e.target.a.id;
    var duration = e.target.getDuration();
    if(duration === 0) {
      console.log('Video ' + myId + ' cannot be played, so it was deleted.');
      section.removeChild(e.target.a);
    } else {
      var myId = e.target.a.id;
      console.log('Video ' + myId + ' ready to play.');
    }
  }
}




/*
var app = angular.module("app",[])
app.controller("appCtrl",function($scope,$rootScope,$http){

    console.log("angular js")


    $scope.datos = function(x){
        $scope.video= x;
        $scope.info=[];

        $http({
            method: "GET",
            url: "http://www.googleapis.com/youtube/v3/videos?id=".concat($scope.video,'&appid=AIzaSyDvgJlrw3T6C7OQjfl1UTLGnngFHPn9QaE')
        }).then(function(snapshot){
            $scope.info.push(snapshot);
            console.log(snapshot);
        })
    }

});
*/