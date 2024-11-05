import axios from "axios";

const getToken = () => {
    const accessToken = localStorage.getItem("accessToken");
    // console.log(accessToken)
    return accessToken; // Adjust based on how you store the token
};

const BACKEND_URL = "http://localhost:8000/api/v1/cart";

const viewCartService = async()=>{
    try {
        const response = await axios.get(`${BACKEND_URL}/view`,{
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

const addItemToCartService = async({productId,price})=>{
    try {
        const response = await axios.post(`${BACKEND_URL}/add`,{productId,price},{
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        return response;
    } catch (error) {
        throw (error);
    }
}

const removeItemFromCartService = async(productId)=>{
    try {
        const response = await axios.delete(`${BACKEND_URL}/remove`,{productId},{
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        return response;
    } catch (error) {
        throw (error);
    }
}

const clearCartService = async()=>{
    try {
        const response = await axios.delete(`${BACKEND_URL}/clear`,{
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        return response;
    } catch (error) {
        throw (error);
    }
}

export {
    viewCartService,
    addItemToCartService,
    removeItemFromCartService,
    clearCartService,
}