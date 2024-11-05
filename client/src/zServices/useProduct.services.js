import axios from "axios";

const BACKEND_URL = "https://fakestoreapi.com"

const fetchAllProductsService = async(limit)=>{
    try {
        const response = await axios.get(`${BACKEND_URL}/products?limit=${limit}`)
        // if (response.status != 200) {
        //     throw new Error('Network response was not ok');
        // }
        const data = response.data;
        return data;
    } catch (error) {
        throw(error);
    }
}

const getAProductService = async(id)=>{
    try{
        const response = await axios.get(`${BACKEND_URL}/products/${id}`);
        // console.log(response)
        return response.data;
    }
    catch(error){
        throw(error);
    }
}

export {
    fetchAllProductsService,
    getAProductService,
}