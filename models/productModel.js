const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },

    productDescription: {
        type: String,
        required: true
    },

    productPrice: {
        type: Number,
        required: true
    },

    productQuantity: {
        type: Number,
        required: true
    },
    
}, {timestamps: true})

const Product = mongoose.model("PRODUCT", ProductSchema)
module.exports = Product