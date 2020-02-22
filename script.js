var zipcode = $("#searchBar").val();
const jokeE1 = document.getElementById("dadJokes");
console.log("uh script works?")
$(".resultsContainer").hide();
$("#mapDisplay").hide();
$("#dadJokes").hide();
$("#jokeButton").click(function(){
  console.log("ay g u want a dad joke :>")
  displayDadJoke();
})
var x;
var y;

$("#searchButton").click(function(e){
    $("#mapDisplay").show();
  $(".resultsContainer").show();

  console.log("clicked the search button GO")
  var zipcode = $("#searchBar").val().trim();
  console.log(zipcode);
  getBreweries(zipcode);
  e.preventDefault();

  //uh trying to get the lat lon from da zippy...
  var queryURL = "https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/Vt32WkzfKroF1XG9RY4ZvTY3gT1sJTR1MqWGOIxWUg8ZMc57gg6mOPzvLsZ5SFhI/info.json/" + zipcode + "/degrees"
  $.ajax({
    url: queryURL,
    crossDomain: true,
    headers: {"Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,},
    type: "GET"
  }).then(function(response) {

    x=response.lat;
    y=response.lng;
    console.log(response.lat);
    console.log(response.lng);
    
  searchMap();
  });
  //done with that ... 

})
const getBreweries = zipcode => {
  $.ajax({
    url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=brewery&location=${zipcode}`,
    method: "GET",
    headers: {
      'Authorization':
        "Bearer bvfT3iWDcpR-4Muk889vmNcivjsGMRCxzB3k1TagHYfLTnUunGHZq5fWVIOSNm6L5dwwzoXTsBmkU42-YT353irMrVF8kdd_kGAUSHLc-0dnINfstgnOCmw7qC0_XnYx",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    }
  })
    .then(function(response) {
      console.log(response);
      // do something with the response
      console.log(response.businesses[0].url)
      console.log(response.businesses[0].alias)
      $("#thumbnail0").attr("src", response.businesses[0].image_url)
      $("#listItem0").text(response.businesses[0].name);
      $("#listItemLink0").attr("href", response.businesses[0].url);
      $("#result0Address").text(response.businesses[0].location.display_address)
      $("#result0PhoneNumber").text(response.businesses[0].display_phone)
      console.log(response.businesses[1].name)
      $("#thumbnail1").attr("src", response.businesses[1].image_url)
      $("#listItem1").text(response.businesses[1].name);
      $("#listItemLink1").attr("href", response.businesses[0].url);
      $("#result1Address").text(response.businesses[1].location.display_address)
      $("#result1PhoneNumber").text(response.businesses[1].display_phone)
      console.log(response.businesses[2].name)
      $("#thumbnail2").attr("src", response.businesses[2].image_url)
      $("#listItem2").text(response.businesses[2].name);
      $("#listItemLink2").attr("href", response.businesses[0].url);
      $("#result2Address").text(response.businesses[2].location.display_address)
      $("#result2PhoneNumber").text(response.businesses[2].display_phone)
      console.log(response.businesses[3].name)
      $("#thumbnail3").attr("src", response.businesses[3].image_url)
      $("#listItem3").text(response.businesses[3].name);
      $("#listItemLink3").attr("href", response.businesses[0].url);
      $("#result3Address").text(response.businesses[3].location.display_address)
      $("#result3PhoneNumber").text(response.businesses[3].display_phone)
      console.log(response.businesses[4].name)
      $("#thumbnail4").attr("src", response.businesses[4].image_url)
      $("#listItem4").text(response.businesses[4].name);
      $("#listItemLink4").attr("href", response.businesses[0].url);
      $("#result4Address").text(response.businesses[4].location.display_address)
      $("#result4PhoneNumber").text(response.businesses[4].display_phone)
    })
    .catch(function(e) {
      console.log("HERE IS THE RESPONSE URL" + response.businesses[0].url);
      console.log(e);
    });
};


// THIS IS ALL THE STUFF PERTAINING TO THE GOOGLE MAP DISPLAY YO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// reference to the map in html
function searchMap(){
init();
console.log("trying to display map info PLS GOD")
var map = document.getElementById("mapDisplay");
function init() {
  console.log("initialized the script...")
  document.getElementById("mapDisplay").textContent = "Loading ...";
  showPosition();
}
var map;

function showPosition() {

  console.log(x);
  console.log(y);
  console.log("hello erik")
  const foundLat = x;
  const foundLng = y;

  initMap(foundLat, foundLng);
}

//   this function processes all the google map information
function initMap(lat, lon) {
  map = new google.maps.Map(document.getElementById("mapDisplay"), {
    zoom: 13,
    center: { lat, lng: lon },
  });
}
}
//THIS CONCLUDES ALL THE STUFF PERTAINING TO THE MAP DISPLAY API !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!






async function displayDadJoke() {
  $("#dadJokes").show();
  console.log("here's yer dad joke G")
  const jokeRes = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json"
    }
  });
  const joke = await jokeRes.json();
console.log(joke.joke)
  $("#dadJokes").text(joke.joke);
}