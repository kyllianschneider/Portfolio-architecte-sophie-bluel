serv = "http://localhost:5678/";

// email: sophie.bluel@test.tld
// password: S0phie

document.getElementById("connection").addEventListener("click", function (e) {
    fetch(serv + "api/users/login",
        {
            mode: "cors",
            method:"POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            })
        }
    )
    .then((r) => {
        if (r.status == 401) {
            document.getElementById("error_zone").innerHTML = "wrong pswd" ;
        }else if (r.status == 404) {
            document.getElementById("error_zone").innerHTML = "user not found" ;
        }else{
            r.json().then((data) => {
                deleteAllCookies();
                setCookie("token", data.token, 1);
                window.location.href = "./index.html";
            })
        }
    });
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires+"; SameSite=None; secure ";
}


function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
    	var cookie = cookies[i];
    	var eqPos = cookie.indexOf("=");
    	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}


function auth(){
    if (getCookie("token") != "") {
        return true;
    }
    return false;
}
