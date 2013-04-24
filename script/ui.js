 
 function min(a,b) {
    if (a > b) return a;
    else return b;
 }
 
 function rsvpIn() {
    $("body").append('<div class="modalOverlay" id="bgOverlay"></div>');
    //$("rsvpOverlay").show();
    //$("#bgOverlay").fadeIn(200);
    var hTot = $(window).height();
    var wTot = $(window).width();
    var w = min(400,wTot * 0.5);
    var h = min(300,hTot * 0.5);
    var padT = (hTot - h)/2.0;
    var padW = (wTot - w)/2.0;
    
    $("#rsvpForm,#bgOverlay").fadeIn(400,
        function() {
            $("#rsvpForm").css("top",hTot/2.0 - 1.5+"px");
            $("#rsvpForm").animate({height:"3px",width:"3px",opacity:1},400,
                function() {
                    $("#rsvpForm").animate({width:w+"px",left:padW+"px",borderWidth:"1px"},400,
                        function() { $("#rsvpForm").animate({height:h+"px",top:padT+"px",borderWidth:"3px"},400,
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

            $("#rsvp").click( function() {
                //alert("CLICK!");
                rsvpIn();
            });
            
            
            $("#rsvpExit").click(
                function() {
                    rsvpOut();
                }    
            );
            
        } 
    );
 }