const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    title: String,
    description: String,
    category: {type: String, enum: ['Exfoliante', 'Energetico', 'Tropical', 'Frutal', 'Relajante']},
    img: {
        type: [String]
    },
    featured : Boolean,
    stock: Boolean,
    price: Number,
    available: {type: Boolean, default: false}
},{
    timestamps:true,
    versionKey: false
});

module.exports = model('Product', productSchema);