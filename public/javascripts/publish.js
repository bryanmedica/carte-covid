$(document).ready(function() {
    $( "#publishFile").submit(function( event ) {
        console.log($('input[type=text]').val());
        console.log($('input[type=file]').val());
        event.preventDefault();
      });
});
