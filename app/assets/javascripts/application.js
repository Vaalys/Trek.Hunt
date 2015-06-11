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
// will pagenate


var activitySearch = document.querySelector("#search")
var activitySelect = document.querySelector("#activity-select")
var citySearch = document.querySelector("#city-search")
var searchDiv = document.querySelector(".search-box")
var mainDiv = document.querySelector(".main-div")
var favorite = document.querySelector(".favorite")

// favorite button that is currently not doing anything
$(".favorite").hide()

var searchLoad = function(search, response){
  searchDiv.style.float = 'left';
  searchDiv.style.margin = '0 0 0 40px';

  mapLoad(search);

  resultsDiv = document.createElement('div');
  resultsDiv.setAttribute('class', 'results-div')
  $('.main-div').after(resultsDiv);

  // favorite button that is currently doing nothing
  $(".favorite").show()

  for(var i = 0; i < response.length; i++){
    result = document.createElement('p');
    result.setAttribute('id', [i])
    $('.results-div').append(result)
    result.innerHTML = (response[i].city)
    if (response[i].state){
      result.innerHTML = (result.innerHTML + ', '+ response[i].state)
    }
    if (response[i].country){
      result.innerHTML = (result.innerHTML + ', '+ response[i].country)
    }

        linkName = document.createElement('a')
        linkName.innerText = (response[i].name)
        $('#' + [i]).prepend(linkName)
    if (response[i].activities[0]){
      if (response[i].activities[0].url){
        linkName.setAttribute('href', response[i].activities[0].url);
      }
    }

      thumbnail = document.createElement('img');
      $('#' + [i]).prepend(thumbnail)
    if (response[i].activities[0]) {
      thumbnail.setAttribute('src', response[i].activities[0].thumbnail)
    }
    else thumbnail.setAttribute('src', "http://www.fredericpierre.fr/wp-content/uploads/2012/06/Nature-1.jpg")


      actDescription = document.createElement('p');
      $('#' + [i]).append(actDescription)
    if (response[i].activities[0]) {
      if (response[i].activities[0].description) {
      actDescription.innerHTML = response[i].activities[0].description
      }
    }
    else actDescription.innerHTML = "Directions: " + response[i].directions

    //        clicking on the object to give you the ajax info, figure out how to save this YO
    // if (result) linkName.addEventListener('click', function(event){
    //   event.preventDefault();
    //     for (var i = 0; i < response.length; i ++){
    //       if (this.innerHTML === response[i].name){
    //         activityDetail(response[i]);
    //       }
    //     }
    // })
  }
};

var mapLoad = function(search){
  map = document.createElement('img');
  map.setAttribute('src', "https://maps.googleapis.com/maps/api/staticmap?center=" + search + "&zoom=12&size=700x400");
  map.setAttribute('class', 'search_map')
  $(".main-div").append(map);
}

var activityDetail = function(activity){
  console.log(activity);
};

if (activitySearch) activitySearch.addEventListener('submit', function(event){
  event.preventDefault();
  $(".results-div").empty();
  $(".search_map").remove();
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

//      first attempt at using Leaflet, with mapbox
// var map = L.map('map').setView([39.49111, -105.09374], 13);
//
// L.tileLayer('https://a.tiles.mapbox.com/v4/vaalys.f773ae70/page.html?access_token=pk.eyJ1IjoidmFhbHlzIiwiYSI6IlhpVXh3OVkifQ.fZd5vqAIUcraxAKpsoZybA#4/38.00/-97.00', {
//     attribution: "Map data &copy; <iframe width='100%' height='500px' frameBorder='0' src='https://a.tiles.mapbox.com/v4/vaalys.f773ae70/attribution,zoompan,zoomwheel,geocoder,share.html?access_token=pk.eyJ1IjoidmFhbHlzIiwiYSI6IlhpVXh3OVkifQ.fZd5vqAIUcraxAKpsoZybA'></iframe>",
//     maxZoom: 18,
//     id: 'vaalys.f773ae70',
//     accessToken: 'pk.eyJ1IjoidmFhbHlzIiwiYSI6IlhpVXh3OVkifQ.fZd5vqAIUcraxAKpsoZybA'
// }).addTo(map);
