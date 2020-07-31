const { Schema, model } = require('mongoose');

const MetodosPagoSchema = new Schema({
    id              : { type: Number, required: true        },
    nombre          : { type: String, required: true        },
    imagen          : { type: String, required: true        },
    descripcion     : { type: String, required: true        },
    fechamodif      : { type: Date  , default: Date.now     },
    fechaalta       : { type: Date  , default: Date.now     }
});

// Un nombre cualquiera y el nombre del schema
module.exports = model('MetodosPagoModel', MetodosPagoSchema);