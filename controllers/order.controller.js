const Order = require('../models/Order');

exports.createOrder = (req, res) => {
    let {orderNumber} = req.params

    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 0; i < 10; i++) {
        orderNumber += characters[Math.floor(Math.random() * characters.length )];
    }

    Order.create({...req.body, orderNumber})
    .then(order => res.status(200).json({order}))
    .catch(err => res.status(500).json({err}))
};

exports.getAllOrders = (req, res) => {
    Order.find()
    .then(orders => res.status(200).json({orders}))
    .catch(err => res.status(500).json({err}))
};

exports.oneOrder = (req, res) => {
    const {id} = req.params
    Order.findById(id)
    .then(order => res.status(200).json({order}))
    .catch(err => res.status(500).json({err}))
};

exports.updateOrder = (req, res) => {
    const {id} = req.params
    Order.findByIdandUpdate(id, {...req.body}, {new:true})
    .then(order => res.status(200).json({order}))
    .catch(err => res.status(500).json({err}))
};

exports.deleteOrder = (req, res) => {
    const {id} = req.params
    Order.findByIdAndRemove(id)
    .then(order => res.status(200).json({msg: "Pedido borrado con éxito"}))
    .catch(err => res.status(500).json({err}))
};