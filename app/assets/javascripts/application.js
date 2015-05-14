// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var activitySearch = document.querySelector("#search")
var activitySelect = document.querySelector("#activity-select")
var citySearch = document.querySelector("#city-search")
var searchDiv = document.querySelector(".search-box")
var mainDiv = document.querySelector(".main-div")

var searchLoad = function(search, response){
  map = document.createElement('img');
  map.setAttribute('src', "https://maps.googleapis.com/maps/api/staticmap?center=" + search + "&zoom=12&size=1000x400");
  $(".main-div").append(map);
  resultsDiv = document.createElement('div');
  resultsDiv.setAttribute('class', 'results-div')
  $('.main-div').after(resultsDiv);

  for(var i = 0; i < response.length; i++){
    result = document.createElement('p');
    result.setAttribute('id', [i])
    $('.results-div').append(result)
    result.innerHTML = (response[i].city + ', '+ response[i].state + ', '+ response[i].country)
    actDescription = document.createElement('p');
    actDescription.innerHTML = response[i].activities[0].description
    $('#' + [i]).append(actDescription)


    linkName = document.createElement('a')
    linkName.innerText = (response[i].name)
    linkName.setAttribute('href', '');
    $('#' + [i]).prepend(linkName)

    if (result) linkName.addEventListener('click', function(event){
      event.preventDefault();
        for (var i = 0; i < response.length; i ++){
          if (this.innerHTML === response[i].name){
            activityDetail(response[i]);
          }
        }
    })

    thumbnail = document.createElement('img');
    thumbnail.setAttribute('src', response[i].activities[0].thumbnail)
    $('#' + [i]).prepend(thumbnail)

  }
};

var activityDetail = function(activity){
  console.log(activity);

};

if (activitySearch) activitySearch.addEventListener('submit', function(event){

  event.preventDefault();
  var search = citySearch.value;
  var activity = activitySelect.value;
    $.ajax({
    type: 'GET',
    dataType: 'json',
    url: "https://trailapi-trailapi.p.mashape.com/?[activities_activity_type_name_eq]=" + activity + "&q[city_cont]=" + search,
    headers: {
          "X-Mashape-Key": "gJlKWIb2kGmshytRUJ5ZFSP2FCc6p1A52h5jsnTgGutAhMEKaP"
        },
  }).done(function(response){
    console.log(response.places);
    searchLoad(search, response.places);
  }).fail(function(){
    console.log("AJAX failed!")
  })

})


var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://a.tiles.mapbox.com/v4/vaalys.f773ae70/page.html?access_token=pk.eyJ1IjoidmFhbHlzIiwiYSI6IlhpVXh3OVkifQ.fZd5vqAIUcraxAKpsoZybA#4/38.00/-97.00', {
    attribution: "Map data &copy; <iframe width='100%' height='500px' frameBorder='0' src='https://a.tiles.mapbox.com/v4/vaalys.f773ae70/attribution,zoompan,zoomwheel,geocoder,share.html?access_token=pk.eyJ1IjoidmFhbHlzIiwiYSI6IlhpVXh3OVkifQ.fZd5vqAIUcraxAKpsoZybA'></iframe>",
    maxZoom: 18,
    id: 'vaalys.f773ae70',
    accessToken: 'pk.eyJ1IjoidmFhbHlzIiwiYSI6IlhpVXh3OVkifQ.fZd5vqAIUcraxAKpsoZybA'
}).addTo(map);
