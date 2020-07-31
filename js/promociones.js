//fetch('json/promociones.json')
fetch('http://localhost:3000/api/promociones')
  .then(function(response) {
    return response.json();
  })
  .then(function(promociones) {
    var descuentos = document.getElementById("promociones");
    var vermas = document.getElementById("seccion-boton-promos");

    for(let i=0; i < promociones.length; i++) {
        let divPadre      = document.createElement("div");

        if (i<=2) {
            divPadre.className = "primarios contenedor-promos";
        } else {
            divPadre.className = "secundarios contenedor-promos";
            divPadre.style.display = "none";
        }

        let divHijo       = document.createElement("div");

    // Tratamiento de la imagen
        let img           = document.createElement("img");
        let nombreAux     = "img/catalogo/" + promociones[i].imagen;
        img.setAttribute("src", nombreAux);
        divHijo.appendChild(img);

    // Tratamiento de h3 - Nombre de la promo
        let h3            = document.createElement("h3");
        h3.innerHTML      = promociones[i].nombre;

    // Tratamiento de h2 - Nombre de la bodega/proyecto
        let h4            = document.createElement("h4");
        h4.innerHTML      = promociones[i].bodega;

    // Tratamiento de p - unidades
        let pCant         = document.createElement("p");
        pCant.innerHTML   = promociones[i].unidades + " unidades";

    // Tratamiento de p - Precios viejo
        let pPrecios      = document.createElement("p");

    // Tratamiento de span - Precio nuevo
        let span          = document.createElement("span");
        span.innerHTML    = "$" + promociones[i].precioanterior;
        span.className    = "tachado";
        pPrecios.innerHTML= "$" + promociones[i].preciopromo + " ";
        pPrecios.className= "destacado";
        pPrecios.appendChild(span);

    // Tratamiento boton comprar
        btnComprar              = document.createElement("div");
        txtComprar              = document.createElement("span");
        txtComprar.innerHTML    = "AGREGAR";
        btnComprar.appendChild(txtComprar);
        btnComprar.className    = "btnComprar";
        btnComprar.id           = promociones[i].id;
        btnComprar.addEventListener("click",function(){
            var x = document.getElementById("snackbar");
            x.innerText = "Producto agregado al carrito";
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            let carrito         = [];
            carrito             = JSON.parse(localStorage.getItem("carrito"));
            let continuar       = 0;
            if (carrito == null)
            {
                carrito = [];
            } else {
                for(let e=0; e < carrito.length; e++)
                {
                    if(carrito[e].id == promociones[i].id){
                        carrito[e].cantcarrito      = carrito[e].cantcarrito + 1;
                        let numeradorProducto       = document.getElementById("cantidad"+carrito[e].id);
                        numeradorProducto.innerText = carrito[e].cantcarrito;
                        continuar = 1;
                    }
                }
            }

            if(continuar==0){
                carrito.push(promociones[i]);
                cargarItemCarrito(promociones[i]);
            }

            
            localStorage.setItem("carrito", JSON.stringify(carrito));
            cargarNumeradorCarrito(carrito);
            calcTotales();
        });

    // Agregado de hijos a div contenedor
        divPadre.appendChild(divHijo);
        divPadre.appendChild(h3);
        divPadre.appendChild(h4);
        divPadre.appendChild(pCant);
        divPadre.appendChild(pPrecios);
        divPadre.appendChild(btnComprar);
        divPadre.className = divPadre.className + " wow animate__animated animate__bounceIn";
    // Agregamos contedor a nuestra seccion de promocioness
        descuentos.insertBefore(divPadre,vermas);

    }

    var boton = document.getElementById("vermas-promos");

    boton.addEventListener("click", function() {
        var secundarios = document.getElementsByClassName("secundarios");
        for(let i=0; i < secundarios.length; i++) {
            if (boton.textContent == "Ver más") {
                secundarios[i].style.display = "flex";
            } else {
                secundarios[i].style.display = "none";
            }
        } 
        if (boton.textContent == "Ver más") {
            boton.innerHTML = "Ver menos";
        } else {
            boton.innerHTML = "Ver más";
        }
    });
});