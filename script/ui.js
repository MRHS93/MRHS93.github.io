 
 
 
 function rsvpIn() {
    $("body").append('<div class="modalOverlay" id="bgOverlay"></div>');
    //$("rsvpOverlay").show();
    //$("#bgOverlay").fadeIn(200);
    
    $("#rsvpForm,#bgOverlay").fadeIn(400,
        function() {
            $("#rsvpForm").animate({height:"3px",width:"3px",opacity:1,margin:"50% auto",top:"-3px"},400,
                function() {
                    $("#rsvpForm").animate({width:"50%",left:"25%",borderWidth:"1px"},400,
                        function() { $("#rsvpForm").animate({height:"50%",borderWidth:"3px",margin:"25% auto"},400,
                            function(){ $("#rsvpContent").fadeIn(200) }
                        )}
                    );
                }
            );
        }
    );

 }
 
function rsvpOut() {
    $("body").append('<div class="modalOverlay" id="bgOverlay"></div>');
    //$("rsvpOverlay").show();
    //$("#bgOverlay").fadeIn(200);
    
    
    $("#rsvpContent").fadeOut(200,
        function() {
            $("#rsvpForm").animate({height:"3px",margin:"50% auto",top:"-3px",borderWidth:"0"},400,
                function() {
                    $("#rsvpForm").animate({width:"3px",left:"50%"},400,
                        function() { $("#bgOverlay,#rsvpForm").fadeOut(200) }
                    );
                }
            );
        }
    );

 }
 
 if (jQuery) {
    
    
    $(document).ready(
        function() {
            //alert("ready");
            //rsvp = $("#rsvpForm");
            if (!$("#rsvpForm")) {
                alert("nothing!");
            }
            $("#rsvpForm").click( function() {
                alert("CLICK!");
                //rsvpIn();
            });
            
            $("#rsvpExit").click(
                function() {
                    rsvpOut();
                }    
            );
        } 
    );
 }