// Este metodo me permite definir nuevas rutas para mi servidor
const {Router} = require('express');
const router = Router();

//routes
router.post('/', (req, res) => {
    const { token, description, transaction_amount, installments , payment_method_id, payer, statement_descriptor} = req.body;
    // res.send  envia un string
    // res.json  envia un json
    
    const mercadopago = require("mercadopago");

    mercadopago.configurations.setAccessToken("TEST-3921891253635793-072103-59ad71bf891e0ceb0acd185714c2b5ac-592561525");

    var payment_data = {
      transaction_amount: transaction_amount,
      token: token,
      description: description,
      installments: installments,
      payment_method_id: payment_method_id,
      payer: {
        email: payer.email
      },
      statement_descriptor: statement_descriptor
    };

    mercadopago.payment.save(payment_data).then(function (data) {
        console.log(data);
        res.json(data);
    })
    .catch(function (error) {
        console.log(error);
        res.json(error);
    });
});

// Lo exportamos para poder importarlo en el resto de mis archivos
module.exports = router;