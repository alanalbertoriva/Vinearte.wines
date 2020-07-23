var metodos = [];

metodos.push(new Metodo(1, "MercadoPago", "mercadopago.jpg", "Podes abonar en hasta 12 cuotas sin interés con tarjeta de crédito, tarjeta de débito o efectivo."));
metodos.push(new Metodo(2, "Transferencia bancaria", "bank.jpg", "Podes realizar la transferencia desde tu banco a nuestro cbu."));
metodos.push(new Metodo(3, "Efectivo", "cash.jpg", "Podes retirar el pedido y abonar al momento de la entrega."));


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

    mediosdepago.appendChild(div);

}

function Metodo(id, nombre, imagen, descripcion) {
    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;
    this.descripcion = descripcion;

}