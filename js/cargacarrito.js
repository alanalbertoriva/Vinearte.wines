let carro     = JSON.parse(localStorage.getItem("carrito"));
cargarNumeradorCarrito(carro);
if (carro != null) {
    cargarCarrito(carro);
}

console.log(screen.width);

var btnCarrito = document.getElementById("numcarrito");
var actCarrito;
btnCarrito.addEventListener("click", function(){
    let linkcarrito = document.getElementById("linkcarrito");  
    if (screen.width > "768") {
        linkcarrito.setAttribute("href", "#carrito");
        if (actCarrito == 0 || actCarrito == null) {
            let carrito = document.getElementById("carrito");
            carrito.className = "vcarrito";
            actCarrito = 1;
        } else {
            let carrito = document.getElementById("carrito");
            carrito.className = "ocarrito";
            actCarrito = 0;
        }    
    }
});

var cerrarCarrito = document.getElementById("cerrarcarrito");
if (cerrarCarrito != null) {
    cerrarCarrito.addEventListener("click", function(){
            let carrito = document.getElementById("carrito");
            carrito.className = "ocarrito";
            actCarrito = 0;
    });
}

let confirmarCompra = document.getElementById("btnconfirmar");
if(confirmarCompra != null) {
    confirmarCompra.addEventListener("click", function () {
        window.open("link/compras.html");
    });
}

function cargarNumeradorCarrito(carro){
    let cantidad = 0;
    //console.log("cargo numero "+ carro.length);
    if (carro != null)
    {
        for(let i=0; i < carro.length; i++) {
            cantidad = cantidad + carro[i].cantcarrito;
        }
    }

    let numerador = document.getElementById("numcarrito");
    numerador.innerText = "(" + cantidad + ")";
}

function cargarCarrito(carro){
    if(carro != null) {
       // let carrito1 = document.getElementById("carrito");

        for(let i=0; i < carro.length; i++) {
            cargarItemCarrito(carro[i]);
        }
    }
}

function cargarItemCarrito(carro){
    if(carro != null) {
        let carrito1   = document.getElementById("carrito");
        if(window.location.pathname == "/link/compras.html") {
            carrito1   = document.getElementById("detalle");
        }

        // Caja de cada pedido
        let contenedor = document.createElement("div");
        contenedor.id  = "contenedorcarrito" + carro.id;

        // Elementos del producto
        let contImagen = document.createElement("div");
        let img        = document.createElement("img");
        let titulo     = document.createElement("h3");
        let precio     = document.createElement("h4");
        let cantidad   = document.createElement("h5");
        let eliminar   = document.createElement("span");
        let agregar    = document.createElement("span");

        // Atributos del textbox de cantidad
        cantidad.innerText = carro.cantcarrito;
        cantidad.id        = "cantidad" + carro.id;

        // Atributos de la imagen
        let URLactual = window.location.pathname;
        console.log(URLactual);
        if(URLactual != "/") {
            img.setAttribute("src", "../img/promociones/" + carro.imagen);
        } else {
            img.setAttribute("src", "img/promociones/" + carro.imagen);
        }
        contImagen.appendChild(img);

        // Boton eliminar
        eliminar.innerText = "-";
        eliminar.style.color = "#303841";
        eliminar.style.backgroundColor = "#f6c90e";
        eliminar.style.padding = "10px";
        eliminar.style.width = "5px";
        eliminar.style.height = "5px";
        eliminar.style.border = "1px back solid";
        eliminar.style.borderRadius = "2px";
        eliminar.style.display = "flex";
        eliminar.style.justifyContent = "center";
        eliminar.style.alignItems = "center";
        eliminar.style.alignSelf = "center";
        eliminar.style.gridArea = "menos";
        eliminar.style.justifySelf = "center";
        eliminar.style.margin = "5px";

        eliminar.addEventListener("mouseover", function(){
            eliminar.style.cursor = "pointer";
            eliminar.style.opacity = "70%";
        });
        eliminar.addEventListener("mouseout", function(){
            eliminar.style.opacity = "100%";
        });

        eliminar.addEventListener("click", function(){
            console.log("antes" + carro.cantcarrito);
            let carroaux = JSON.parse(localStorage.getItem("carrito"));
            for(let i=0; i < carroaux.length; i++) {
                if(carro.id == carroaux[i].id) {
                    carro.cantcarrito = carroaux[i].cantcarrito -1;
                } 
            }

            if(carro.cantcarrito == 0) {
                let depurador = [];
                for (let i=0; i < carroaux.length; i++) {
                    if(carro.id != carroaux[i].id) {
                        depurador.push(carroaux[i]);
                    }
                }
                let depuradiv = document.getElementById("contenedorcarrito"+carro.id);
                carrito1.removeChild(depuradiv);
                carroaux = depurador;
            } else {
                for (let i=0; i < carroaux.length; i++) {
                    if(carro.id == carroaux[i].id) {
                        carroaux[i].cantcarrito = carro.cantcarrito;
                    }
                }
                let numeradorProducto       = document.getElementById("cantidad"+carro.id);
                numeradorProducto.innerText = carro.cantcarrito;
            }

            cargarNumeradorCarrito(carroaux);
            localStorage.setItem("carrito", JSON.stringify(carroaux));
            calcTotales();
        });

        
        // Boton agregar
        agregar.innerText  = "+";
        agregar.id         = "agregar" + carro.id;
        agregar.style.color = "#303841";
        agregar.style.backgroundColor = "#f6c90e";
        agregar.style.padding = "10px";
        agregar.style.width = "5px";
        agregar.style.height = "5px";
        agregar.style.border = "1px back solid";
        agregar.style.borderRadius = "2px";
        agregar.style.gridArea = "mas";
        agregar.style.display = "flex";
        agregar.style.justifyContent = "center";
        agregar.style.alignItems = "center";
        agregar.style.alignSelf = "center";
        agregar.style.justifySelf = "left";
        agregar.style.margin = "5px";

        agregar.addEventListener("mouseover", function(){
            agregar.style.cursor = "pointer";
            agregar.style.opacity = "70%";
        });
        agregar.addEventListener("mouseout", function(){
            agregar.style.opacity = "100%";
        });

        agregar.addEventListener("click", function(){
            let carroaux = JSON.parse(localStorage.getItem("carrito"));
            for(let i=0; i < carroaux.length; i++) {
                if(carro.id == carroaux[i].id) {
                    carro.cantcarrito       = carroaux[i].cantcarrito + 1;
                    carroaux[i].cantcarrito = carro.cantcarrito;
                } 
            }
            
            let numeradorProducto       = document.getElementById("cantidad"+carro.id);
            numeradorProducto.innerText = carro.cantcarrito;
            
            cargarNumeradorCarrito(carroaux);
            localStorage.setItem("carrito", JSON.stringify(carroaux));
            calcTotales();
        });

        // Nombre del producto
        titulo.innerText = carro.nombre + " - " + carro.bodega;
            
        // Precio
        precio.innerText = "$" + carro.preciopromo;

        let totales = document.getElementById("txtTotales");
        
        contenedor.appendChild(contImagen);
        contenedor.appendChild(titulo);
        contenedor.appendChild(precio);
        contenedor.appendChild(cantidad);
        contenedor.appendChild(eliminar);
        contenedor.appendChild(agregar);

        //contenedor.insertBefore(carrito1, totales);
        //parentNode.insertBefore(newNode, referenceNode);
        carrito1.insertBefore(contenedor, totales);
        //carrito1.appendChild(contenedor);
        calcTotales();
        
    }
}

function calcTotales() {
    let carro = JSON.parse(localStorage.getItem("carrito"));
    let acumulado = 0;
    if(carro != null) {
        for(let i=0; i < carro.length; i++){
            acumulado     = acumulado + (carro[i].cantcarrito * carro[i].preciopromo);
        }
        let totales       = document.getElementById("totales");
        totales.innerText = "$" + acumulado;
    }
}
