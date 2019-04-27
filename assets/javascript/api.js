



//User location through IP api
function ipLookUp() {
    $.ajax('http://ip-api.com/json')
        .then(
            function success(response) {
               //DELETE logs later
                console.log(response);
                console.log(response.lat);
                console.log(response.lon);

                sessionStorage.setItem("sLat", response.lat);
                sessionStorage.setItem("sLong", response.lon);
                startMap();
            },

            function fail(data, status) {
                console.log('Request failed.  Returned status of',
                    status);
            }
        );
}


// ================== Google Map Variables and Calls ================================================


function startMap() {
    var myLatlng = new google.maps.LatLng(sessionStorage.getItem("sLat"), sessionStorage.getItem("sLong"));
    var myOptions = { zoom: 13, center: myLatlng }
    var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

    google.maps.event.addListener(map, 'click', function (event) {
        var response = event.latLng;
        sessionStorage.setItem("eLat", response.lat());
        sessionStorage.setItem("eLong", response.lng());
        //DELETE later
        console.log(response);
        console.log(response.lat());
        console.log(response.lng());
    });

}









// Uber api call

// ================== Uber api call ================================================================


function getUberApi(startLat, startLong, endLat, endLong) {
    var queryURL = 'https://cors-anywhere.herokuapp.com/api.uber.com/v1.2/estimates/price?';
    var accessKey = '&server_token=ItD3_RRwUZCvBw5a4gEmtVwnD9GuOzn2Q2stHyee';
    var startLatitude = 'start_latitude=' + startLat;
    var startLongitude = '&start_longitude=' + startLong;
    var endLatitude = '&end_latitude=' + endLat;
    var endLongitude = '&end_longitude=' + endLong;

    queryURL += startLatitude + startLongitude + endLatitude + endLongitude + accessKey;

    $.ajax({ url: queryURL, method: "GET" })
        .then(function (response) {
            //ADD functionality to results page
            console.log(response);
        });
}


// ================== Weather api call ================================================================

var lat= "41.945497599999996";
var lon= "-87.6486656";
function getWeather() {
queryURL = 'http://api.openweathermap.org/data/2.5/weather?';
weatherLat = 'lat=' + lat;
weatherLon = '&lon=' + lon;
accessKey = '&APPID=0ff132ddd83d15f772c6169f2ee83a2b';
units = "&units=imperial"
queryURL += weatherLat + weatherLon + units + accessKey;

$.ajax({ url: queryURL, method: "GET" })
    .then(function (response) {
        console.log(response);   
        console.log(response.main.temp);
        var temp =  response.main.temp
        var currWeather = response.weather[0].description
        console.log("Dest. Temperature: " + temp)
        console.log("Dest. Weather: " + currWeather)  

    });
}