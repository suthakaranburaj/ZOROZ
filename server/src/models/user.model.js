import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { type } from "os";

const userSchema = new Schema(
    {
        email: {
            type: String,
            // required: true,
            unique: true,
            lowercase: true,  // fixed typo: 'lowecase' to 'lowercase'
            trim: true
        },
        name: {
            type: String,
            // required: true,
            trim: true,
            index: true
        },
        address: {
            type: String, 
            // required: true
        },
        phoneNumber: {
            type: String,
            // required: true,
            unique: true,
            index: true
        },
        // phoneNumberOtp: {
        //     type: Number
        // },
        emailVerified: {
            type: Boolean,
            default: false
        },
        // phoneVerified: {
        //     type: Boolean,
        //     default: false
        // },
        emailOtp: {
            type: Number
        },
        orderHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Order"
            }
        ],
        password: {
            type: String,
            // required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        },
        // role: {
        //     type: String,
        //     enum: ['customer', 'admin'],
        //     default: 'customer'
        // },
        wishlist: {
            type: [String],
            default: []
        },
        cart: {
            type: Schema.Types.ObjectId,
            ref: 'Cart'
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
            phoneNumber: this.phoneNumber
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);
