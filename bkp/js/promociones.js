var promociones = [];

promociones.push(new Promocion(1, "Aruma Malbec", "Bodegas Caro", "aruma.jpg", 6, 5024, 4400));
promociones.push(new Promocion(2, "Felino Malbec", "Viña Cobos", "felino.jpg", 6, 4914, 4600));
promociones.push(new Promocion(3, "Altaland Pinot Noir", "Proyecto Altaland", "altaland.jpg", 6, 2925, 2700));
promociones.push(new Promocion(4, "Luca Laborde Double select Syrah", "Bodega Luca", "luca.jpg", 6, 6912, 5800));
promociones.push(new Promocion(5, "Zuccardi Q Malbec", "Bodega Zuccardi", "zuccardiq-malbec.jpg", 6, 5265, 4875));
promociones.push(new Promocion(6, "Zuccardi Q Cabernet Franc", "Bodega Zuccardi", "zuccardiq-cabernet.jpg", 6, 5265, 4875));
promociones.push(new Promocion(1, "Aruma Malbec", "Bodegas Caro", "aruma.jpg", 6, 5024, 4400));

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
    let nombreAux     = "img/promociones/" + promociones[i].imagen;
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
        let carrito         = [];
        carrito             = JSON.parse(sessionStorage.getItem("carrito"));
        
        if (carrito == null)
        {
            carrito = [];
        }
        
        carrito.push(promociones[i]);
        //sessionStorage.setItem("carrito", carrito[i]);
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
        let numerador = document.getElementById("numcarrito");
        numerador.innerText = "CARRITO" + "(" + carrito.length + ")";
    });

// Agregado de hijos a div contenedor
    divPadre.appendChild(divHijo);
    divPadre.appendChild(h3);
    divPadre.appendChild(h4);
    divPadre.appendChild(pCant);
    divPadre.appendChild(pPrecios);
    divPadre.appendChild(btnComprar);

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

function Promocion(id, nombre, bodega, imagen, unidades, precioanterior, preciopromo) {
    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;
    this.bodega = bodega;
    this.unidades = unidades;
    this.precioanterior = precioanterior;
    this.preciopromo = preciopromo;

    this.getNombre = function () {
        return this.nombre;
    }
}