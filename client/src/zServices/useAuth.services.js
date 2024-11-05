import axios from "axios";

const BACKEND_URL = 'http://localhost:8000/api/v1/users';
const getToken = () => {
    const accessToken = localStorage.getItem("accessToken");
    // console.log(accessToken)
    return accessToken; // Adjust based on how you store the token
};

const loginUser = async ({ userCredential, password }) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/login`, { userCredential, password });
        return response;
    } catch (error) {
        throw error;
    }
};

const registerUser = async ({ email, name, password, address, phoneNumber }) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/register`, {
            email,
            name,
            password,
            address,
            phoneNumber
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        
        // console.log('Server response:', response);
        return response;
    } catch (error) {
        console.error('Error in registerUser function:', error);
        console.error('Error details:', error.response?.data || error.message);
        throw error;
    }
};

const addUserWishlistService = async(productId) =>{
    try {
        const response = await axios.post(`${BACKEND_URL}/product-to-user-wishlist`,{productId},{
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.error('Error in registerUser function:', error);
        console.error('Error details:', error.response?.data || error.message);
        throw error;
    }
}

export {
    loginUser,
    registerUser,
    addUserWishlistService,
};
