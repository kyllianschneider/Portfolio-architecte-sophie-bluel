serv = "http://localhost:5678/";

// email: sophie.bluel@test.tld
// password: S0phie

function gid(id) {
    return document.getElementById(id);
}

function auth() {
    if (getCookie("token") != "") {
        return true;
    }
    return false;
}

//---- récuperation du cookie ----
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

//---- création du cookie ----
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie =
        cname + "=" + cvalue + "; " + expires + ";SameSite=None; Secure";
}

//---- suppression du cookie ----
function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    }
}
