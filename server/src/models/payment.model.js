import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        paymentMethod: {
            type: String,
            enum: ['credit_card', 'debit_card', 'paypal', 'net_banking']
        },
        paymentStatus: {
            type: String,
            enum: ['success', 'failure','pending'],
            required: true
        },
        transactionId: String,
    },
    {
        timestamps:true,
    }
)

export const Payment = mongoose.model("Payment",paymentSchema)