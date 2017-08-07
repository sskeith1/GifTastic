var topics = ["Squid", "Octopus", "Dumbo Octopus", "Cuttlefish", "Stingray", "Manta Ray", "Axolotl", "Dolphin", "Otter", "Seal", "Shark", "Whale Shark", "Thresher Shark", "Coral", "Sea Anemones", "Eel", "Blue Dragon Fish", "Sea Horse", "Sea Turtle", "The useless Anemone"];

//add for loop for this with each new "topic"
console.log("Animals array starting with " + topics);


//Create initial Buttons
	function makeButtons() {
		$("#buttons-view").empty();

		for(var i=0; i<topics.length; i++) {
			var a=$("<button>");
				console.log(a);

			a.addClass("animal");
			a.attr("data-name", topics[i]);
			a.text(topics[i]);

			$("#buttons-view").append(a);
		}
	}

//Create New Buttons
	$("#add-gif").on("click", function(event) {
		event.preventDefault();
		var gif = $("#search-input").val();
			console.log("Gif of: ", gif);

		topics.push(gif);
			console.log(topics);

		makeButtons();
		 
	});

	$(".animal").on("click", function(event) {
		console.log("data-name");
	});


$(document).ready(function() {
	makeButtons();

});


//Create Gifs on button click
	$(document).on("click", ".animal", function() {
		$("#results").empty();
		var animal = $(this).attr("data-name");
		console.log(animal + "z");

		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal
		 + "&api_key=f25b886d586b4b43ad6c72e71822af7d&limit=10";

		 $.ajax({
		 	url: queryURL,
		 	method: "GET"
		 })
		 	.done(function(response) {
		 		console.log(queryURL);
		 		console.log(response);

		 		var results = response.data;

		 		for (var i=0; i<results.length; i++) {
		 			var animalDiv = $("<div>");
		 			var p = $("<p>").text("Rating: " + results[i].rating);
		 			var animalImage = $("<img>").attr("class", "gifTrigger");
		 			
			 			animalImage.attr("src", results[i].images.fixed_height_still.url);
			 			animalImage.attr("data-still", results[i].images.fixed_height_still.url);
			 			animalImage.attr("data-state", "still");
			 			animalImage.attr("data-animate", results[i].images.fixed_height.url);

			 			animalDiv.append(p);
			 			animalDiv.append(animalImage);

		 			$("#results").prepend(animalDiv);
		 		

				

				}


		 	});
	});


//Must click on Gifs to run
					$(document).on("click", ".gifTrigger", function() {
						var state = $(this).attr("data-state");
						
						 if (state == "still") {
						 	$(this).attr("src", $(this).data("animate"));
			         		$(this).attr("data-state", "animate");
			       		 } else {
			          		$(this).attr("src", $(this).data("still"));
			          		$(this).attr("data-state", "still");
			       		};
	      
					});










