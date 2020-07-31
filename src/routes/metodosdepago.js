const { Router } = require('express');
const router     = Router();

const Metodo = require('../models/dbmetodosdepago');

router.get('/', async (req,res)=> {
    const metodos = await Metodo.find();
    
    res.json(metodos);
});


router.post('/', async (req,res)=> {

    const { id, nombre, imagen, descripcion} = req.body;

    const newMetodo = new Metodo({id, nombre, imagen, descripcion});

    await newMetodo.save();
    
    res.json({'mensaje':'approved',
              'coderror':000});
});

router.post('/masivo', async (req,res)=> {

    const metodos = req.body;

    for (let i=0; i < metodos.length; i++) {
        var {id, nombre, imagen, descripcion} = metodos[i];
        var newMetodo = new Metodo({id, nombre, imagen, descripcion});

        await newMetodo.save();
    }

    res.json({ "mensaje":"approved",
               "codretorno":000 });
});

router.delete('/:id', async (req,res)=> {

    await Metodo.findByIdAndDelete(req.params.id);
    
    res.json({'mensaje':'approved',
              'coderror':000});
});

module.exports = router;