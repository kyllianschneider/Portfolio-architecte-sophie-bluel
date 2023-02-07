if (auth()) {
     a = document.createElement("a");
     a.href = "./index.html";
     a.innerHTML = "logout";
     a.addEventListener("click", function (e) {
         deleteAllCookies();
     });
     gid("log_zone").appendChild(a);
     gid("modif_projet").hidden = false;
     gid("icon1").hidden = false;
}else{
    gid("log_zone").innerHTML = '<a href="./login.html">login</a>';
}

var cat = 0; // 0 = all /// catégorie actuelle
var categories; // liste des catégories
var portfolio; // liste des projets

mypop = new popup("mypopup");

document.getElementById('popup-mask').addEventListener("click", function (e) {
    mypop.close();
});

function closepopup(){
    mypop.close();
}

function openpopup(){
    mypop.pop();
}

function create_figure_dom(elem_portfolio){
    caption = document.createElement("figcaption");
    caption.innerHTML = elem_portfolio.title;
    image = document.createElement("img");
    image.src = elem_portfolio.imageUrl;
    image.crossorigin = "anonymous";
    image.setAttribute("crossorigin", "anonymous");
    obj = document.createElement("figure");
    obj.setAttribute("cat_id", elem_portfolio.categoryId); // ajout de l'id de categorie comme atribu
    obj.appendChild(image);
    obj.appendChild(caption);
    return obj;
}

function supprimer_proj(id_proj){
    console.log(id_proj);
    fetch(serv + "api/works/"+id_proj,{
        mode: "cors",
        method:"DELETE",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }}
    )
    .then((r) => {
        console.log(r);
        if (r.status == 401) {

        }else if (r.status == 404) {

        }else{

        }
    });
    // e.target.parentNode.style = "display: none;"; // cache temporairement le div
}

fetch(serv + "api/works", { mode: "cors" })
.then((r) => r.json())
.then((data) => {
    portfolio = data;
    //affichage du portfolio
    // console.log(portfolio);
    for (el in portfolio) {
        gid("gallery").appendChild(create_figure_dom(portfolio[el]));
        temp = create_figure_dom(portfolio[el]);
        button = document.createElement("div");
        button.className = "supp";
        button.setAttribute("proj_id", portfolio[el].id);
        button.addEventListener("click", function (e) {
            supprimer_proj(e.target.getAttribute("proj_id"));
            // supprimer_proj(15);
        });
        temp.appendChild(button);
        gid("manager").appendChild(temp); // figcaption masqué en css
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
        gid("categories").appendChild(objdiv);
    }
});

function display_cat() {
    gallery = gid("gallery");
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
