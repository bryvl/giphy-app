//URL 
var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=byQSUXKSdCCsTNdu457PiiLP8PfFJUOQ";

$("#create-button").on("click", function() {
    //Create Button from Form
    var animalBtn = $('<button>');
    var userInput = $('#animal-input').val().trim();
    animalBtn.text(userInput);
    animalBtn.attr('data-animal', userInput);
    animalBtn.addClass('button');

    //append to html
    $('#animal-buttons').append(animalBtn);
    //test to make sure data-animal is correctly set
    console.log(animalBtn.attr('data-animal'));

});