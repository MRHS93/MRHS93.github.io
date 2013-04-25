
var SCL = 400;

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


var easeSclT = 10;
var easeScl  = tanh(easeSclT*0.5);

$.easing.speedIn = function(t, millisecondsSince, startValue, endValue, totalDuration) {
    //return (sinh((x - 0.5) * 5) + sinh(-(x - 0.5)) + (sinh(2.5) + Math.sin(-2.5))) /    (sinh(2.5) * 1.82);
    return 0.5*(easeScl + tanh(easeSclT * (t - 0.5)));
};

$.easing.speedOut = function(t, millisecondsSince, startValue, endValue, totalDuration) {
    //return (sinh((x - 0.5) * 5) + sinh(-(x - 0.5)) + (sinh(2.5) + Math.sin(-2.5))) /    (sinh(2.5) * 1.82);
    //return tanh(easeSclT * t);
    return 0.5*(easeScl + tanh(easeSclT * (t - 0.5)));
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

    $("#rsvpForm,#bgOverlay").fadeIn(SCL, 'speedIn');
    //    function() {
            $("#rsvpForm").animate({height:"3px",width:"3px"},0.5 * SCL,  'speedIn',
                function() {
                    $("#rsvpForm").animate({width:w+"px",left:padW+"px",borderWidth:"1px"},2 * SCL,  'speedIn',
                        function() { $("#rsvpForm").animate({height:h+"px",top:padT+"px",borderWidth:"3px"},SCL,  'speedIn',
                            function(){ $("#rsvpContent").fadeIn(0.5 * SCL,  'speedIn' , getFormDataAjax())  }
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
                readGetData();
            }
        } 
    );
 }
 
 function setFormValueWithVal(pName,pVal) {
     if (pVal) {
        $("#"+pName).val(pVal);
     }
}

 function getFormVal(pName) {
    var f = $("#"+pName);
    if (f){
        return f.val();
    } else {
        return 0;
    }
}

function readGetData(){
    var $_GET = {};
    
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }
    
        $_GET[decode(arguments[1])] = decode(arguments[2]);
    });
    
    var em = $_GET["email"];
    if (em){
        setFormValueWithVal("email",em);
    }
}
 
 function getFormDataAjax(){
    var email = getFormVal("email");
    if (email) {
        $.getJSON('http://theycallmecarl.com/mrhs93/rsvp.php?callback=?','intent=0&email=',
            function(res) {
                //console.log("got reply");
                //console.log(res);
                var status = res.status;
                
                if (status === "ok") {
                    var n1 = res.firstname; setFormValueWithVal('firstname',n1);
                    var n2 = res.lastname; setFormValueWithVal('lastname',n2);
                    var em = res.email; setFormValueWithVal('email',em);
                    //var r1 = res.reply1; setFormValueWithVal('',r1);
                    //var r2 = res.reply2; setFormValueWithVal('',r2);
                    
                }
                
    
            }
        );   
    }
 }