const { Router } = require('express');
const router     = Router();

const Producto = require('../models/dbcatalogo');

router.get('/', async (req,res)=> {
    const catalogo = await Producto.find();
    
    res.json(catalogo);
});

router.get('/stock', async (req,res)=> {

    const catalogo = await Producto.find({"stock": { $gt: 0 }});
    
    res.json(catalogo);
});

router.post('/', async (req,res)=> {

    const { nombre, imagen, idbodega, unidades, precio, stock} = req.body;

// Verificamos si el producto existe, si existe lo actualizamos
    const catalogo = await Producto.find({"nombre":nombre});
    var alta = catalogo;
    if(catalogo.length > 0) {
        let myquery = { _id: catalogo[0]._id };
        let newvalues = { $set: { nombre: nombre, imagen: imagen, idbodega: idbodega, unidades: unidades, precio: precio, stock: stock} };
        Producto.updateOne(myquery,newvalues,function(err, res) {
            if (err) throw err;
            //console.log("1 document updated");
          });
    } else {
        const newProducto = new Producto({nombre, imagen, idbodega, unidades, precio, stock});
        alta = await newProducto.save();
    }

    res.json(alta);
    
});

router.post('/masivo', async (req,res)=> {

    const catalogo = req.body;

    for (let i=0; i < catalogo.length; i++) {
        var {nombre, imagen, idbodega, unidades, precio, stock} = catalogo[i];
        var newProducto = new Producto({nombre, imagen, idbodega, unidades, precio, stock});

        await newProducto.save();
    }

    res.json({ "mensaje":"approved",
               "codretorno":000 });
});

router.delete('/:id', async (req,res)=> {

    await Producto.findByIdAndDelete(req.params.id);
    
    res.json({'mensaje':'approved',
              'codretorno':000});
});

router.put('/', async (req,res)=> {
    const { nombre, imagen, idbodega, unidades, precio, stock} = req.body;
    let myquery = { _id: req.body._id };
    let newvalues = { $set: { nombre: nombre, imagen: imagen, idbodega: idbodega, unidades: unidades, precio: precio, stock: stock} };
    await Producto.findOneAndUpdate(myquery,newvalues);
    
    res.json({'mensaje':'approved',
              'codretorno':000});
});

module.exports = router;