//Uber info set up
//CHANGE: pull values from input site
var sLat = '';
var sLong = '';
var eLat = '';
var eLong = '';

ipLookUp()

//User location through IP api
function ipLookUp() {
    $.ajax('http://ip-api.com/json')
        .then(
            function success(response) {
                console.log(response);
                console.log(response.lat);
                console.log(response.lon);
                sLat = response.lat;
                sLong = response.lon;
                startMap();
            },

            function fail(data, status) {
                console.log('Request failed.  Returned status of',
                    status);
            }
        );
}


//Google Map Variables and Calls
function startMap() {
    var myLatlng = new google.maps.LatLng(sLat, sLong);
    var myOptions = { zoom: 13, center: myLatlng }
    var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

    google.maps.event.addListener(map, 'click', function (event) {
        var response = event.latLng;
        eLat = response.lat();
        eLong = response.lng();
        console.log(response);
        console.log(response.lat());
        console.log(response.lng());
        //DELETE LATER: added for testing 
        getUberApi(sLat, sLong, eLat, eLong);
    });

}








// Uber api call
//CALL: when submit button is clicked
function getUberApi(startLat, startLong, endLat, endLong) {
    queryURL = 'https://cors-anywhere.herokuapp.com/api.uber.com/v1.2/estimates/price?';
    accessKey = '&server_token=ItD3_RRwUZCvBw5a4gEmtVwnD9GuOzn2Q2stHyee';
    startLatitude = 'start_latitude=' + startLat;
    startLongitude = '&start_longitude=' + startLong;
    endLatitude = '&end_latitude=' + endLat;
    endLongitude = '&end_longitude=' + endLong;

    queryURL += startLatitude + startLongitude + endLatitude + endLongitude + accessKey;

    $.ajax({ url: queryURL, method: "GET" })
        .then(function (response) {
            //ADD functionality to results page
            console.log(response);
        });
}