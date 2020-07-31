const { Router } = require('express');
const router     = Router();

const Pedido = require('../models/dbpedidos');

router.get('/', async (req,res)=> {
    const pedidos = await Pedido.find();
    
    res.json(pedidos);
});

router.get('/pedido/:id', async (req,res)=> {

    const pedidos = await Pedido.findById(req.params.id);
    
    res.json(pedidos);
});

router.post('/', async (req,res)=> {

    const {idcliente, idmetodopago, email, telefono, domicilio, nrodomicilio, piso, depto, barrio, localidad, codpostal, idpagoext, metodopagoext, importe, detalle, status, status_detalle} = req.body;

    const newPedido = new Pedido({idcliente, idmetodopago, email, telefono, domicilio, nrodomicilio, piso, depto, barrio, localidad, codpostal, idpagoext, metodopagoext, importe, detalle, status, status_detalle});

    await newPedido.save();
    
    res.json({'mensaje':'approved',
              'coderror':000});
});

router.delete('/:id', async (req,res)=> {

    await Pedido.findByIdAndDelete(req.params.id);
    
    res.json({'mensaje':'approved',
              'coderror':000});
});

module.exports = router;