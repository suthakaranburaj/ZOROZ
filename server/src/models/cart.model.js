import mongoose, { Schema } from "mongoose";
import { type } from "os";


const cartSchema = new Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
        },

        items:[
            {
                productId:String,
                quantity: {
                    type: Number,
                    default:1
                },
                price:Number
            }
        ],

        totalPrice:{
            type:Number,
            default:0,
        }
    },
    {
        timestamps:true
    }
);

export const Cart = mongoose.model("Cart", cartSchema)