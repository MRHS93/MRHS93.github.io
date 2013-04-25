
var SCL = 250;

function min(a,b) {
    if (a > b) return b;
    else return a;
 }
 
function sinh(aValue) {
    var myTerm1 = Math.pow(Math.E, aValue);
    var myTerm2 = Math.pow(Math.E, -aValue);
    return (myTerm1-myTerm2)/2;
}

function cosh(aValue) {
    var myTerm1 = Math.pow(Math.E, aValue);
    var myTerm2 = Math.pow(Math.E, -aValue);
    return (myTerm1+myTerm2)/2;
}

function tanh(aValue) {
    return sinh(aValue) / cosh(aValue);
}


var easeSclT = 3;
var easeScl  = 1.0 / sinh(easeSclT);

$.easing.speedIn = function(t, millisecondsSince, startValue, endValue, totalDuration) {
    //return (sinh((x - 0.5) * 5) + sinh(-(x - 0.5)) + (sinh(2.5) + Math.sin(-2.5))) /    (sinh(2.5) * 1.82);
    return easeScl * sinh(easeSclT * t);
};

$.easing.speedOut = function(t, millisecondsSince, startValue, endValue, totalDuration) {
    //return (sinh((x - 0.5) * 5) + sinh(-(x - 0.5)) + (sinh(2.5) + Math.sin(-2.5))) /    (sinh(2.5) * 1.82);
    return tanh(easeSclT * t);
};
 
 function rsvpIn() {
    $("body").append('<div class="modalOverlay" id="bgOverlay"></div>');
    var hTot = $(window).height();
    var wTot = $(window).width();
    var w = min(400,wTot * 0.5);
    var h = min(300,hTot * 0.5);
    var padT = (hTot - h)/2.0;
    var padW = (wTot - w)/2.0;
    
    $("#rsvpForm").css("top",hTot/2.0 - 1.5+"px").css("left",wTot/2.0 - 1.5+"px");

    $("#rsvpForm,#bgOverlay").fadeIn(0.5 * SCL, 'speedIn');
    //    function() {
            $("#rsvpForm").animate({height:"3px",width:"3px"},0.5 * SCL,  'speedIn',
                function() {
                    $("#rsvpForm").animate({width:w+"px",left:padW+"px",borderWidth:"1px"},2 * SCL,  'speedIn',
                        function() { $("#rsvpForm").animate({height:h+"px",top:padT+"px",borderWidth:"3px"},SCL,  'speedIn',
                            function(){ $("#rsvpContent").fadeIn(0.5 * SCL,  'speedIn') , fillForm( ); }
                        )}
                    );
                }
            );
    //    }
    //);

 } 
 
function rsvpOut() {
    $("body").append('<div class="modalOverlay" id="bgOverlay"></div>');
    var hTot = $(window).height();
    var wTot = $(window).width();
    var w = min(400,wTot * 0.5);
    var h = min(300,hTot * 0.5);
    var padT = (hTot - h)/2.0;
    var padW = (wTot - w)/2.0;
    
    $("#rsvpContent").fadeOut(SCL,
        function() {
            $("#rsvpForm").animate({height:"3px",top:(hTot/2.0 - 1.5) +"px",borderWidth:"0"}, SCL ,'speedOut',
                function() {
                    $("#rsvpForm").animate({width:"3px",left:(wTot/2.0-1.5)+"px"}, 2 * SCL,'speedOut',
                        function() { $("#bgOverlay,#rsvpForm").fadeOut(SCL ,'speedOut' , function(){$("#bgOverlay").remove();}) }
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
    
    $("#rsvpFormData").submit(
        function(e) {
            e.preventDefault();
            
            var frm = $("#rsvpFormData");
            if (frm) {
                saveRSVPcookie();
            }            
            
            return false;
        }
    );
    
    $("#rsvp").change(
        function() {
            
        }
    );
 }
 
 
 if (jQuery) {
    $(document).ready(
        function() {
            setupEventHandlers();
            var frm = $("#rsvpFormData");
            if (frm) {
                //fillForm(frm);
            }
        } 
    );
 }