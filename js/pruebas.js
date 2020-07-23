function Pruebas(id, descripcion, comunicacion) {
    this.id = id;
    this.descripcion = descripcion;
    this.comunicacion = comunicacion;
}

var productos=[];
    
productos.push( new Pruebas   ('106','Cannot operate between users from different countries',	'No puedes realizar pagos a otros países.'));
productos.push( new Pruebas   ('109','Invalid number of shares for this payment_method_id',	'payment_method_id no procesa pagos en installments cuotas. Elige otra tarjeta u otro medio de pago.'));
productos.push( new Pruebas   ('126','The action requested is not valid for the current payment state',	'No pudimos procesar tu pago.'));
productos.push( new Pruebas   ('129','Cannot pay this amount with this paymentMethod',	'payment_method_id no procesa pagos del monto seleccionado. Elige otra tarjeta u otro medio de pago.'));
productos.push( new Pruebas   ('145','Invalid users involved',	'Una de las partes con la que intentas hacer el pago es de prueba y la otra es usuario real.'));
productos.push( new Pruebas   ('150','The payer_id cannot do payments currently',	'No puedes realizar pagos.'));
productos.push( new Pruebas   ('151','The payer_id cannot do payments with this payment_method_id',	'No puedes realizar pagos.'));
productos.push( new Pruebas   ('160','Collector not allowed to operate',	'No pudimos procesar tu pago.'));
productos.push( new Pruebas   ('204','Unavailable payment_method',	'payment_method_id no está disponible en este momento. Elige otra tarjeta u otro medio de pago.'));
productos.push( new Pruebas   ('801','Already posted the same request in the last minute',	'Realizaste un pago similar hace instantes. Intenta de nuevo en unos minutos.'));


console.log(productos);

sessionStorage.setItem("pruebas", JSON.stringify(productos));