const formLogin = document.querySelector("#form");
//---- envoie de la connection et gérance des erreur ----
formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
    fetch(serv + "api/users/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: gid("email").value,
        password: gid("password").value,
      }),
    }).then((r) => {
      if (r.status == 401) {
        gid("error_zone").innerHTML = "Mot de passe incorrect";
      } else if (r.status == 404) {
        gid("error_zone").innerHTML = "Utilisateur incorrect";
      } else {
        r.json().then((data) => {
          //deleteAllCookies();
          setCookie("token", data.token, 1);
          window.location.href = "./index.html";
        });
      }
    });
  });
