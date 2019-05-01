//Uber Dom manipulation function
function writeUber(response){
    $('.uber-time').text(response.prices[4].duration / 60 + ' minutes');
    $('.uber-cost').text(response.prices[4].high_estimate + ' dollars');
}


function addFav(){
   var fav = {
       label: $('#fav-label').val(),
       lat: sessionStorage.getItem("eLat"),
       lon: sessionStorage.getItem("eLong")
   }
   
   var a = [];
    console.log('**********',localStorage.getItem('favorites') );
       
    if(localStorage.getItem('favorites') != null){
        a = JSON.parse(localStorage.getItem('favorites'));
    }
    
    a.push(fav);
    
    localStorage.setItem('favorites', JSON.stringify(a));
}


//make fav list
$(".openbtn").on("click", function (event) {
    event.preventDefault();
    $("#fav-list").empty();
    var arr = JSON.parse(localStorage.getItem('favorites'));
    for (var i = 0; i < arr.length; i++) {
        $('<a>', {
            'lat': arr[i].lat,
            'lon': arr[i].lon,
            class: 'fav-item'
        }).text(arr[i].label).appendTo('#fav-list');
    }
});


//on click update destination
$(document).on("click", ".fav-item", updateCoord);
function updateCoord() {
    var latitude = $(this).attr('lat');
    var longitude = $(this).attr('lon');

    sessionStorage.setItem("eLat", latitude);
    sessionStorage.setItem("eLong", longitude);
}



// function weatherToDom(city, temp, currWeather){
//     console.log("Dest. Temperature: " + temp)
//     console.log("Dest. Weather: " + currWeather)
//     $("#city").append(city)
//     $("#temp").append(temp)
//     $("#condtions").append(currWeather)
// }


