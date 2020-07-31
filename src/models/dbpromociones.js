const { Schema, model } = require('mongoose');

const PromosSchema = new Schema({
    nombre          : { type: String, required: true        },
    imagen          : { type: String, required: true        },
    idbodega        : { type: String, required: true        },
    unidades        : { type: Number, required: true        },
    precioanterior  : { type: Number, required: true        },
    preciopromo     : { type: Number, required: true        },
    descripcion     : { type: String, required: true        },
    cantcarrito     : { type: Number, default: 1            },
    fechamodif      : { type: Date  , default: Date.now     },
    fechaalta       : { type: Date  , default: Date.now     }
});

// Un nombre cualquiera y el nombre del schema
module.exports = model('PromocionesModel', PromosSchema);