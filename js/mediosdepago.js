fetch('json/metodosdepago.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(metodos) {
    var mediosdepago = document.getElementById("mediosdepago");

    for(let i=0; i < metodos.length; i++) {
        let div = document.createElement("div");

        let img = document.createElement("img");
        img.id          = metodos[i].id;
        let nombreAux = "img/metodosdepago/" + metodos[i].imagen;
        img.setAttribute("src", nombreAux);

        let contImg = document.createElement("div");
        contImg.appendChild(img);

        let h3 = document.createElement("h3");
        h3.innerHTML = metodos[i].nombre;

        let p = document.createElement("p");
        p.innerHTML = metodos[i].descripcion;

        div.appendChild(contImg);
        div.appendChild(h3);
        div.appendChild(p);
        div.className = "wow animate__animated animate__shakeX";
        mediosdepago.appendChild(div);

    }
});