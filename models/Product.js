const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    title: String,
    description: String,
    category: {type: String, enum: ['CAT1', 'CAT2', 'CAT3', 'CAT4', 'CAT5', 'CAT6']},
    img: {
        type: [String]
    },
    featured : Boolean,
    stock: Boolean,
    price: Number,
    url: String,
    available: {type: Boolean, default: false}
},{
    timestamps:true,
    versionKey: false
});

module.exports = model('Product', productSchema);