$(document).ready(function() {
//Initial array of sports
var sports = ["hockey", "soccer", "ski", "swimming", "basketball", "rugby", "tennis"];

    // Function for displaying sport gifs
    function renderButtons(){
    // Deleting the sports prior to adding new ones
    $("#sport-buttons").empty();
    //creating a for loop through the array of sports
    for (var i = 0; i < sports.length; i++) {
       // Then dynamicaly generating buttons for each sport in the array
       var a = $("<button>");
       // Adding a class to the button
       a.addClass("sport-btn");
       // Adding attr. the button
       a.attr("data-name", sports[i]);
       a.text(sports[i]);
       $("#sport-buttons").append(a);
   }

}
    // Calling the renderButtons function at least once to display the initial list of sports
    renderButtons();

    // This .on("click") function will trigger the AJAX Call
   $("#add-sport").on("click", function(event) {
   // this allows user to hit Enter to search instead of clicking the button
   event.preventDefault();
   // This line grabs the input from the textbox
   var sport = $("#sport-input").val().trim();
   // Adding the movie from the textbox to our array
   sports.push(sport);
   // Calling renderButtons which handles the processing of the sports array
   renderButtons();
});


    $("#sport-buttons").on("click", "button", function() {
    	event.preventDefault();

      //Empties the images before displaying new GIFs
     $("#gifs").empty(); 
        

    var sport = $(this).attr("data-name");
    console.log(sport);

    
    var queryURL = ("https://api.giphy.com/v1/gifs/search?q=" + sport 
    + "&api_key=zH2VZoYNOHV3zkN5ajxnnCHdnKoA0qc6&limit=10");

    // Perfoming an AJAX GET request to our queryURL

    $.ajax({
    url: queryURL,
    method: "GET"
    })

    // After the data from the AJAX request comes back
    .then(function(response){

    console.log(response);
    var results = response.data;
    
    console.log(results);

    for (var i = 0; i < results.length; i++) {

        // Creating a div to hold the sport
        var sportDiv = $("<div class ='sport'>");

       // Creating and storing an image tag
       var sportImage = $("<img>");
       // For the animated GIF...
       var animatedSrc = results[i].images.fixed_height.url;
       //  For the static GIF...
       var staticSrc = results[i].images.fixed_height_still.url;
        // Adding class and attr. Some will be used as reference for play/pause function
       sportImage.attr("src", staticSrc);
       sportImage.addClass("sportsGiphy");
       sportImage.attr("data-state", "still");
       sportImage.attr("data-still", staticSrc);
       sportImage.attr("data-animate", animatedSrc);
       

        // Storing the rating data
       var rating = results[i].rating;
       var ratingDisplay = $("<p>").text("Rating: " + rating);

       // Displaying the rating
        sportDiv.append(ratingDisplay);
        //Displaying the gifs
        sportDiv.append(sportImage);
        //Prepending the gifs to the "gifs" div
        $("#gifs").prepend(sportDiv);
     
    }
});
});


$(document).on("click", ".sportsGiphy", playPauseGifs);

function playPauseGifs() {
    var state = $(this).attr("data-state");
   if (state === "still") {
     $(this).attr("src", $(this).attr("data-animate"));
     $(this).attr("data-state", "animate");
   } else {
     $(this).attr("src", $(this).attr("data-still"));
     $(this).attr("data-state", "still");
   }
}
});
