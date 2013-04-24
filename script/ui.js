 
 
 var jq;
 
 function rsvpIn() {
    $("body").append('<div class="modalOverlay" id="bgOverlay"></div>');
    $("#bgOverlay").fadeIn(200, function() {
        $('#topDiv').animate({
            //51% for chrome
            height: "50%"
            ,opacity: 1
        }, 400);
        $('#bottomDiv').animate({
            //51% for chrome
            height: "50%"
            ,opacity: 1
        }, 400, function(){
                $('#rsvpOverlay').css({display: "block"}).animate({
                        width: "0%",
                        left: "50%"
                     }, 300);
                }
        );
    });
 }
 
 if (jQuery) {
    //jq = jQuery;
    
    $(document).ready(
        function() {
            $("#rsvp").click( function() {
                //alert("CLICK!");
                
                
                rsvpIn();
            
            /*
                $("#bgOverlay").fadeIn(200, function() {
                    $("#bgOverlay, #rsvpOverlay").click( function() {
                        $("#rsvpOverlay").animate({height:"1%",left:0}, 2000,
                            function() {
                                $("#rsvpOverlay").animate({width:"0%", opacity:0, top:0}, 500,
                                    function() { $("#rsvpOverlay").hide(
                                        function() {
                                            $("#bgOverlay").fadeOut(500).remove();    
                                        }    
                                    ); 
                                });
                            }
                        );
                        
                        
                        
                    });
                    
                    $("#rsvpOverlay").show().css("height","2px").animate({width:"100%",left:0}, 1000,
                        function() {
                            $("#rsvpOverlay").animate({height:"100%", opacity:1, top:0}, 500);
                        }
                    );
                });
            */
                    
                
            });
        } 
    );
 }