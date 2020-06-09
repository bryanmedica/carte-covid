$(document).ready(function() {
    $('#uploadFile').on("change", function() {
        $("#labelFile").text("Le fichier est prêt !");
        $("#uploadButton").css({"background-color": "rgb(72, 180, 0)", "border-color" : "rgb(72, 180, 0)"})
    });

    $("#submitButton").mouseover(function() {
        if ($("#restaurantName").val() === "" || !($("#uploadFile").val()))
            $(this).css({"background-color": "#fc5151", "border-color" : "#fc5151"});
        else
            $(this).css({"background-color": "#48b400", "border-color" : "#48b400"});
    }).mouseout(function() {
        $(this).css({"background-color": "#5f7e96", "border-color" : "#5f7e96"});
    });

    $("#submitButton").click(function() {
        if ($("#restaurantName").val() === "" || !($("#uploadFile").val()))
            event.preventDefault();
    });

    $("#logoCC").click(function() {
        window.location = "/";
    });

});