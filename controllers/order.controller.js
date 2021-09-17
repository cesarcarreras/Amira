const Order = require('../models/Order');
const User = require('../models/User')

const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");

const mailersend = new MailerSend({
    api_key: process.env.API_MS,
});


exports.createOrder = async (req, res) => {

    let orderNumber = 'ID'
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 0; i < 8; i++) {
        orderNumber += characters[Math.floor(Math.random() * characters.length )]
    }

    Order.create({...req.body, orderNumber})
    .then(order => res.status(200).json(order))
    .catch(err => res.status(500).json({err}))
};

exports.getAllOrders = (req, res) => {
    Order.find()
    .populate("_user", "phone email lastName address name")
    .populate("_product", "title")
    .then(orders => res.status(200).json({orders}))
    .catch(err => res.status(500).json({err}))
};

exports.oneOrder = async (req, res) => {
    try {

        const {id} = req.params
        const newOrder = await Order.findById(id)
        .populate('_user', 'name lastName phone address email')

        Order.findByIdAndUpdate(id, {...req.body, status: "PAID"}, {new:true})
        .then((updatedOrder) => res.status(200).json({updatedOrder}))
        .catch(err => console.log(err))

        const recipients = [
            new Recipient(newOrder._user.email)
        ];

        const variables = [
            {
                email: newOrder._user.email,
                substitutions:
                [
                    {var: "email", value: newOrder._user.email},
                    {var: "name", value: newOrder._user.name},
                    {var: "lastName", value: newOrder._user.lastName},
                    {var: "address", value: newOrder._user.address},
                    {var: "phone", value: newOrder._user.phone},
                    {var: "products", value: newOrder._products.length.toString()},
                    {var: "orderNumber", value: newOrder.orderNumber},
                    {var: "total", value: newOrder.total.toString()},
                    {var: "iva", value: newOrder.iva.toString()},
                    {var: "status", value: newOrder.status},
                    {var: "orderID", value: newOrder._id},
                    {var: "date", value: new Date().toString().slice(0, 10)},
                    {var: "shippingPrice", value: newOrder.shippingPrice.toString()}
                ]}
            ];

            const emailParams = new EmailParams()
            .setFrom("compras@cesarcarreras.com")
            .setFromName("Amira Soap")
            .setRecipients(recipients)
            .setVariables(variables)
            .setSubject("Gracias por tu compra! 🧼")
            .setTemplateId('neqvygmy5dg0p7w2')

            setTimeout(() => {
                mailersend.send(emailParams)
            }, 5000)
        res.status(200).json({newOrder})
    } catch (err) {
        res.status(500).json({err})
    }
};

exports.findOrder = (req, res) => {
    const {id} = req.params
    Order.findByIdAndUpdate(id, {...req.body}, {new:true})
    .then(order => res.status(200).json({order}))
    .catch(err => res.status(500).json({err}))
};

exports.updateOrder = (req, res) => {
    const {id} = req.params
    Order.findByIdAndUpdate(id, {...req.body}, {new:true})
    .then(order => res.status(200).json({order}))
    .catch(err => res.status(500).json({err}))
};

exports.deleteOrder = (req, res) => {
    const {id} = req.params
    Order.findByIdAndRemove(id)
    .then( () => res.status(200).json({msg: "Pedido borrado con éxito"}))
    .catch(err => res.status(500).json({err}))
};

exports.trackOrder = (req, res) => {
    const {id} = req.params
    Order.findById(id)
    .then(order => res.status(200).json({order}))
    .catch(err => res.status(500).json({err}))
};