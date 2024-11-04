import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Order} from '../models/order.model.js'

const placeOrder = asyncHandler(async(req,res)=>{

});

const getOrderDetails  = asyncHandler(async(req,res)=>{

});

const getOrderHistory  = asyncHandler(async(req,res)=>{

});

const updateOrderStatus  = asyncHandler(async(req,res)=>{

});

export {
    placeOrder,
    getOrderDetails,
    getOrderHistory,
    updateOrderStatus,
}