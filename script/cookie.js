
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

var cname = "Cisforcookie";

/*
function saveRSVPcookie(pName,pEmail,pRsvp1,pRsvp2){
    var data = {
        name:   pName,
        email:  pEmail,
        rsvp1:  pRsvp1,
        rsvp2:  pRsvp2
    };
    
    createCookie(cname,data,365);
}
*/

function saveRSVPcookie(frm){
    var data = objectify(frm);
    console.log(data);
    createCookie(cname,data,365);
}

function objectify(frm) {
    //var fields = {};
    /*
    frm.find(":input").each(
        function() {
            fields[this.name] = $(this).val();
        }  
    );
    */
    
    var paramObj = {};
    $.each($('#myForm').serializeArray(), function(_, kv) {
        paramObj[kv.name] = kv.value;
    });

    return paramObj;
    
}

function getSavedRSVPdata() {
    var data = readCookie(cname);
    return data;
}

function fillForm(frm) {
    var data = getSavedRSVPdata();
    console.log(data);
    if (data) {
        /*
        for (var prop in data) {
            $("#"+prop).val(data[prop]);
        }
        */
    }
}




