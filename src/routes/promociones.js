const { Router } = require('express');
const router     = Router();

const Promocion = require('../models/dbpromociones');

router.get('/', async (req,res)=> {
    const promociones = await Promocion.find();
    
    res.json(promociones);
});

router.post('/', async (req,res)=> {
    const { nombre, imagen, idbodega, unidades, precioanterior, preciopromo, descripcion} = req.body;

    const newPromocion = new Promocion({nombre, imagen, idbodega, unidades, precioanterior, preciopromo, descripcion});

    await newPromocion.save();
    
    res.json({'mensaje':'approved',
              'coderror':000});
});

router.post('/masivo', async (req,res)=> {

    const promociones = req.body;

    for (let i=0; i < promociones.length; i++) {
        var {nombre, imagen, idbodega, unidades, precioanterior, preciopromo, descripcion} = promociones[i];
        var newPromocion = new Promocion({nombre, imagen, idbodega, unidades, precioanterior, preciopromo, descripcion});

        await newPromocion.save();
    }

    res.json({ "mensaje":"approved",
               "codretorno":000 });
});

router.delete('/:id', async (req,res)=> {
    await Promocion.findByIdAndDelete(req.params.id);
    
    res.json({'mensaje':'approved',
              'coderror':000});
});

router.put('/', async (req,res)=> {
    const { nombre, imagen, idbodega, unidades, precioanterior, preciopromo, descripcion} = req.body;
    let myquery = { _id: req.body._id };
    let newvalues = { $set: { nombre: nombre, imagen: imagen, idbodega: idbodega, unidades: unidades, precioanterior: precioanterior, preciopromo: preciopromo, descripcion:descripcion} };
    await Promocion.findOneAndUpdate(myquery,newvalues);
    
    res.json({'mensaje':'approved',
              'codretorno':000});
});

module.exports = router;