



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

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
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
    
    if (!( ($('#name')==='') || ($('#name')===null) )) {
        getKey();
        
    }
    

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
                readGetData();
                minHeight = $(21).toPx() ;
            }
            
            checkKeyOnLoad();
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

            var email = getFormVal("email");
            var valid = isValidEmailAddress(email);
            
            if (valid){
                var name = getFormVal("name");
                var r1 = getFormVal("reply1");
                var r2 = getFormVal("reply2");
                setFormDataAjax(name,email,r1,r2);
            }
            
            // var frm = $("#rsvpFormData");
            // if (frm) {
            //     //saveRSVPcookie();
            // }            
            
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
    
	$('#name').blur(
		function(event,ui) {
			if (!($('#key').val())) {
				var id = people.vlookup($('#name').val(),1,true);
				//alert(id);
				if (id) {
					$('#key').val(id);
					getFormDataAjax();
				} else {
					$('#key').val( Math.floor(Math.random()*10000000) );
				}
			}
		}
          
	
	);
    

     /*
        Autocomplete
     */
Array.prototype.vlookup = function(needle,index){
    index = index || 0;

    for (var i = 0; i < this.length; i++){
        var row = this[i];
        
        if (row[0]===needle)
            return (index < row.length ? row[index] : row);
    }
    return null;
}

/*
Array.prototype.vlookup = function(needle,index,exactmatch){
    index = index || 0;
    exactmatch = exactmatch || false;
    for (var i = 0; i < this.length; i++){
        var row = this[i];
        
        if ((exactmatch && row[0]===needle) || row[0].indexOf(needle) != -1)
            return (index < row.length ? row[index] : row);
    }
    return null;
}
*/

     
    $(function(){ 
        var names = ["April Anderson",
"Jeffery Barton",
"Chris Bordonaro",
"Daniel Berndt",
"Andrea (Apisa) Dilts",
"Tami Burkhart",
"Darrell Booker",
"Irene Burns",
"Jesse Butler",
"Dawn Centofanti",
"Daniel Calko",
"Joseph Butcher",
"Amy Cozadd",
"Lyle Carpenter",
"Angela (Cramer) Ciarniello",
"Daniel DiRando",
"James Dowdy",
"Christopher Dickenson",
"Nathan Crocker",
"Stacie (Donchatz) Gerberry",
"Melissa Duttle",
"Alessandro Ferone",
"Melanie Gogle",
"Megan Garris",
"Stephanie Fortner",
"Jeffrey Fisher",
"Craig Hamer",
"Christine Gartner",
"Richard Heltebran",
"Teresa (Hernandez) Bott",
"Kristy Holdash",
"Mark Hixson",
"Bernard Herbert",
"Joseph Hladiuk",
"Darren Hood",
"John Jarman",
"Theresa (Hopper) Gearheart",
"Julie Ladd",
"Michelle Kokoski",
"Shannyn Leake",
"Neil Huda",
"Melanie Kovach",
"Patricia (Lowery) Collins",
"Jerome McConnell",
"Christopher Mikovich",
"Ace McBride",
"Daniel McElhaney",
"Patricia (Miller) Scott",
"Brian Merkich",
"Diana Molina",
"Jonathan Morgan",
"Joielle Nutter",
"Rodney Polling",
"Michael Monroe",
"Michael Raub",
"Michelle (Oliver) Pounds",
"Jason Reese",
"Jennifer Russell",
"Chalet Seidel",
"Edward Sallustio",
"Kara (Stoddard) Calderon",
"Robert Samuels",
"Christopher Rose",
"Otto Stohmeyer",
"Carl Tracy",
"Teresa (Ward) Langley",
"Lynnette Sanders",
"Stephanie Torksy",
"Amy Whittaker",
"Ann (Walton) Mannix",
"Eric Wiscott",
"Jason (Wodagaza) Beckham",
"Scott Zembower",
"Chriss Todd",
"Michael Albright",
"Chris Wildman",
"Jason Grimaldi"];
        
        $( "#name" ).autocomplete({
          source: names ,
          close: 
            function(event,ui) {
                getKey();
            }
          
        }); 
    })
        
 }
 
/*
    Data
*/

function getKey() {
    //console.log($('#name').val());
    //var people = getPeople();
    var id = people.vlookup($('#name').val(),1,true);
    //alert(id);
    if (id) {
    $('#key').val(id);
    getFormDataAjax();
    } else {
    $('#key').val( Math.floor(Math.random()*10000000)  );
    } 
    console.log($('#name').val() + ' key = ' + $('#key').val());
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
    
    var em = $_GET.email;
    if (em){
        setFormValueWithVal("email",em);
        getFormDataAjax();
    }
}


/*
    AJAX
*/

function checkKeyOnLoad(){
    var key = getParameterByName('key');
    if (key){
        $('#key').val(key);
        getFormDataAjax();
        rsvpIn();
    }
}

function getFormDataAjax(){
    var key = getFormVal("key");
    //if (email) {
        $.getJSON('http://theycallmecarl.com/mrhs93/rsvp.php?callback=?','intent=0&key=' + key,
            function(res) {
                //console.log("got reply");
                //console.log(res);
                var status = res.status;
                
                if (status === "ok") {
                    //var n1 = res.firstname; setFormValueWithVal('name',n1);
                    //var n2 = res.lastname; setFormValueWithVal('lastname',n2);
                    var em = res.email; setFormValueWithVal('email',em);
                    var r1 = res.reply1; setFormValueWithVal('reply1',r1);
                    var r2 = res.reply2; setFormValueWithVal('reply2',r2);
                    var name = res.name; setFormValueWithVal('name',name);
                }
                
    
            }
        );   
    //}
 }

function setFormDataAjax(name,email,r1,r2){
    var key = getFormVal("key");
    if (!key) {
        getKey();
        key = getFormVal("key");
    }
    $.getJSON('http://theycallmecarl.com/mrhs93/rsvp.php?callback=?','intent=1&key=' + key + '&name=' + name +  '&email=' + email +  '&reply1=' + r1 +  '&reply2=' + r2,
        function(res) {
            //console.log("got reply");
            //console.log(res);
            var status = res.status;
            console.log(status);
            if (status === "OK") {
                var html = '<h3>Thank you ' + $('#name').val()+'</h3><p>Your response has been recorded You should receive an email shortly.</p>';
                if (r1 + r2) {
                    html += '<p>Please visit <a href="http://mrhs93.github.io/pay.html">http://mrhs93.github.io/pay.html</a> for information on how to pay</p>';
                }
                //h1, h2, h3 
                $('#greeting').html(html);
            } else {
                $('#greeting').html('<h3>Something might have broke =( </h3><p>If you don\'t get an email soon, please email <a href="mailto:carltracy@gmail.com">carltracy@gmail.com</a> <div class="clear"> </div>    ');
            }
            rsvpOut();
            //.animate({height:"3px",width:"3px"},  SCL
            $('#greeting').css('height','auto');
            var h = $('#greeting').height();
            $('#greeting').css('height','0');
            $('#greeting').animate({height:h+"px"}).fadeIn(2000);
            

        }
    );   
 }

 
 
var people = [ 
	['April Anderson',3503042],
	['Jeffery Barton',4313308],
	['Chris Bordonaro',1057419],
	['Daniel Berndt',9347168],
	['Andrea (Apisa) Dilts',6563590],
	['Tami Burkhart',3776446],
	['Darrell Booker',7191459],
	['Irene Burns',5627958],
	['Jesse Butler',5565416],
	['Dawn Centofanti',9943208],
	['Daniel Calko',5019794],
	['Joseph Butcher',3269344],
	['Amy Cozadd',9287340],
	['Lyle Carpenter',8628672],
	['Angela (Cramer) Ciarniello',5281341],
	['Daniel DiRando',8520690],
	['James Dowdy',7759427],
	['Christopher Dickenson',3235069],
	['Nathan Crocker',9897060],
	['Stacie (Donchatz) Gerberry',2780100],
	['Melissa Duttle',1209318],
	['Alessandro Ferone',5706291],
	['Melanie Gogle',5903505],
	['Megan Garris',2398652],
	['Stephanie Fortner',2282744],
	['Jeffrey Fisher',3217767],
	['Craig Hamer',8240603],
	['Christine Gartner',3549717],
	['Richard Heltebran',1026775],
	['Teresa (Hernandez) Bott',2484726],
	['Kristy Holdash',8343307],
	['Mark Hixson',6262359],
	['Bernard Herbert',5281874],
	['Joseph Hladiuk',6622296],
	['Darren Hood',7265859],
	['John Jarman',6462410],
	['Theresa (Hopper) Gearheart',9514473],
	['Julie Ladd',9185137],
	['Michelle Kokoski',7382270],
	['Shannyn Leake',8355939],
	['Neil Huda',9632886],
	['Melanie Kovach',4096614],
	['Patricia (Lowery) Collins',8584413],
	['Jerome McConnell',2632226],
	['Christopher Mikovich',4407888],
	['Ace McBride',4142766],
	['Daniel McElhaney',6490166],
	['Patricia (Miller) Scott',1022536],
	['Brian Merkich',2642182],
	['Diana Molina',9143302],
	['Jonathan Morgan',9789966],
	['Joielle Nutter',2519929],
	['Rodney Polling',9229743],
	['Michael Monroe',1588932],
	['Michael Raub',6255428],
	['Michelle (Oliver) Pounds',7510346],
	['Jason Reese',8785451],
	['Jennifer Russell',2396218],
	['Chalet Seidel',2624735],
	['Edward Sallustio',4935022],
	['Kara (Stoddard) Calderon',6800907],
	['Robert Samuels',9199469],
	['Christopher Rose',6594627],
	['Otto Stohmeyer',4374730],
	['Carl Tracy',1089768],
	['Theresa (Ward) Langley',9324649],
	['Lynnette Sanders',6353945],
	['Stephanie Torksy',2795782],
	['Amy Whittaker',2917072],
	['Ann (Walton) Mannix',5198017],
	['Eric Wiscott',7238869],
	['Jason (Wodagaza) Beckham',1600299],
	['Scott Zembower',3284887],
	['Chriss Todd',1623538],
	['Michael Albright',6263029],
	['Chris Wildman',7444535],
	['Jason Grimaldi',8433590]
];

