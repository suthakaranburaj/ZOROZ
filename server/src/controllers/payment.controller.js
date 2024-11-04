import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import {Payment} from '../models/payment.model.js'
import {Order} from '../models/order.model.js'

const initiatePayment = asyncHandler(async(req,res)=>{
    const {orderId, amount, paymentMethod} = req.body;
    if(!orderId || !amount || !paymentMethod){
        return res
        .status(400)
        .json(new ApiError(400,"OrderId , Amount and paymentMethod is required !"));
    }

    const userId = req.user?._id;
    if(!userId){
        return res
        .status(400)
        .json(new ApiError(400,"User Id is missing !"));
    }

    const payment = new Payment({
        orderId,
        userId,
        amount,
        paymentMethod,
        paymentStatus: 'pending'
    });

    await payment.save();
    return res
    .status(201)
    .json(new ApiResponse(201,payment,"Payment Initiated Successfully !"));
});

const confirmPayment  = asyncHandler(async(req,res)=>{
    const {paymentId} = req.params;
    if(!paymentId){
        return res
        .status(400)
        .json(new ApiError(400,"Payment Id is missing !"));
    }

    const {paymentStatus, transactionId} = req.body;
    if(!paymentStatus || !transactionId){
        return res
        .status(400)
        .json(new ApiError(400,"Payment Status and transaction Id are required !"));
    }

    const updatedPayment = await Payment.findByIdAndUpdate(
        paymentId,
        {paymentStatus, transactionId},
        {new : true}
    );
    if(!updatedPayment){
        return res
        .status(400)
        .json(new ApiError(400,"Payment not found !"));
    }

    const order = await Order.findByIdAndUpdate(
        updatedPayment.orderId,
        { paymentStatus: paymentStatus === 'success' ? 'completed' : 'failed' },
        { new: true }
    );

    return res
    .status(201)
    .json(new ApiResponse(201,{order,updatedPayment},"Payment Updated Successfully !"))
});

const getPaymentDetails  = asyncHandler(async(req,res)=>{
    const {paymentId} = req.params;
    if(!paymentId){
        return res
        .status(400)
        .json(new ApiError(400,"Payment Id is missing !"))
    }

    const payment = await Payment.findById(paymentId).populate("userId", "name email");
    if(!payment){
        return res
        .status(404)
        .json(new ApiError(404,"Payment not found!"));
    }

    return res
    .status(200)
    .json(new ApiResponse(200,payment,"Payment details fetched successfully !"))
});



export {
    initiatePayment,
    getPaymentDetails,
    confirmPayment,
}