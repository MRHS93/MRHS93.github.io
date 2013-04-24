 
 function min(a,b) {
    if (a > b) return b;
    else return a;
 }
 
 function rsvpIn() {
    $("body").append('<div class="modalOverlay" id="bgOverlay"></div>');
    var hTot = $(window).height();
    var wTot = $(window).width();
    var w = min(400,wTot * 0.5);
    var h = min(300,hTot * 0.5);
    var padT = (hTot - h)/2.0;
    var padW = (wTot - w)/2.0;
    
    $("#rsvpForm").css("top",hTot/2.0 - 1.5+"px").css("left",wTot/2.0 - 1.5+"px");

    $("#rsvpForm,#bgOverlay").fadeIn(200,
        function() {
            $("#rsvpForm").animate({height:"3px",width:"3px",opacity:1},200,
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
    var hTot = $(window).height();
    var wTot = $(window).width();
    var w = min(400,wTot * 0.5);
    var h = min(300,hTot * 0.5);
    var padT = (hTot - h)/2.0;
    var padW = (wTot - w)/2.0;
    
    $("#rsvpContent").fadeOut(200,
        function() {
            $("#rsvpForm").animate({height:"3px",top:(hTot/2.0 - 1.5) +"px",borderWidth:"0"},400,
                function() {
                    $("#rsvpForm").animate({width:"3px",left:(wTot/2.0-1.5)+"px"},400,
                        function() { $("#bgOverlay,#rsvpForm").fadeOut(200 , function(){$("#bgOverlay").remove();}) }
                    );
                }
            );
        }
    );
 }
 
 function setupEventHandlers(){
    $("#rsvp").click( function() {
        rsvpIn();
    });
    
    
    $("#rsvpExit").click(
        function() {
            rsvpOut();
        }    
    );
    
    $("#rsvp").submit(
        function() {
            var frm = $("#rsvpForm");
            if (frm) {
                saveRSVPcookie();
            }            
            
            return false;
        }
    ).change(
        function() {
            
        }
    );
 }
 
 
 if (jQuery) {
    $(document).ready(
        function() {
            setupEventHandlers();
            var frm = $("#rsvpForm");
            if (frm) {
                //fillForm(frm);
            }
        } 
    );
 }