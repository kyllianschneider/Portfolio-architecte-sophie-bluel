//-- set global variable ---
const allWork = new Set();
const objWork = new Set();
const apptWork = new Set();
const hotelWork = new Set();

const gallery = document.querySelector("#gallery");
const manager = document.querySelector("#manager");

console.log(manager);

mypop = new popup("mypopup");
mypop2 = new popup("mypopup2");

function nextpop() {
    mypop.close();
    mypop2.pop();
}

function back() {
    mypop2.close();
    document.getElementById("preview").removeAttribute("src");
    mypop.pop();
}

document.getElementById("popup-mask").addEventListener("click", function (e) {
    mypop.close();
    mypop2.close();
});

function closepopup() {
    mypop.close();
    mypop2.close();
}

function openpopup() {
    mypop.pop();
}

//---- fetch pour supprimer les projets ----
function supprimer_proj(id_proj) {
    //console.log(id_proj);
    fetch(serv + "api/works/" + id_proj, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: "Bearer " + getCookie("token"),
        },
    }).then((r) => {
        console.log(r);
        if (r.status == 204) {
            for (var z = 0; z < gid("gallery").childNodes.length; z++) {
                if (gid("gallery").childNodes[z].getAttribute("proj_id") == id_proj) {
       // surpimer elemDom.childNodes[z]
       gid("gallery").removeChild(gid("gallery").childNodes[z]) 
    }
    
    }

        } else if (r.status == 404) {
        } else {
        }
    });
}

//--- Admin section ----
function setAdminElement() {
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
        gid("edit_mode").style.display = "flex";
        gid("modif-button").style.display = "flex";
        gid("projet").style.marginLeft = "0px";
    } else {
        gid("log_zone").innerHTML = '<a href="./login.html">login</a>';
    }
}

//---- fetch request -----
async function getAllWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    if (response.ok) {
        return response.json();
    } else {
        console.log(response);
    }
}

//--- triage des works ---//
async function initiateWorksSet() {
    const works = await getAllWorks();
    works.forEach((work) => {
        if (work.categoryId == 1) {
            objWork.add(work);
        }
        if (work.categoryId == 2) {
            apptWork.add(work);
        }
        if (work.categoryId == 3) {
            hotelWork.add(work);
        }
        allWork.add(work);
    });
    displayImages(allWork);
    displayModal(allWork);
}

//---- Affichage Image -----
async function displayImages(works) {
    const imgFragment = document.createDocumentFragment();
    for (const work of works) {
        const figure = document.createElement("figure");
        figure.dataset.cat = work.categoryId;
        figure.innerHTML = `<img src="${work.imageUrl}" alt="${work.title}" crossorigin="anonymous">
            <figcaption>${work.title}</figcaption>`;
            figure.setAttribute("proj_id", work.id);
            imgFragment.appendChild(figure);

    }
    gallery.appendChild(imgFragment);
}

//---- affichage modale ----
function displayModal(works) {
    const modalFragment = document.createDocumentFragment();
    for (const work of works) {
        const figure = document.createElement("figure");
        figure.dataset.cat = work.categoryId;
        figure.innerHTML = `<img src="${work.imageUrl}" alt="${work.title}" crossorigin="anonymous">
            <figcaption>${work.title}</figcaption>`;

        button = document.createElement("div");
        button.style.backgroundImage =
            "url('./assets/icons/trash-can-solid.svg')";
        button.className = "supp";
        button.setAttribute("proj_id", work.id);
        button.addEventListener("click", function (e) {
            supprimer_proj(e.target.getAttribute("proj_id"));
            e.target.parentNode.style = "display: none;";
        });
        figure.appendChild(button);
        modalFragment.appendChild(figure);
    }
    manager.appendChild(modalFragment);
}

console.log(displayModal);

//--- vider la gallery ------
function clearGallery() {
    gallery.innerHTML = "";
}

function listenCategories() {
    const buttons = document.querySelectorAll("#categories div");
    for (const button of buttons) {
        button.addEventListener("click", (e) => {
            clickedButton = e.target;
            clearGallery();
            if (clickedButton.id == "0") {
                displayImages(allWork);
            }
            if (clickedButton.id == "1") {
                displayImages(objWork);
            }
            if (clickedButton.id == "2") {
                displayImages(apptWork);
            }
            if (clickedButton.id == "3") {
                displayImages(hotelWork);
            }
        });
    }
}

setAdminElement();
initiateWorksSet();
listenCategories();

//---- afficher preview de l'upload image sur la pop-up ----
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            gid("preview").setAttribute("src", e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

//---- construction du form pour upload une image vers le serv ----
const form = document.querySelector("#workform");
let fileInput = gid("image");
let titreInput = gid("titre");
let categoryInput = gid("category");

//---- fetch et envoi du formulaire au serv ----
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(formData);
    formData.append("image", fileInput.files[0]);
    formData.append("title", titreInput.value);
    formData.append("category", categoryInput.value);
    fetch(serv + "api/works", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + getCookie("token"),
        },
        body: formData,
    })
        .then((response) => {
            console.log(response);
            // Handle the response
        })
        .catch((error) => {
            // Handle errors
        });
});
