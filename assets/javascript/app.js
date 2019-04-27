

$("#submit-destination").on("click", function (event) {
    event.preventDefault();
    //debugger;
    window.location = 'Results.html';
    console.log(sessionStorage.getItem("sLat"))
    console.log(sessionStorage.getItem("sLong"))
    console.log(sessionStorage.getItem("eLat"))
    console.log(sessionStorage.getItem("eLong"))

    sessionStorage.getItem("sLat"), sessionStorage.getItem("sLong"), sessionStorage.getItem("eLat"), sessionStorage.getItem("eLong"),

    getUberApi(sessionStorage.getItem("sLat"), sessionStorage.getItem("sLong"), sessionStorage.getItem("eLat"), sessionStorage.getItem("eLong"));

});


// function weatherToDom(city, temp, currWeather){
//     console.log("Dest. Temperature: " + temp)
//     console.log("Dest. Weather: " + currWeather)
//     $("#city").append(city)
//     $("#temp").append(temp)
//     $("#condtions").append(currWeather)
// }