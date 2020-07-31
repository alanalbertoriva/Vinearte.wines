const { Router } = require('express');
const router     = Router();

const Cliente = require('../models/dbclientes');

router.get('/', async (req,res)=> {
    const clientes = await Cliente.find();
    
    res.json(clientes);
});

router.get('/documento/:nrodoc', async (req,res)=> {

    const clientes = await Cliente.find({"nrodoc":req.params.nrodoc});
    
    res.json(clientes);
});

router.post('/', async (req,res)=> {

    const { nombre, apellido, tipodoc, nrodoc, email, telefono, domicilio, nrodomicilio, piso, depto, barrio, localidad, codpostal} = req.body;

// Verificamos i el cliente existe, de existir lo actualizamos
    const clientes = await Cliente.find({"nrodoc":nrodoc});
    let nroclien = "";
    if(clientes.length > 0) {
        console.log("Mayor");
        let myquery = { _id: clientes[0]._id };
        let newvalues = { $set: { nombre: nombre, apellido: apellido, tipodoc: tipodoc, nrodoc: nrodoc, email: email, telefono: telefono, domicilio: domicilio, nrodomicilio: nrodomicilio, piso: piso, depto: depto, barrio: barrio, localidad: localidad, codpostal: codpostal } };
        Cliente.updateOne(myquery,newvalues,function(err, res) {
            if (err) throw err;
            //console.log("1 document updated");
          });
        nroclien = clientes[0]._id;
    } else {
        const newCliente = new Cliente({nombre, apellido, tipodoc, nrodoc, email, telefono, domicilio, nrodomicilio, piso, depto, barrio, localidad, codpostal});
        let alta = await newCliente.save();
        nroclien = alta._id;
    }

    res.json({ "_id":nroclien});
    //await newCliente.save();
    
});

router.delete('/:id', async (req,res)=> {

    await Cliente.findByIdAndDelete(req.params.id);
    
    res.json({'mensaje':'approved',
              'coderror':000});
});

module.exports = router;