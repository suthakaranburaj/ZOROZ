import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },

        items:[
            {
                productId: String,
                quantity: Number,
                price: Number
            }
        ],

        totalAmount:{
            type:Number,
            required:true
        },

        status: {
            type: String,
            enum: ['pending', 'shipped', 'delivered', 'cancelled'],
            default: 'pending'
        },

        paymentStatus: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            default: 'pending'
        },
    },
    {
        timestamps:true,
    }
);

export const Order = mongoose.model("Order",orderSchema);

