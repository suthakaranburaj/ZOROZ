import { create } from "zustand";

import {
    viewCartService,
    addItemToCartService,
    removeItemFromCartService,
    clearCartService,
} from '../zServices/useCart.services'

const useCartStore = create((set)=>({
    userCart:{},
    isLoading : false,
    error:null,
    userCartItems:[],

    viewCart : async()=>{
        set({isLoading:true, error:null});
        try {
            const response = await viewCartService();
            set({
                userCart:response.data.data,
                isLoading:false,
                error:null,
                userCartItems:response.data.data.items
            })
            return response.data.data;
        } catch (error) {
            set({
                error:error.response?.message.data || "Fetching of Products failed !",
                isLoading:false,
            })
            return false;
        }
    },

    addItemToCart: async({productId,price})=>{
        set({isLoading:false, error:null});

        try {
            const response = await addItemToCartService({productId,price});
            set({
                userCart:response.data.data,
                isLoading:false,
                error:null,
                userCartItems:response.data.data.items
            })
            return response;
        } catch (error) {
            set({
                error:error.response?.message.data || "Fetching of Products failed !",
                isLoading:false,
            })
            return false;
        }
    },

    clearCart : async() => {
        set({isLoading:true, error:null});

        try {
            const response = await clearCartService();
            set({
                isLoading:false,
                error:null,
                userCartItems:[],
                userCart:{}
            })

            return response;
        } catch (error) {
            set({
                error:error.response?.message.data || "Fetching of Products failed !",
                isLoading:false,
            })
            return false;
        }
    },

    removeItemFromCart: async(productId) =>{
        set({isLoading:false, error:null});

        try {
            const response = await removeItemFromCartService(productId)
            set({
                isLoading:false,
                error:null,
                userCartItems:response.data.data.items,
                userCart:response.data.data,
            })
            console.log(response.data)
            return response;
        } catch (error) {
            set({
                error:error.response?.message || "Fetching of Products failed !",
                isLoading:false,
            })
            return false;
        }
    }
}))

export default useCartStore;