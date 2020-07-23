let carro     = JSON.parse(sessionStorage.getItem("carrito"));
cargarNumeradorCarrito(carro);
cargarCarrito(carro);

function cargarNumeradorCarrito(carro){
    let cantidad = 0;
    if (carro != null)
    {
        cantidad = carro.length;
    }

    let numerador = document.getElementById("numcarrito");
    numerador.innerText = numerador.textContent + "(" + cantidad + ")";
}

function cargarCarrito(carro){
    var carrito1 = document.getElementById("carrito");

    for(let i=0; i < carrito.length; i++) {
    // Caja de cada pedido
        let contenedor = document.createElement("div");

    // Elementos del producto
        let img        = document.createElement("img");
        let titulo     = document.createElement("h3");
        let precio     = document.createElement("h4");

    // Atributos de la imagen
        img.setAttribute("src", "img/promociones/" + carro[i].imagen);

    // Nombre del producto
        titulo.innerText = carro[i].nombre + " - " + carro[i].bodega;
        
    // Precio
        precio.innerText = "$" + carro[i].precio;

        contenedor.appendChild(img);
        contenedor.appendChild(titulo);
        contenedor.appendChild(precio);
        carrito1.appendChild(contenedor);
    }
}

