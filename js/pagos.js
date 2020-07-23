var publicKey   = "TEST-06885021-1092-4f61-b41d-4bf781e821ae";
var accessToken = "TEST-3921891253635793-072103-59ad71bf891e0ceb0acd185714c2b5ac-592561525";

window.Mercadopago.setPublishableKey(publicKey);
completarForm();

function completarForm () {
    let montoTotal  = document.getElementById("montoTotal");
    montoTotal.style.display = "none";
    let descripcion = document.getElementById("descProd");
    descripcion.style.display = "none";
    let transaction_amount = document.getElementById("transaction_amount");
    transaction_amount.setAttribute("value", calcTotalesNum());
// Obtener tipos de documento
    getTipoDoc();
// Obtener medio de pago y banco emisor
    let datosPago = new Promise ((resolve, reject)=>{
        document.getElementById('cardNumber').addEventListener('keyup', guessPaymentMethod);
        document.getElementById('cardNumber').addEventListener('change', guessPaymentMethod);
    })
    .then((response)=>{
// Obtener cuotas para el medio de pago
    getInstallments();
    });
    

    
// Generar token seguro de tarjeta
    doSubmit = false;
    document.querySelector('#pay').addEventListener('submit', doPay);
    
}

function getTipoDoc () {
    window.Mercadopago.getIdentificationTypes();
}

function guessPaymentMethod(event) {
    let cardnumber = document.getElementById("cardNumber").value;

    if (cardnumber.length >= 6) {
        let bin = cardnumber.substring(0,6);
        window.Mercadopago.getPaymentMethod({
            "bin": bin
        }, setPaymentMethod);
    }
};

function setPaymentMethod(status, response) {
    if (status == 200) {
        let paymentMethodId = response[0].id;
        let element = document.getElementById('payment_method_id');
        element.value = paymentMethodId;
        getInstallments();
    } else {
        alert(`Datos de medio de pago incorrecto: ${response}`);
    }
}

function getInstallments(){
    window.Mercadopago.getInstallments({
        "payment_method_id": document.getElementById('payment_method_id').value,
        "amount": parseFloat(document.getElementById('transaction_amount').value)

    }, function (status, response) {
        if (status == 200) {
            document.getElementById('installments').options.length = 0;
            response[0].payer_costs.forEach( installment => {
                let opt = document.createElement('option');
                opt.text = installment.recommended_message;
                opt.value = installment.installments;
                document.getElementById('installments').appendChild(opt);
            });
        } else {
            alert(`Problemas al obtener datos de la tarjeta: ${response}`);
        }
    });
}

function doPay(event){
    event.preventDefault();
    if(!doSubmit){
        var $form = document.querySelector('#pay');
        setTimeout(function(){ alert($form); }, 200000);
        window.Mercadopago.createToken($form, sdkResponseHandler);
        
        return false;
    }
};

function sdkResponseHandler(status, response) {
    if (status != 200 && status != 201) {
        console.log(response);
        let code = response.cause[0].code;
        coderror = fetch(`http://localhost:3000/api/error/${code}`)
        .then(coderror => coderror.json())
        .then(coderror => {
            alert(coderror.comunicacion);
        });
    }else{
        var form = document.querySelector('#pay');
        var card = document.createElement('input');
        card.setAttribute('name', 'token');
        card.setAttribute('type', 'hidden');
        card.setAttribute('value', response.id);
        form.appendChild(card);
        doSubmit=true;
        //form.submit();
        //console.log(response.id);
        var resultado = prueba(response.id);
        //var respuestaMP = await prueba(response.id);
        //console.log(respuestaMP);
        //var pruebas = fetch("../index.js");
    }
};

function prueba(cardToken) 
{
    fetch('http://localhost:3000/api/pagos', {
        method: 'POST',
        headers: { 
            "Content-type": "application/json",
            "accesstoken" : "TEST-3921891253635793-072103-59ad71bf891e0ceb0acd185714c2b5ac-592561525"
        },
        body: JSON.stringify({             
            token: cardToken,
            description: "VinearteWines - " + document.getElementById('cardholderName').value + " - " + document.getElementById('docType').value + " " + document.getElementById('docNumber').value,
            transaction_amount: calcTotalesNum(),
            installments: parseInt(document.getElementById('installments').value),
            payment_method_id: document.getElementById('payment_method_id').value,
            payer : {
                email : document.getElementById("email").value
            },
            statement_descriptor: "VinearteWines"
        })
    })
    .then(response =>  response.json())
    .then(response => {
        console.log(response.body);
        getEstadoPago(response.body.status, response.body.status_detail);
        //if(response.body.status == "approved" ) {
        // status_detail
        //}   
    });
}
//response.json(); 

function calcTotalesNum() {
    let carro = JSON.parse(localStorage.getItem("carrito"));
    let acumulado = 0;
    if(carro != null) {
        for(let i=0; i < carro.length; i++){
            acumulado     = acumulado + (carro[i].cantcarrito * carro[i].preciopromo);
        }
    }
    return acumulado;
}

function getEstadoPago(status, status_detail) {
    fetch(`http://localhost:3000/api/estadopago/${status}&${status_detail}`)
    .then(response =>  response.json())
    .then(response => {
        let mensaje = response.comunicacion;
        mensaje     = mensaje.replace("amount", "$"+calcTotalesNum());
        mensaje     = mensaje.replace("statement_descriptor", "VinearteWines");
        mensaje     = mensaje.replace("payment_method_id", document.getElementById('payment_method_id').value);
        mensaje     = mensaje.replace("installments", document.getElementById('installments').value);
        alert(mensaje);
        trazabilidad("confirmacion");
        trazabilidad("final",status,mensaje);
    });
}