import { create } from "zustand";

import {
    initiatePaymentServices,
    confirmPaymentServices,
    getPaymentDetailsServices
} from '../zServices/usePayment.services'

const usePaymentStore = create((set)=>({
    isLoading:false,
    error:null,
    userPaymentHistory:[],
    currentPayment:[],

    initiatePayment: async({orderId, amount, paymentMethod})=>{
        set({isLoading:true,error:null});
        try {
            const response = await initiatePaymentServices({orderId, amount, paymentMethod});
            set({
                isLoading:false,
                error:null,
                currentPayment:response.data.data,
            })
            console.log(response.data.data)
            return response;
        } catch (error) {
            set({
                error:error.response?.message.data || "Fetching of Products failed !",
                isLoading:false,
            })
            return false;
        }
    },

    confirmPayment : async({paymentId,transactionId,paymentStatus})=>{
        set({isLoading:true,error:null});
        try {
            const response = await confirmPaymentServices({paymentId,transactionId,paymentStatus});
            set({
                isLoading:false,
                error:null,
            })
            console.log(response.data)
            return response;
        } catch (error) {
            set({
                error:error.response?.message.data || "Fetching of Products failed !",
                isLoading:false,
            })
            return false;
        }
    }
}));

export default usePaymentStore;