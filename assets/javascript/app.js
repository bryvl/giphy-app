var topics = ['mars', 'black holes', 'galaxies', 'supernovas', 'cosmos', 'andromeda', 'sun', 'Futurama'];

makeBtn();

$("#create-button").on("click", function() {
    //Create Button from Form
    var topicBtn = $('<button>');
    var userInput = $('#topic-input').val().trim();
    topicBtn.text(userInput);
    topicBtn.attr('data-topic', userInput);
    topicBtn.addClass('topic-btn');

    //append to html
    $('#topic-buttons').append(topicBtn);

    //push topic to array
    topics.push(userInput);
    console.log(topics);
    //test to make sure data-animal is correctly set
    console.log(topicBtn.attr('data-topic'));
    // makeBtn();
});

//idky but this button click below would only function with three parameters as shown. If .topic-btn was selected in jQuery $('.topic-btn'), it would not work.
$('#topic-buttons').on("click", ".topic-btn", function() { 
    
    var topic = $(this).attr('data-topic');

    //build query url
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=byQSUXKSdCCsTNdu457PiiLP8PfFJUOQ&limit=10";
    //promise for the data-topic of the button clicked
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response){
        var results = response.data;
        console.log(response);

        //Group the Div's from a particular search
        var topicContainer = $("<div class='topic-container'>");
        var topicHeader = $("<div class='topic-header'>" + topic + "</div>");
        topicContainer.append(topicHeader);

        //Loop through returned imgs, give them attributes, append them to proper container
        for(var i = 0; i < results.length; i++) {
            
            var topicDiv = $('<div class="topic-box">');
            var p = $("<p class='rating'>").text("Rating: " + results[i].rating);
            var stillImg = results[i].images.fixed_height_still.url;
            var animImg = results[i].images.fixed_height.url;
            //gif img
            var topicImage = $("<img>");
            topicImage.addClass('gif');
            topicImage.attr("src", stillImg);
            topicImage.attr("data-still", stillImg);
            topicImage.attr("data-animate", animImg);
            topicImage.attr("data-state", 'still');
            
            
            topicDiv.append(topicImage);
            topicDiv.append(p);

            
            $('#topics').prepend(topicContainer);
            $(topicContainer).append(topicDiv);
            
        }
        $('.gif').on('click', function(){
            var state = $(this).attr('data-state');
            var imgSrc = $(this).attr('src');

            if( state === 'still') {
                var clickedImg = $(this);
                var animatedURL = clickedImg.attr('data-animate');
                clickedImg.attr('src', animatedURL);
                clickedImg.attr('data-state', 'animated');
            }
            else {
                var clickedImg = $(this);
                var stillURL = clickedImg.attr('data-still');
                clickedImg.attr('src', stillURL);
                clickedImg.attr('data-state', 'still');
            }
        })
        

    });

});

//Functions
function makeBtn(){
    for(var i = 0; i < topics.length; i++){
        var topicBtn = $('<button>');
        topicBtn.text(topics[i]);
        topicBtn.attr('data-topic', topics[i]);
        topicBtn.addClass('topic-btn');

        //append to html
        $('#topic-buttons').append(topicBtn);

        
        console.log(topics);
        //test to make sure data-animal is correctly set
        console.log(topicBtn.attr('data-topics'));
    }
}