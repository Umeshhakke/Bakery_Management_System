const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    customer: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            itemId: { type: String },
            name: { type: String },
            quantity: { type: Number },
            price: { type: Number }
        }
    ],
    total: { type: Number, required: true },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Assigned", "Out for Delivery", "Delivered", "Cancelled", "Issue Reported"],
        default: "Pending"
    },
    deliveryPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid"],
        default: "Pending"
    },
    paymentMethod: {
        type: String,
        enum: ["Cash", "Online"],
        default: null
    },
    deliveryIssue: {
        type: String,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
