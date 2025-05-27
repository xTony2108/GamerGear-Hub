const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const productSchema = new Schema({
    discountCode: {
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    }
}, { timestamps: true, strict: true });

const Discount = model("Discount", productSchema);

module.exports = Discount;