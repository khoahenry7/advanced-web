const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({
    product_id: { type: Number, unique: true },
    name: String,
    price: { type: Number },
    image: { type: String, unique: true },
    description: String
}, {
    timestamps: true,
})

module.exports = mongoose.model('Product', Product)
