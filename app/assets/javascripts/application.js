var activitySearch = document.querySelector("form")
var activitySelect = document.querySelector("#activity-select")
var citySearch = document.querySelector("#city-search")

// var searchLoad = function(search){
//   map = document.createElement('img')
//   map.setAttribute('src', "https://maps.googleapis.com/maps/api/staticmap?center=" + search + "&zoom=12&size=800x400");
//   activitySearch.insertAfter(map)
// };

activitySearch.addEventListener('submit', function(event){
  // map.removeChild
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
    searchLoad(search);
  }).fail(function(){
    console.log("AJAX failed!")
  })

})
