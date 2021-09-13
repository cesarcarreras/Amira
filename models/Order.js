const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
    orderNumber: String,
    notes: String,
    total: Number,
    status: {type: String, enum: ['PENDING', 'PAID', 'CONFIRMED', 'ON DELIVERY', 'CANCELED','COMPLETED'], default:'NEW'},
    _user: {type: Schema.Types.ObjectId, ref:"User", required: [true, "Un pedido requiere un cliente"]},
    _product: {type: Schema.Types.ObjectId, ref: "Product", required: [true, "Un pedido require un producto"]}
},{
    timestamps:true,
    versionKey: false
});

module.exports = model('Order', orderSchema);