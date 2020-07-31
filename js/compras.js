trazabilidad("detalle");

let nocompra = document.getElementById("nocompra");
nocompra.style.display = "none";

let btnconfirmarCompra = document.getElementById("btnconfirmarCompra");
btnconfirmarCompra.addEventListener("click", function(){
    trazabilidad("envio");
});
//let btnConfirmarEnvio = document.getElementById("btnConfirmarEnvio");
//btnConfirmarEnvio.addEventListener("click", function(){
//    trazabilidad("pago");
//});
let btnVolverEnvio = document.getElementById("btnVolverEnvio");
btnVolverEnvio.addEventListener("click", function(){
    trazabilidadVolver("envio");
});
//let btnConfirmarPago = document.getElementById("btnConfirmarPago");
//btnConfirmarPago.addEventListener("click", function(){
//    trazabilidad("confirmacion");
//});
let btnVolverPago = document.getElementById("btnVolverPago");
btnVolverPago.addEventListener("click", function(){
    trazabilidadVolver("pago");
});
let btnConfirmacion = document.getElementById("btnConfirmacion");
btnConfirmacion.addEventListener("click", function(){
    trazabilidad("final");
});
let btnVolverConfirmacion = document.getElementById("btnVolverConfirmacion");
btnVolverConfirmacion.addEventListener("click", function(){
    trazabilidadVolver("confirmacion");
});
let btnPedidoFinal = document.getElementById("btnPedidoFinal");
btnPedidoFinal.addEventListener("click", function(){
    let vaciacarro = [];
    localStorage.setItem("carrito", JSON.stringify(vaciacarro));
    window.open("../index.html", "_self");
});



function trazabilidad(instancia,status,msjcliente) {
    let traza, envio, pago;
    switch(instancia) {
        case "detalle":
            traza = document.getElementById("detallePedido");
            traza.style.textDecoration = "line-through";
            traza.style.color = "whitesmoke";
            if (screen.width < "769") {
                traza.style.color = "#3a4750";
                traza.style.textDecoration = "none";
                traza = document.getElementById("datosEnvio");
                traza.style.display = "none";
                traza = document.getElementById("medioPago");
                traza.style.display = "none";
                traza = document.getElementById("confirmacionPedido");
                traza.style.display = "none";
            }
            break;
        case "envio":
            traza = document.getElementById("datosEnvio");
            traza.style.textDecoration = "line-through";
            traza.style.color = "whitesmoke";
            detalle = document.getElementById("detalle");
            detalle.style.display = "none";
            envio = document.getElementById("envio");
            envio.style.display = "flex";
            if (screen.width < "769") {
                traza.style.display = "flex";
                traza.style.color = "#3a4750";
                traza.style.textDecoration = "none";
                traza = document.getElementById("detallePedido");
                traza.style.display = "none";
                traza = document.getElementById("medioPago");
                traza.style.display = "none";
                traza = document.getElementById("confirmacionPedido");
                traza.style.display = "none";
            }
            break;
        case "pago":
            traza = document.getElementById("medioPago");
            traza.style.textDecoration = "line-through";
            traza.style.color = "whitesmoke";
            envio = document.getElementById("envio");
            envio.style.display = "none";
            pago = document.getElementById("pago");
            pago.style.display = "flex";
            if (screen.width < "769") {
                traza.style.display = "flex";
                traza.style.color = "#3a4750";
                traza.style.textDecoration = "none";
                traza = document.getElementById("detallePedido");
                traza.style.display = "none";
                traza = document.getElementById("datosEnvio");
                traza.style.display = "none";
                traza = document.getElementById("confirmacionPedido");
                traza.style.display = "none";
            }
            break;
        case "confirmacion":
            traza = document.getElementById("confirmacionPedido");
            traza.style.textDecoration = "line-through";
            traza.style.color = "whitesmoke";
            pago = document.getElementById("pago");
            pago.style.display = "none";
            confirmacion = document.getElementById("confirmacion");
            confirmacion.style.display = "flex";
            if (screen.width < "769") {
                traza.style.display = "flex";
                traza.style.color = "#3a4750";
                traza.style.textDecoration = "none";
                traza = document.getElementById("detallePedido");
                traza.style.display = "none";
                traza = document.getElementById("datosEnvio");
                traza.style.display = "none";
                traza = document.getElementById("medioPago");
                traza.style.display = "none";
            }
            break;
        case "final":
            confirmacion = document.getElementById("confirmacion");
            confirmacion.style.display = "none";
            finalPedido = document.getElementById("finalPedido");
            finalPedido.style.display = "flex";
            let mensaje = document.getElementById("mensaje");
            let iconomensaje = document.getElementById("iconomensaje");

            mensaje.innerText = msjcliente;
            switch(status) {
                case "approved":
                    iconomensaje.className = "far fa-check-circle";
                    iconomensaje.style.color = "forestgreen";
                    break;
                case "in_process":
                    iconomensaje.className = "far fa-clock";
                    iconomensaje.style.color = "orange";
                    break;
                case "rejected":
                    iconomensaje.className = "far fa-sad-tear";
                    iconomensaje.style.color = "red";
                    break;
            }
            break;
    }
}

function trazabilidadVolver(instancia) {
    let traza, detalle, envio, pago, confirmacion;
    switch(instancia) {
        case "envio":
            traza = document.getElementById("datosEnvio");
            traza.style.textDecoration = "none";
            traza.style.color = "black";
            envio = document.getElementById("envio");
            envio.style.display = "none";
            detalle = document.getElementById("detalle");
            detalle.style.display = "flex";
            break;
        case "pago":
            traza = document.getElementById("medioPago");
            traza.style.textDecoration = "none";
            traza.style.color = "black";
            pago = document.getElementById("pago");
            pago.style.display = "none";
            envio = document.getElementById("envio");
            envio.style.display = "flex";
            break;
        case "confirmacion":
            traza = document.getElementById("confirmacionPedido");
            traza.style.textDecoration = "none";
            traza.style.color = "black";
            confirmacion = document.getElementById("confirmacion");
            confirmacion.style.display = "none";
            pago = document.getElementById("pago");
            pago.style.display = "flex";
            break;
    }
}