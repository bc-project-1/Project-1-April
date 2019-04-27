//Uber Dom manipulation function
function writeUber(response){
    $('.uber-time').val(response.prices[4].duration / 60 + ' minutes');
    $('.uber-cost').val(response.prices[4].high_estimate + ' dollars');
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

