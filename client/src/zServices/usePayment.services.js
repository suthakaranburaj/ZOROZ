import axios from "axios";

const getToken = () => {
    const accessToken = localStorage.getItem("accessToken");
    // console.log(accessToken)
    return accessToken; // Adjust based on how you store the token
};

const BACKEND_URL = "http://localhost:8000/api/v1/payment";

const initiatePaymentServices = async({orderId, amount, paymentMethod})=>{
    try {
        const response = await axios.post(`${BACKEND_URL}/initiate`,{orderId, amount, paymentMethod},{
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        return response;
    } catch (error) {
        throw(error)
    }
}

const confirmPaymentServices = async(paymentId) =>{
    try {
        const response = await axios.post(`${BACKEND_URL}/confirm/${paymentId}`,{
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        return response;
    } catch (error) {
        throw(error)
    }
}

const getPaymentDetailsServices = async(paymentId)=>{
    try {
        const response = await axios.get(`${BACKEND_URL}/${paymentId}`,{
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        return response;
    } catch (error) {
        throw(error)
    }
}

export {
    initiatePaymentServices,
    confirmPaymentServices,
    getPaymentDetailsServices
}