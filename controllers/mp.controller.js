const { response, request } = require('express');
const mercadopago = require('../helpers/mercadoPago');

exports.createPreference = (req, res, next) => {

    let preference = {
        items: [{
            title: req.body.description,
            unit_price: Number(req.body.price),
            quantity: Number(req.body.quantity)
        }],
        back_urls: {
            "success" : "http://localhost:3000/feedback",
            "failure" : "http://localhost:3000/feedback",
            "pending" : "http://localhost:3000/feedback"
        },
        auto_return: 'approved'
    }

    mercadopago.preference.create(preference)
    .then(response => res.json({id : response.body.id}))
    .catch(err => console.log(err))

};

exports.feedback = (req, res, next) => {
    response.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query_merchant_order_id
    })

};