



/*
    
*/

if (typeof jQuery == 'undefined') {
    document.write(unescape("%3Cscript src='script/jquery-1.9.1.min.js' type='text/javascript'%3E%3C/script%3E"));
/*    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);    */        
}


/*
defs
*/

var SCL = 200;

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

/*
    EM / PX from https://raw.github.com/filamentgroup/jQuery-Pixel-Em-Converter/master/pxem.jQuery.js
*/

/*-------------------------------------------------------------------- 
 * jQuery pixel/em conversion plugins: toEm() and toPx()
 * by Scott Jehl (scott@filamentgroup.com), http://www.filamentgroup.com
 * Copyright (c) Filament Group
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) or GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 * Article: http://www.filamentgroup.com/lab/update_jquery_plugin_for_retaining_scalable_interfaces_with_pixel_to_em_con/
 * Options:
 scope: string or jQuery selector for font-size scoping	
 * Usage Example: $(myPixelValue).toEm(); or $(myEmValue).toPx();
--------------------------------------------------------------------*/

$.fn.toEm = function(settings){
	settings = jQuery.extend({
		scope: 'body'
	}, settings);
	var that = parseInt(this[0],10),
		scopeTest = jQuery('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: auto; line-height: 1; border:0;">&nbsp;</div>').appendTo(settings.scope),
		scopeVal = scopeTest.height();
	scopeTest.remove();
	return (that / scopeVal).toFixed(8) ;
};


$.fn.toPx = function(settings){
	settings = jQuery.extend({
		scope: 'body'
	}, settings);
	var that = parseFloat(this[0]),
		scopeTest = jQuery('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: auto; line-height: 1; border:0;">&nbsp;</div>').appendTo(settings.scope),
		scopeVal = scopeTest.height();
	scopeTest.remove();
	return Math.round(that * scopeVal) ;
};


/*
Easing
*/

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
 
/*
Show/hide rsvp
*/ 

function getMinRSVPH() {
    var test = $("#rsvpFormData").height();
    alert(test);
    test = Math.max(300,test);
    return test;
}

var minHeight  ;

function rsvpIn() {
    $("body").append('<div class="modalOverlay" id="bgOverlay"></div>');
    var hTot = $(window).height();
    var wTot = $(window).width();
    var w = min(400,wTot * 0.5);
    var h = min( minHeight ,hTot * 0.5);
    var padT = (hTot - h)/2.0;
    var padW = (wTot - w)/2.0;
    
    $("#rsvpForm").css("top",hTot/2.0 - 1.5+"px").css("left",wTot/2.0 - 1.5+"px");

    $("#rsvpForm,#bgOverlay").fadeIn(2.0 * SCL, 'speedIn');
    $("#rsvpForm").animate({height:"3px",width:"3px"},  SCL,  'speedIn',
        function() {
            $("#rsvpForm").animate({width:w+"px",left:padW+"px",borderWidth:"1px"}, 2 * SCL,  'speedIn',
                function() { $("#rsvpForm").animate({height:h+"px",top:padT+"px",borderWidth:"3px", padding:"1em"}, SCL, 'speedIn',
                    function(){ $("#rsvpContent").fadeIn(0.5 * SCL,  'speedIn' /*, getFormDataAjax()*/ )  }
                )}
            );
        }
    );
    
    

 } 
 
function rsvpOut() {
    $("body").append('<div class="modalOverlay" id="bgOverlay"></div>');
    var hTot = $(window).height();
    var wTot = $(window).width();
    var w = min(400,wTot * 0.5);
    var h = min( minHeight  ,hTot * 0.5);
    var padT = (hTot - h)/2.0;
    var padW = (wTot - w)/2.0;
    
    $("#rsvpContent").fadeOut(0.5 * SCL , 
        function() {
            $("#rsvpForm").animate({height:"3px",top:(hTot/2.0 - 1.5) +"px",borderWidth:"0", padding:"0"}, SCL ,'speedOut',
                function() {
                    $("#rsvpForm").animate({width:"3px",left:(wTot/2.0-1.5)+"px"}, 2 * SCL,'speedOut',
                        function() { $("#bgOverlay,#rsvpForm").fadeOut(SCL ,'speedOut' , function(){$("#bgOverlay").remove();}) }
                    );
                }
            );
        }
    );
 }

/*
    UI
*/

 
if (jQuery) {
    $(document).ready(
        function() {
            setupEventHandlers();
            var frm = $("#rsvpFormData");
            if (frm) {
                //fillForm(frm);
                readGetData();
                minHeight = $(21).toPx() ;
                //alert(minHeight);
            }
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
                //saveRSVPcookie();
            }            
            
            return false;
        }
    );
    
    /*
    $("#email").blur(
        function() {
            getFormDataAjax();
        }
    );
    */
    

    

     /*
        Autocomplete
     */
    $(function(){ 
        var names = ["April Anderson",
        "Jeffery Barton",
        "Chris Bordonaro",
        "Daniel Berndt",
        "Andrea Apisa",
        "Tami Burkhart",
        "Darrell Booker",
        "Irene Burns",
        "Jesse Butler",
        "Dawn Centofanti",
        "Daniel Calko",
        "Joseph Butcher",
        "Amy Cozadd",
        "Lyle Carpenter",
        "Angela Cramer",
        "Daniel DiRando",
        "James Dowdy",
        "Christopher Dickenson",
        "Nathan Crocker",
        "Stacie Donchatz",
        "Melissa Duttle",
        "Alessandro Ferone",
        "Melanie Gogle",
        "Megan Garris",
        "Stephanie Fortner",
        "Jeffrey Fisher",
        "Craig Hamer",
        "Christine Gartner",
        "Richard Heltebran",
        "Teresa Hernandez",
        "Kristy Holdash",
        "Mark Hixson",
        "Bernard Herbert",
        "Joseph Hladiuk",
        "Darren Hood",
        "John Jarman",
        "Teresa Hopper",
        "Julie Ladd",
        "Michelle Kokoski",
        "Shannyn Leake",
        "Neil Huda",
        "Melanie Kovach",
        "Patricia Lowery",
        "Jerome McConnell",
        "Christopher Mikovich",
        "Ace McBride",
        "Daniel McElhaney",
        "Patricia Miller",
        "Brian Merkich",
        "Diana Molina",
        "Jonathan Morgan",
        "Joielle Nutter",
        "Rodney Polling",
        "Michael Monroe",
        "Michael Raub",
        "Michelle Oliver",
        "Jason Reese",
        "Jennifer Russell",
        "Chalet Seidel",
        "Edward Sallustio",
        "Kara Stoddard",
        "Robert Samuels",
        "Christopher Rose",
        "Otto Stohmeyer",
        "Carl Tracy",
        "Teresa Ward",
        "Lynnette Sanders",
        "Stephanie Torksy",
        "Amy Whittaker",
        "Ann Walton",
        "Eric Wiscott",
        "Jason Wodagaza",
        "Scott Zembower",
        "Chriss Todd",
        "Michael Albright",
        "Chris Wildman",
        "Jason Grimaldi"];
        
        $( "#tags" ).autocomplete({
          source: names
        }); 
    });
        
 }
 
/*
    Data
*/
 
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
    
    var em = $_GET.email;
    if (em){
        setFormValueWithVal("email",em);
        getFormDataAjax();
    }
}


/*
    AJAX
*/

function getFormDataAjax(){
    var email = getFormVal("email");
    if (email) {
        $.getJSON('http://theycallmecarl.com/mrhs93/rsvp.php?callback=?','intent=0&email=' + email,
            function(res) {
                //console.log("got reply");
                //console.log(res);
                var status = res.status;
                
                if (status === "ok") {
                    var n1 = res.firstname; setFormValueWithVal('firstname',n1);
                    var n2 = res.lastname; setFormValueWithVal('lastname',n2);
                    var em = res.email; setFormValueWithVal('email',em);
                    var r1 = res.reply1; setFormValueWithVal('reply1',r1);
                    var r2 = res.reply2; setFormValueWithVal('reply2',r2);
                    
                }
                
    
            }
        );   
    }
 }
     