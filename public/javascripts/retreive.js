$(document).ready(function() {
    $("#retreiveButton").mouseover(function() {
        if ($("#restaurantName").val() === "" || $("#menuURL").val() === "")
            $(this).css({"background-color": "#fc5151", "border-color" : "#fc5151"});
        else
            $(this).css({"background-color": "#48b400", "border-color" : "#48b400"});
    }).mouseout(function() {
        $(this).css({"background-color": "#5f7e96", "border-color" : "#5f7e96"});
    });

    $("#retreiveButton").click(function() {
        if ($("#restaurantName").val() === "" || $("#menuURL").val() === "") {
            $("#banner").text("Il manque des informations !");
            $("#banner").css({display: "block"});
            event.preventDefault();
        }
    });

    $("#logoCC").click(function() {
        window.location = "/";
    });

});