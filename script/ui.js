 
 
 var jq;
 
 if (jQuery) {
    //jq = jQuery;
    
    $(document).ready(
        function() {
            $("#rsvp").click( function() {
                //alert("CLICK!");
                $("body").append('<div class="modalOverlay" id="bgOverlay"></div>');
                
                $("#bgOverlay").click( function() {
                    $("#bgOverlay").remove();
                })
            });
        } 
    );
 }