// requerimos express
const express = require('express');
// ejecutamos framework de express
const app     = express();
const morgan  = require('morgan');
const cors  = require('cors');

//settings
// es como crear una variable global
// Si existe algun puerto que lo tome, sino que tome el 3000
//app.set('port', process.env.port || 3000);
// Solo para hacer mas legible el json, no hace falta
app.set('json spaces', 2);

const PORT = process.env.PORT || 3000;

// middlewares
// Para ver las peticiones a mi servidor se usa morgan
app.use(morgan('dev'));
// Para interpretar datos que vienen de formularios... input de texto, nada pesado como fotos
app.use(express.urlencoded({extended:false}));
// le permite a mi servidor leer e interpretar formatos json
app.use(express.json());
// le permite a mi servidor ser accedido localmente (localhost)
app.use(cors());

// Routes
app.use('/api/pagos', require('./routes/pagos'));
app.use('/api/error', require('./routes/mercadopago_error_datos'));
app.use('/api/errorcreartoken', require('./routes/mercadopago_error_creartoken'));
app.use('/api/estadopago', require('./routes/mercadopago_estado_pago'));

// Starting the server
//app.listen(app.get('port'), ()=> {
//    console.log(`Server on port ${app.get('port')}`);
//});

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});