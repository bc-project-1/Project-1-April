




// Initialize Firebase
gKey = '';

var config = {
    apiKey: "AIzaSyC3B80wCH3buyVYpREMx1KueJfoGNAgGXo",
    authDomain: "api-keys-f798d.firebaseapp.com",
    databaseURL: "https://api-keys-f798d.firebaseio.com",
    projectId: "api-keys-f798d",
    storageBucket: "api-keys-f798d.appspot.com",
    messagingSenderId: "110897771681"
};
firebase.initializeApp(config);
var database = firebase.database();


firebase.database().ref().once('value').then(function (snapshot) {
    console.log(snapshot);
    gKey = snapshot.node_.children_.root_.value.value_;
});


// GOOGLE GEOLOCATION API
function googleMap() {
    // Note: This example requires that you consent to location sharing when
    // prompted by your browser. If you see the error "The Geolocation service
    // failed.", it means you probably did not give permission for the browser to
    // locate you.
    var map, infoWindow;
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 6
        });
        infoWindow = new google.maps.InfoWindow;

     


        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                console.log(position.coords.latitude);
                console.log(position.coords.longitude);

                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');
                infoWindow.open(map);
                map.setCenter(pos);
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

    var markers = [];

    $(document).ready(function () {     // This event listener calls addMarker() when the map is cli2cked.
        google.maps.event.addListener(map, 'click', function (e) {
            //setMapOnAll(null);
            setMapOnAll(null);
            console.log(e.latLng);
            console.log(e.latLng.lat());
            console.log(e.latLng.lng());
            sessionStorage.setItem("eLat", e.latLng.lat());
            sessionStorage.setItem("eLong", e.latLng.lng());
            placeMarker(e.latLng, map);
        });

        function placeMarker(position, map) {
            var marker = new google.maps.Marker({
                position: position,
                map: map
            });
            markers.push(marker);
            map.panTo(position);
        }
    });

    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }





}

function googleGeolocation() {
    //API Calls
    //var queryURL = "https://cors-anywhere.herokuapp.com/googleapis.com/geolocation/v1/geolocate?key="
    //var queryURL = "https://www.googleapis.com/geolocation/v1/geolocate?key="
    var queryURL = "https://cors-anywhere.herokuapp.com/maps.googleapis.com/maps/api/js?callback=initMap&key=" >
        $.ajax({ url: (queryURL + gKey), method: "GET" })

            .then(function (response) {
                console.log(response);
                // sessionStorage.setItem("sLat", response.lat);
                // sessionStorage.setItem("sLong", response.lon);
                // startMap();

            });
}



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
            //UBER DOM FUNCTION CALL
            console.log(response);
            writeUber(response);

        });
}

// ================== Weather api call ================================================================

function getWeather() {

    var lat= sessionStorage.getItem("eLat");
    var lon= sessionStorage.getItem("eLong");


    var lat = sessionStorage.getItem("eLat");
    var lon = sessionStorage.getItem("eLong");

    queryURL = 'http://api.openweathermap.org/data/2.5/weather?';
    weatherLat = 'lat=' + lat;
    weatherLon = '&lon=' + lon;
    accessKey = '&APPID=0ff132ddd83d15f772c6169f2ee83a2b';
    units = "&units=imperial"

    var lat = sessionStorage.getItem("eLat");
    var lon = sessionStorage.getItem("eLong");
    queryURL = 'http://api.openweathermap.org/data/2.5/weather?';
    weatherLat = 'lat=' + lat;
    weatherLon = '&lon=' + lon;
    accessKey = '&APPID=0ff132ddd83d15f772c6169f2ee83a2b';
    units = "&units=imperial"

    queryURL += weatherLat + weatherLon + units + accessKey;

    $.ajax({ url: queryURL, method: "GET" })
        .then(function (response) {
            var temp = response.main.temp
            var currWeather = response.weather[0].description
            var city = response.name
            console.log("Dest. Temperature: " + temp)
            console.log("Dest. Weather: " + currWeather)
            console.log(response.name)
            $("#city").append(" " + city)
            $("#temp").append(" " + temp)
            $("#currWeather").append(" " + currWeather)
            // weatherToDom()
        });

}

function getTransit() {
    var destinationLat = sessionStorage.getItem("eLat");
    var destinationLon = sessionStorage.getItem("eLong");
    var startingLat = sessionStorage.getItem("sLat");
    var startingLon = sessionStorage.getItem("sLong");

    // test url below - just supply the key at the end
    // queryURL = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=41.896280,-87.618851&destinations=41.950083%2C-87.647746&key=';
    // queryURL = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='
    apiKey = ''
    console.log("before call // transit")
    queryURL += startingLat + "," + startingLon + "&destinations=" + destinationLat + "," + destinationLon + apiKey
    $.ajax({ url: queryURL, method: "GET" })
        .then(function (response) {
            console.log("running");
            console.log(response);
            var transitDuration = response.rows[0].elements[0].duration.text
            var transitDistance = response.rows[0].elements[0].distance.text
            $("#transitDuration").append(transitDuration)
            $("#transitDistance").append(" " + transitDistance)

        });
}

function getWalking() {
    var destinationLat = sessionStorage.getItem("eLat");
    var destinationLon = sessionStorage.getItem("eLong");
    var startingLat = sessionStorage.getItem("sLat");
    var startingLon = sessionStorage.getItem("sLong");
    apiKey = ''
    // test url below- just supply key
    queryURL = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=41.896280,-87.618851&destinations=41.950083%2C-87.647746&mode=walking&key=';
    console.log("before call")
    console.log("walking")

    $.ajax({ url: queryURL, method: "GET" })
        .then(function (response) {
            console.log("running");
            console.log(response);
            var walkingDuration = response.rows[0].elements[0].duration.text
            var walkingDistance = response.rows[0].elements[0].distance.text
            $("#walkingDuration").append(" " + walkingDuration)
            $("#walkingDistance").append(" " + walkingDistance)

        });
}