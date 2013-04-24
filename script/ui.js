 
 
 var jq;
 
 if (jQuery) {
    //jq = jQuery;
    
    $(document).ready(
        function() {
            $("#rsvp").click( function() {
                //alert("CLICK!");
                $("body").append('<div class="modalOverlay" id="bgOverlay"></div>');
                $("#bgOverlay #rsvpOverlay").click( function() {
                    $("#rsvpOverlay").animate({height:"1%",left:0}, 2000,
                        function() {
                            $("#rsvpOverlay").animate({width:"0%", opacity:0, top:0}, 500,
                                function() { $("#rsvpOverlay").hide(); }
                            );
                        }
                    );
                    
                    $("#bgOverlay").fadeOut(500).remove();
                    
                });
                
                $("#rsvpOverlay").show().css("height","2px").animate({width:"100%",left:0}, 1000,
                    function() {
                        $("#rsvpOverlay").animate({height:"100%", opacity:1, top:0}, 500);
                    }
                );
            
                    
                
            });
        } 
    );
 }