import axios from "axios";

const getToken = () => {
    const accessToken = localStorage.getItem("accessToken");
    // console.log(accessToken)
    return accessToken; // Adjust based on how you store the token
};

const BACKEND_URL = "http://localhost:8000/api/v1/order";

const placeOrderServices = async({items , totalAmount})=>{
    try {
        const response = await axios.post(`${BACKEND_URL}/place`,{items , totalAmount},{
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

const getOrderDetailsServices = async(orderId)=>{
    try {
        const response = await axios.get(`${BACKEND_URL}/${orderId}`,{
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

const getOrderHistoryServices = async(userId)=>{
    try {
        const response = await axios.get(`${BACKEND_URL}/${userId}/history`,{
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

const updateOrderStatusServices = async(orderId)=>{
    try {
        const response = await axios.patch(`${BACKEND_URL}/${orderId}/status`,{
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
    placeOrderServices,
    getOrderDetailsServices,
    getOrderHistoryServices,
    updateOrderStatusServices,
}