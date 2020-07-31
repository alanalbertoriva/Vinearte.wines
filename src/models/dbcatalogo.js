const { Schema, model } = require('mongoose');

const CatalogoSchema = new Schema({
    nombre          : { type: String, required: true        },
    imagen          : { type: String, required: true        },
    idbodega        : { type: String, required: true        },
    unidades        : { type: Number, required: true        },
    precio          : { type: Number, required: true        },
    stock           : { type: Number, default: 10           },
    fechamodif      : { type: Date  , default: Date.now     },
    fechaalta       : { type: Date  , default: Date.now     }
});

// Un nombre cualquiera y el nombre del schema
module.exports = model('CatalogoModel', CatalogoSchema);