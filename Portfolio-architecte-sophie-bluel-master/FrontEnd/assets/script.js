serv = "http://localhost:5678/";

if (auth()) {
     a = document.createElement("a");
     a.href = "./index.html";
     a.innerHTML = "logout";
     a.addEventListener("click", function (e) {
         deleteAllCookies();
     });
     document.getElementById("log_zone").appendChild(a);
}else{
    document.getElementById("log_zone").innerHTML = '<a href="./login.html">login</a>';
}


function auth(){
    if (getCookie("token") != "") {
        return true;
    }
    return false;
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


function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
    	var cookie = cookies[i];
    	var eqPos = cookie.indexOf("=");
    	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    }
}

var cat = 0; // 0 = all /// catégorie actuelle
var categories; // liste des catégories
var portfolio; // liste des projets

fetch(serv + "api/works", { mode: "cors" })
  .then((r) => r.json())
  .then((data) => {
    portfolio = data;
    //affichage du portfolio
    for (el in portfolio) {
      caption = document.createElement("figcaption");
      caption.innerHTML = portfolio[el].title;
      image = document.createElement("img");
      image.src = portfolio[el].imageUrl;
      image.crossorigin = "anonymous";
      image.setAttribute("crossorigin", "anonymous");
      obj = document.createElement("figure");
      obj.setAttribute("cat_id", portfolio[el].categoryId); // ajout de l'id de categorie comme atribu
      obj.appendChild(image);
      obj.appendChild(caption);
      document.getElementById("gallery").appendChild(obj);
    }
  });

// ajax de la liste des catégories
fetch(serv + "api/categories", { mode: "cors" })
  .then((r) => r.json())
  .then((data) => {
    categories = data;

    categories[-1] = {};
    categories[-1].id = 0;
    categories[-1].name = "Tous";

    //création des divs pour les filtres
    for (i = -1; i < categories.length; i++) {
      objdiv = document.createElement("div");
      objdiv.innerHTML = categories[i].name;
      objdiv.id = parseInt(i) + 1;
      objdiv.addEventListener("click", function (e) {
        cat = e.target.id;
        display_cat();
      });
      document.getElementById("categories").appendChild(objdiv);
    }
  });

function display_cat() {
  gallery = document.getElementById("gallery");
  //boucle sur chaque element du portfolio
  for (var z = 0; z < gallery.childNodes.length; z++) {
    if (gallery.childNodes[z].nodeType == 1) {
      // type 1 seulement ELEMENT_NODE
      gallery.childNodes[z].style = "display: none;";
      if (gallery.childNodes[z].getAttribute("cat_id") == cat || cat == 0) {
        gallery.childNodes[z].style = "display: block;";
      }
    }
  }
}
