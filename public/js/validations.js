// 

let monthInput = $("#month");
let yearInput = $("#year");
let cvcInput = $("#cvc");
let form = $("form");
let cardNumber = $("#card_number");

let date = new Date();
let year = date.getFullYear().toString();
let shortYear = year.slice(2, 4);

monthInput.on('input', function(){
    let value = $(this).val();

    if (value.length > 2){
        value = value.slice(0, 2); //cuts out the first two digits
    }

    if (value !== '' && parseInt(value) < 0) {
        value = '01'; //sets min value to 1
    }

    if(parseInt(value) > 12){
        value = '12'; //sets max value to 12
    }
    
    $(this).val(value);
});

monthInput.on('blur', function() {
    let value = $(this).val();
    if (value.length === 1 && parseInt(value) > 0) {
        $(this).val('0' + value);
    } else if (value === '0' || value === '') {
        $(this).val('01');
    }
});

yearInput.on('input', function(){
    let value = $(this).val();

    if (value.length > 2){
        value = value.slice(0, 2);
    }

    if(value.length === 2){
        if(parseInt(value) < parseInt(shortYear)){
            value = shortYear;
        }else{
            value
        }
    }

    $(this).val(value);
});

cvcInput.on('input', function(){
    let value = $(this).val();

    if (value.length > 3){
        value = value.slice(0, 3);
    }

    $(this).val(value); 
});

form.on('submit', function(e) {
    const cvc = cvcInput.val();
    const cardNo = cardNumber.val();
    
    if (!/^\d{3}$/.test(cvc)) { // This block runs if the CVC is NOT exactly 3 digits
      e.preventDefault();
      $(".cvc-error").toggleClass("error");
    }else {
        console.log("Validation passed");
    }

    if (!/^\d{16}$/.test(cardNo)) { // This block runs if the Card number is NOT exactly 16 digits
        e.preventDefault();
        $(".cnumber-error").toggleClass("error");
      }else {
          console.log("Validation passed");
      }
});
