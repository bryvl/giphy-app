

$("#create-button").on("click", function() {
    //Create Button from Form
    var animalBtn = $('<button>');
    var userInput = $('#animal-input').val().trim();
    animalBtn.text(userInput);
    animalBtn.attr('data-animal', userInput);
    animalBtn.addClass('animal-btn');

    //append to html
    $('#animal-buttons').append(animalBtn);
    //test to make sure data-animal is correctly set
    console.log(animalBtn.attr('data-animal'));
});

//idky but this button click below would only function with three parameters as shown. If .animal-btn was selected in jQuery $('.animal-btn'), it would not work.
$(document).on("click", ".animal-btn", function() { 
    
    var animal = $(this).attr('data-animal');

    //build query url
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=byQSUXKSdCCsTNdu457PiiLP8PfFJUOQ&limit=4";
    //promise for the data-animal of the button clicked
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response){
        var results = response.data;
        console.log(response);

        for(var i = 0; i < results.length; i++) {
            
            var animalDiv = $('<div>');
            var p = $("<p>").text("Rating: " + results[i].rating);
            //gif img
            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height.url);
            
            animalDiv.append(p);
            animalDiv.append(animalImage);

            $("#animals").prepend(animalDiv);
        }
    });

});