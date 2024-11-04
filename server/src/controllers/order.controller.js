import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Order} from '../models/order.model.js'

const placeOrder = asyncHandler(async(req,res)=>{
    const{items, totalAmount} = req.body;
    if(!items || !totalAmount){
        return res
        .status(400)
        .json(new ApiError(400, "Products and total Amount not found !"));
    }

    const userId = req.user?._id;
    if(!userId){
        return res
        .status(400)
        .json(new ApiError(400,"User Id is missing !"));
    }

    const order = new Order({
        userId,
        items,
        totalAmount,
        status: 'pending',
        paymentStatus: 'pending'
    });

    await order.save();
    return res
    .status(201)
    .json(new ApiResponse(201,order,"Order Placed Successfully !"));
});

const getOrderDetails  = asyncHandler(async(req,res)=>{
    const {orderId} = req.params
    if(!orderId){
        return res
        .status(400)
        .json(new ApiError(400,"User Id is missing !"));
    }

    const order = await Order.findById({_id:orderId}).populate("userId","name email");

    if (!order) return res.status(404).json( new ApiError(404, "Order not found"));

    return res
    .status(200)
    .json(new ApiResponse(200,order,"Order Detials Fetched Successfully !"))
});

const getOrderHistory  = asyncHandler(async(req,res)=>{
    // console.log(req.user._id);
    const {userId} = req.params;
    if(!userId){
        return res
        .status(400)
        .json(new ApiError(400,"User Id is missing !"));
    }

    const orders = await Order.find({userId}).sort({createdAt:-1});

    return res
    .status(200)
    .json(new ApiResponse(200,orders,"Orders Fetched Successfully !"))
});

const updateOrderStatus  = asyncHandler(async(req,res)=>{
    const {orderId} = req.params;
    if(!orderId){
        return res
        .status(400)
        .json(new ApiError(400,"Order Id is missing !"));
    }

    const {status} = req.body;
    if(!status){
        return res
        .status(400)
        .json(new ApiError(400,"Status is required !"));
    }

    const order = await Order.findByIdAndUpdate(
        orderId,
        {
            status
        },
        {
            new:true
        }
    );
    if(!order){
        return res
        .status(404)
        .json(new ApiError(404,"Order not found !"));
    }

    return res
    .status(201)
    .json(new ApiResponse(201,order,"Order status updated successfully !"));
});

export {
    placeOrder,
    getOrderDetails,
    getOrderHistory,
    updateOrderStatus,
}