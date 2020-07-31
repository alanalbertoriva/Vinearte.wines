const { Router } = require('express');
const router     = Router();

router.get('/', async (req, res) => { 
    let mercadopago = require('mercadopago');
    mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN);

    payment_methods = await mercadopago.get("/v1/payment_methods");

    res.json(payment_methods);
});

module.exports = router;