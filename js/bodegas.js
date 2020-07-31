//fetch('json/bodegas.json')
fetch('http://localhost:3000/api/bodegas')
  .then(function(response) {
    return response.json();
  })
  .then(function(bodegas) {
    var seccionBodega = document.getElementById("bodegas");
    var vermas = document.getElementById("seccion-boton");

    for(let i=0; i < bodegas.length; i++) {
        let div = document.createElement("div");
        if (i<=5) {
            div.className = "primarios";
        } else {
            div.className = "secundarios1";
            div.style.display = "none";
        }

        let divContenedor = document.createElement("div");

        let h3  = document.createElement("h3");
        h3.innerHTML = bodegas[i].nombre;

        let img = document.createElement("img");
        img.id          = bodegas[i].id;
        let nombreAux = "img/" + bodegas[i].imagen;
        img.setAttribute("src", nombreAux);

        divContenedor.appendChild(img);
        div.appendChild(divContenedor);
        div.appendChild(h3);
        div.className = div.className + " wow animate__animated animate__zoomInUp";

        seccionBodega.insertBefore(div,vermas);
    }

    var boton1 = document.getElementById("vermas");

    boton1.addEventListener("click", function() {
        var secundarios = document.getElementsByClassName("secundarios1");
        for(let i=0; i < secundarios.length; i++) {
            if (boton1.textContent == "Ver más") {
                secundarios[i].style.display = "flex";
            } else {
                secundarios[i].style.display = "none";
            }
        } 
        if (boton1.textContent == "Ver más") {
            console.log("Ver menos");
            boton1.innerText = "Ver menos";
        } else {
            boton1.innerHTML = "Ver más";
        }
    });
});