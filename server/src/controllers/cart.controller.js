import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Cart} from '../models/cart.model.js'

const addItemToCart = asyncHandler(async(req,res)=>{
    const {productId} = req.body;
    if(!productId){
        return res
        .status(400)
        .json(new ApiError(400,"Product Id is missing !"));
    }

    
});

const removeItemFromCart = asyncHandler(async(req,res)=>{

});

const viewCart = asyncHandler(async(req,res)=>{

});

const clearCart = asyncHandler(async(req,res)=>{

});

export {
    addItemToCart,
    removeItemFromCart,
    viewCart,
    clearCart,
}