
//Initial array of sports
var sports = ["hockey", "soccer", "ski", "swimming", "basketball", "rugby", "tennis"];

function displaySportGif() {

    var sport = $(this).attr("data-name");
    console.log(sport);

    // var querryURL = $.get("http://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=zH2VZoYNOHV3zkN5ajxnnCHdnKoA0qc6&limit=10");
    // console.log(querryURL);

    // querryURL.done(function(data) { console.log("success got data", data); });

// or
    var querryURL = ("https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=zH2VZoYNOHV3zkN5ajxnnCHdnKoA0qc6&limit=10");
// Perfoming an AJAX GET request to our queryURL
    $.ajax({
    url: querryURL,
    method: "GET"
    })

// After the data from the AJAX request comes back
.then(function(response){

    // Creating a div to hold the movie
    var sportDiv = $("<div class ='sport'>"); 

    // Storing the rating data
    var rating = response.Rated;

    // Creating an element to have the rating displayed
    var ratingDisplay = $("<p>").text("Rating: " + rating);

    // Displaying the rating
    sportDiv.append(ratingDisplay);

    // Saving the image_original_url property
    var imageURL = response.data[0].url;
    console.log(response.data);
    // document.write (imageURL);

    // Creating and storing an image tag
    var sportImage = $("<img>");
    
    // Setting the sportImage src attribute to imageUrl
    sportImage.attr("src", imageURL);
    sportImage.attr("alt", "sport image");
    $("#sports").append(imageURL);

});
}

// Function for displaying sport gifs
function renderButtons(){
     // Deleting the sports prior to adding new movies
    $("sport-buttons").empty();
    //creating a for loop through the array of sports
    for (var i = 0; i < sports.length; i++) {
        // Then dynamicaly generating buttons for each sport in the array
        var a = $("<button>");
        // Adding a class to the button
        a.addClass("sport-btn");
        a.attr("data-name", sports[i]);
        a.text(sports[i]);
        $("#sport-buttons").append(a);
    }

}

// This .on("click") function will trigger the AJAX Call
$("#add-sport").on("click", function(event) {
    // this allows user to hit Enter to search instead of clicking the button
    event.preventDefault();
    // This line grabs the input from the textbox
    var sport = $("#sport-input").val().trim();
    // Adding the movie from the textbox to our array
    sports.push(sport);
    console.log(sports);
    // Calling renderButtons which handles the processing of the sports array
    renderButtons();
});

$(document).on("click", ".sport-btn", displaySportGif);

renderButtons();


// var querryURL = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=zH2VZoYNOHV3zkN5ajxnnCHdnKoA0qc6&limit=10");
// querryURL.done(function(data) { console.log("success got data", data); });
