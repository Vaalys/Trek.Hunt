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
    $('.results-div').append(result)
    result.innerHTML = (response[i].name)

    // prepend innerHTML of $('p')
    // $('p').appendChild(NodeChild[0])
    // thumbnail = document.createElement('img');
    // thumbnail.setAttribute('src', response[i].activities[0].thumbnail)
    // $('p').append(thumbnail)

    if (result) result.addEventListener('click', function(event){
      event.preventDefault();
        for (var i = 0; i < response.length; i ++){
          if (this.innerHTML === response[i].name){
            activityDetail(response[i]);

          }
        }
    })

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
