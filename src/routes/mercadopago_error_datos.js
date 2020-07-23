// Este metodo me permite definir nuevas rutas para mi servidor
const {Router} = require('express');
const router = Router();
const errorDatos = require('../../json/errordatos.json');
const _ = require('underscore');
var descComunicacion = "";

//routes
router.get('/:id', (req, res) => {
    const { id } = req.params;
    for (let i=0; i < errorDatos.length; i++) {
        if(errorDatos[i].id == id) {
            descComunicacion = errorDatos[i].comunicacion;
        }
    }
    if (descComunicacion == "") {
        descComunicacion = "Revisa los datos.";
    }
    let mensaje = {
        comunicacion: descComunicacion
    };
    res.json(mensaje);
});

// Lo exportamos para poder importarlo en el resto de mis archivos
module.exports = router;