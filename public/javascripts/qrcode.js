var urlParams = new URLSearchParams(window.location.search);

function saveQRCode() {
    var link = document.createElement('a');
    link.href = urlParams.get("file");
    link.download = urlParams.get("file").endsWith(".png") ? (urlParams.get("restaurant") + ".png") : (urlParams.get("restaurant") + ".jpg");
    document.body.appendChild(link);
    link.click();
}

$(document).ready(function() {
    $('#restaurant').text("Voici le QR Code utilisé pour votre restaurant " + urlParams.get("restaurant") + ":");
    $('#qrcode').attr('src', urlParams.get("file"));

    $("#logoCC").click(function() {
        window.location = "/";
    });
});
