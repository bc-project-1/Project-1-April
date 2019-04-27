//Uber Dom manipulation function
function writeUber(response){
    $('.uber-time').val(response.prices[4].duration / 60 + ' minutes');
    $('.uber-cost').val(response.prices[4].high_estimate + ' dollars');
}



// function weatherToDom(city, temp, currWeather){
//     console.log("Dest. Temperature: " + temp)
//     console.log("Dest. Weather: " + currWeather)
//     $("#city").append(city)
//     $("#temp").append(temp)
//     $("#condtions").append(currWeather)
// }

