const { Schema, model } = require('mongoose');

const PedidosSchema = new Schema({
    idcliente       : { type: String, required: true        },
    idmetodopago    : { type: String, required: true        }, 
    email           : { type: String, required: true        },
    telefono        : { type: Number, required: true        },
    domicilio       : { type: String, required: true        },
    nrodomicilio    : { type: Number, required: true        },
    piso            : { type: String, required: false       },
    depto           : { type: String, required: false       },
    barrio          : { type: String, required: true        },
    localidad       : { type: String, required: true        },
    codpostal       : { type: Number, required: true        },
    idpagoext       : { type: Number, required: false       },
    metodopagoext   : { type: String, required: false       },
    importe         : { type: Number, required: true        },
    detalle         : { type: String, required: true        }, 
    status          : { type: String, required: true        },
    status_detalle  : { type: String, required: true        },
    fechamodif      : { type: Date  , default: Date.now     },
    fechaalta       : { type: Date  , default: Date.now     }
});

// Un nombre cualquiera y el nombre del schema
module.exports = model('PedidosModel', PedidosSchema);