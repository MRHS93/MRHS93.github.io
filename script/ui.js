 
 
 var jq;
 
 if (jQuery) {
    jq = jQuery;
    
    jq(document).ready(
        function() {
            jq("#rsvp").live('click', function() {
                alert("CLICK!");
            });
        } 
    );
 }