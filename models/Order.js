const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
    orderNumber: String,
    notes: String,
    total: Number,
    status: {
        type: String,
        enum: ['PAID', 'CONFIRMED', 'ON DELIVERY', 'CANCELED','COMPLETED', 'PENDING'],
        default: 'PENDING'
    },
    _user: {type: Schema.Types.ObjectId, ref:"User", required: [true, "Un pedido requiere un cliente"]},
    _products: {type: [Schema.Types.ObjectId], ref: "Product", required: [true, "Un pedido requiere un producto"]}
},{
    timestamps:true,
    versionKey: false
});

module.exports = model('Order', orderSchema);