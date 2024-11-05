import { create } from "zustand";

import {
    placeOrderServices,
    getOrderDetailsServices,
    getOrderHistoryServices,
    updateOrderStatusServices,
} from '../zServices/useOrder.services'

const useOrderStore = create((set)=>({

    userOrders:[],
    currentOrder:[],
    isLoading:false,
    error:null,

    placeOrder : async({items , totalAmount})=>{
        set({isLoading:true,error:null});
        try {
            const response = await placeOrderServices({items , totalAmount});
            set({
                isLoading:false,
                error:null,
                currentOrder:response.data.data,
            })
            // console.log(response.data.data)
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

export default useOrderStore;