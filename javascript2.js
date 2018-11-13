console.log("hi");

var Topics = ["Burgers", "Pasta", "Pizza", "Desserts"];

    function favoriteFoodButton() {
        $("#buttons-view").empty();
        for (var i = 0; i < Topics.length; i++) {

            var a = $("<button>");
            a.addClass("food-btn");
            a.attr("food-name", Topics[i]);
            a.text(Topics[i]);
            $("#buttons-view").append(a);
        }
    }


    $("#add-food").on("click", function (event) {
        event.preventDefault();

        var food = $("#food-input").val().trim();


        Topics.push(food);

        favoriteFoodButton();
    });

    //  $(document).on("click", ".food-btn", favoriteFoodButton);


    favoriteFoodButton();



    $("#buttons-view").on("click", "button", function () {
        var Topic = $(this).attr("food-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            Topic + "&api_key=cXoqpcJWM4PBynA5xExMQB2wEaiUte6d&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data

            for (var i = 0; i < results.length; i++) {

                var foodDiv = $("<div>");
                var p = $("<p>");
                p.text("rating: " + results[i].rating);

                var rating = results[i].rating;
                var foodImage = $("<img>");

                foodImage.attr("src", results[i].images.fixed_height_still.url);
                foodImage.attr("data-still", results[i].images.fixed_height_still.url);
                foodImage.attr("data-animate", results[i].images.fixed_height.url);
                foodImage.attr("data-state", "still");
                foodImage.addClass("gif");

                foodDiv.append(p);
                foodDiv.append(foodImage);

                $("#gifs-appear-here").prepend(foodDiv);

            }
        });
    });


    $("#gifs-appear-here").on("click", ".gif", function () {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
