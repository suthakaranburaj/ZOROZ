import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import {Payment} from '../models/payment.model.js'

const initiatePayment = asyncHandler(async(req,res)=>{

});

const confirmPayment  = asyncHandler(async(req,res)=>{

});

const getPaymentDetails  = asyncHandler(async(req,res)=>{

});



export {
    initiatePayment,
    getPaymentDetails,
    confirmPayment,
}