const { Router } = require('express');
const router     = Router();

const Bodega = require('../models/dbbodejas');

router.get('/', async (req,res)=> {
    const bodegas = await Bodega.find();
    
    res.json(bodegas);
});

router.get('/:id', async (req,res)=> {
    const bodegas = await Bodega.findById(req.params.id);
    
    res.json(bodegas);
});

router.get('/bodega/:bodega', async (req,res)=> {
    let myquery = { nombre: req.params.bodega };
    const bodegas = await Bodega.find(myquery);
    
    res.json(bodegas);
});

router.post('/', async (req,res)=> {

    const { id, nombre, imagen, descripcion} = req.body;

    const newBodega = new Bodega({id, nombre, imagen, descripcion});

    await newBodega.save();
    
    res.json(newBodega);
});

router.post('/masivo', async (req,res)=> {

    const bodegas = req.body;

    for (let i=0; i < bodegas.length; i++) {
        var {id, nombre, imagen, descripcion} = bodegas[i];
        var newBodega = new Bodega({id, nombre, imagen, descripcion});

        await newBodega.save();
    }

    res.json({ "mensaje":"approved",
               "codretorno":000 });
});

router.delete('/:id', async (req,res)=> {

    await Bodega.findByIdAndDelete(req.params.id);
    
    res.json({'mensaje':'approved',
              'coderror':000});
});

router.put('/', async (req,res)=> {
    const { nombre, imagen, descripcion} = req.body;
    let myquery = { _id: req.body._id };
    let newvalues = { $set: { nombre: nombre, imagen: imagen, descripcion: descripcion} };
    await Bodega.findOneAndUpdate(myquery,newvalues);
    
    res.json({'mensaje':'approved',
              'codretorno':000});
});

module.exports = router;