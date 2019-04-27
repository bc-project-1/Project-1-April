//Uber Dom manipulation function
function writeUber(response){
    $('.uber-time').val(response.prices[4].duration / 60 + ' minutes');
    $('.uber-cost').val(response.prices[4].high_estimate + ' dollars');
}

