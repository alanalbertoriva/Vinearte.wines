const mongoose = require('mongoose');

// Para conectarme a mi base de datos local
// Se toma variable de entorno
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
})
.then(db => console.log("DB esta conectada"))
.catch(err => console.error(err));

