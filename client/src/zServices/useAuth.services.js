import axios from "axios";

const BACKEND_URL = 'http://localhost:8000/api/v1/users';

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
        
        console.log('Server response:', response);
        return response;
    } catch (error) {
        console.error('Error in registerUser function:', error);
        console.error('Error details:', error.response?.data || error.message);
        throw error;
    }
};

// const getUserWishlist = async() =>{

// }

export {
    loginUser,
    registerUser,
};
