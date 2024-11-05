import { create } from "zustand";

import {
    placeOrderServices,
    getOrderDetailsServices,
    getOrderHistoryServices,
    updateOrderStatusServices,
} from '../zServices/useOrder.services'

const useOrderStore = create((set)=>({

}));

export default useOrderStore;