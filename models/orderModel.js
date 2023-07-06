const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({

    productId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PRODUCT"
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER"
    },

    quantity: {
        type: Number,
        required: true,
        default: 1
    },

    totalPrice: {
        type: Number,
        required: true,
    },

    timestamp: {
        type: Date,
        default: Date.now
    },


})


const Order = mongoose.model("ORDER", OrderSchema)
module.exports = Order