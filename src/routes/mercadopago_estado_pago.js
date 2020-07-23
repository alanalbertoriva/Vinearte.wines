// Este metodo me permite definir nuevas rutas para mi servidor
const {Router} = require('express');
const router = Router();
const errorDatos = require('../../json/estadopago.json');
const _ = require('underscore');
var descComunicacion = "";

//routes
router.get('/:id&:descripcion', (req, res) => {
    const { id, descripcion } = req.params;
    for (let i=0; i < errorDatos.length; i++) {
        if(errorDatos[i].id == id && errorDatos[i].descripcion == descripcion) {
            descComunicacion = errorDatos[i].comunicacion;
        }
    }
    let mensaje = {
        comunicacion: descComunicacion
    };
    res.json(mensaje);
});

// Lo exportamos para poder importarlo en el resto de mis archivos
module.exports = router;