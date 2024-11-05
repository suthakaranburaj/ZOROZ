import { create } from "zustand";

import {
    initiatePaymentServices,
    confirmPaymentServices,
    getPaymentDetailsServices
} from '../zServices/usePayment.services'

const usePaymentStore = create((set)=>({

}));

export default usePaymentStore;