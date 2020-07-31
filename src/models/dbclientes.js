const { Schema, model } = require('mongoose');

const ClientesSchema = new Schema({
    nombre          : { type: String, required: true        },
    apellido        : { type: String, required: true        },
    tipodoc         : { type: String, required: true        },
    nrodoc          : { type: Number, required: true        },
    email           : { type: String, required: true        },
    telefono        : { type: Number, required: true        },
    domicilio       : { type: String, required: true        },
    nrodomicilio    : { type: Number, required: true        },
    piso            : { type: String, required: false       },
    depto           : { type: String, required: false       },
    barrio          : { type: String, required: true        },
    localidad       : { type: String, required: true        },
    codpostal       : { type: Number, required: true        }, 
    fechamodif      : { type: Date  , default: Date.now     },
    fechaalta       : { type: Date  , default: Date.now     }
});

// Un nombre cualquiera y el nombre del schema
module.exports = model('ClientesModel', ClientesSchema);