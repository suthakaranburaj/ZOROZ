import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Cart} from '../models/cart.model.js'

const addItemToCart = asyncHandler(async(req,res)=>{
    const {productId, quantity=1, price} = req.body;
    if(!productId ||!price){
        return res
        .status(400)
        .json(new ApiError(400,"Product Id or Price is missing !"));
    }

    const userId = req.user?._id;
    if(!userId){
        return res
        .status(400)
        .json(new ApiError(400,"UserId is missing !"));
    }

    let cart = await Cart.findOne({ userId });
    if(!cart){
        cart = await Cart.create(
            {
                userId,
                items:[],
                totalPrice:0
            }
        );
    }

    const itemIndex = cart?.items.findIndex(item => item?.productId === productId);
    if(itemIndex > -1){
        cart.items[itemIndex].quantity += quantity;
    }
    else{
        cart.items?.push({productId, quantity, price});
    }

    cart.totalPrice += price * quantity; 
    await cart.save();
    return res
    .status(201)
    .json(new ApiResponse(201,cart,"Product added to cart successfully !"));

});

const removeItemFromCart = asyncHandler(async(req,res)=>{
    const {productId} = req.params;
    // console.log(productId);
    if(!productId){
        return res
        .status(400)
        .json(new ApiError(400,"Product Id is missing !"));
    }
    
    const userId = req.user?._id;
    if(!userId){
        return res
        .status(400)
        .json(new ApiError(400,"UserId is missing !"));
    }

    const cart = await Cart.findOne({userId});
    if(!userId.equals(cart?.userId)){
        return res
        .status(401)
        .json(new ApiError(401,"Unautherized to remove Item !"))
    }
    if(!cart){
        return res
        .status(404)
        .json(new ApiError(404,"Cart not found !"));
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if(itemIndex > -1){
        const item = cart.items[itemIndex];
        cart.totalPrice -= item.price;
        console.log(cart.items[itemIndex].quantity);
        if(cart.items[itemIndex].quantity > 1){
            cart.items[itemIndex].quantity -= 1;
            await cart.save();
        }
        else{
            cart.items.splice(itemIndex, 1);
            await cart.save();
            if(cart.items.length === 0){
                await Cart.findOneAndDelete({userId});
            }
        }
        return res
        .status(200)
        .json(new ApiResponse(200,cart,"Items removed from the cart successfully !"));
    }
    else{
        return res
        .status(404)
        .json(new ApiError(404,"Product not found !")); 
    }
});

const viewCart = asyncHandler(async(req,res)=>{

    const userId = req.user?._id;
    if(!userId){
        return res
        .status(400)
        .json(new ApiError(400,"User Id not found !"));
    }

    const cart = await Cart.findOne({userId});
    if(!cart){
        return res
        .status(200)
        .json(new ApiResponse(200,"No Cart found !"));
    }

    return res
    .status(200)
    .json(new ApiResponse(200,cart,"Cart of user fetched Sucessfully!"))
});

const clearCart = asyncHandler(async(req,res)=>{

    const userId = req.user?._id;
    if(!userId){
        return res
        .status(400)
        .json(new ApiError(400,"User id is missing !"));
    }
    console.log(userId)
    const cart = await Cart.findOne({ userId });
    console.log(cart?.userId)
    if(!userId.equals(cart?.userId)){
        return res
        .status(401)
        .json(new ApiError(401,"Unautherized to Delete Cart !"))
    }
    await Cart.findOneAndDelete({userId});

    return res
    .status(200)
    .json(new ApiResponse(200,"User Cart deleted Successfully !"));
});

export {
    addItemToCart,
    removeItemFromCart,
    viewCart,
    clearCart,
}