 
 
 var jq;
 
 if (jQuery) {
    jq = jQuery;
    
    jq(document).ready(
        function() {
            jq("#rsvp").click( function() {
                alert("CLICK!");
            });
        } 
    );
 }