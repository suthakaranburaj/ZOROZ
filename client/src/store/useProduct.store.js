import { create } from "zustand";

import {fetchAllProductsService, getAProductService} from '../zServices/useProduct.services.js'

const useProductStore = create((set)=>({

    allProducts: [],
    isLoading: false,
    error: null,
    limit: 1,
    product:null,

    getProducts : async()=>{
        set((state) => {
            if (state.isLoading) return {}; // Prevent duplicate fetch calls
            return { isLoading: true, error: false };
        });

        try {
            const currentLimit = useProductStore.getState().limit;
            const data = await fetchAllProductsService(currentLimit);

            set((state) => ({
                allProducts: data,
                limit: state.limit + 1,
                isLoading: false
            }));
            return true;
        } catch (error) {
            set({
                error:error.response?.message.data || "Fetching of Products failed !",
                isLoading:false,
            })
            return false;
        }
    },

    getAProduct : async(id)=>{
        set({isLoading:true, error:null});

        try {
            const response = await getAProductService(id);
            set({
                isLoading:false,
                error:null,
                product:response,
            })
            console.log('Product set:', response);
            return response;
        } catch (error) {
            set({
                isLoading:false,
                error:error?.response?.message?.error,
            })
            return false;
        }
    }

}))

export default useProductStore;