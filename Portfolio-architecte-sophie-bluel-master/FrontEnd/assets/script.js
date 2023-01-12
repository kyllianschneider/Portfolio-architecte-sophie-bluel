serv = "http://localhost:5678/";

var cat = 0; // 0 = all /// catégorie actuelle
var categories; // liste des catégories
var portfolio; // liste des projets

fetch(serv+'api/works',{mode: 'cors'})
.then((r) => r.json())
.then((data) => {
    portfolio = data;
    //affichage du portfolio
    for (el in portfolio) {
            caption = document.createElement('figcaption');
            caption.innerHTML = portfolio[el].title;
            image = document.createElement('img');
            image.src = portfolio[el].imageUrl;
            obj = document.createElement('figure');
            obj.setAttribute("cat_id",portfolio[el].categoryId); // ajout de l'id de categorie comme atribu
            obj.appendChild(image);
            obj.appendChild(caption);
            document.getElementById("gallery").appendChild(obj);
    }
});

// ajax de la liste des catégories
fetch(serv+'api/categories',{mode: 'cors'})
.then((r) => r.json())
.then((data) => {
    categories = data;

    categories[-1] = {};
    categories[-1].id = 0;
    categories[-1].name = "TOUS";
    console.log(categories);

    //création des divs pour les filtres
    for (i = -1; i < categories.length; i++) {
        objdiv = document.createElement('div');
        objdiv.innerHTML = categories[i].name;
        objdiv.id = parseInt(i)+1;
        objdiv.addEventListener("click", function (e) {
            cat = e.target.id;
            display_cat();
        });
        document.getElementById("categories").appendChild(objdiv);
    }
});

function display_cat(){
    gallery = document.getElementById("gallery");
    //boucle sur chaque element du portfolio
    for (var z = 0; z < gallery.childNodes.length; z++) {
        if (gallery.childNodes[z].nodeType == 1){ // type 1 seulement ELEMENT_NODE
            gallery.childNodes[z].style = "display: none;";
        if (gallery.childNodes[z].getAttribute("cat_id") == cat || cat == 0){
            gallery.childNodes[z].style = "display: block;";
        }}
    }
}