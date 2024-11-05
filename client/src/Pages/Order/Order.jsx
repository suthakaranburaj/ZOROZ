import React,{useEffect} from 'react'

import useCartStore from '../../store/useCart.store';
import './Order.scss'
import Loader from '../../Components/Loader/Loader';
import userAuthStore from '../../store/useAuth.store';
import useOrderStore from '../../store/useOrder.store';
import { useNavigate } from 'react-router-dom';

function Order() {

    const { viewCart, userCart, isLoading } = useCartStore();
    const {user} = userAuthStore();
    const {placeOrder,isLoading:orderIsLoading,currentOrder} = useOrderStore();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await viewCart();
        };
        fetchData();
    }, [viewCart]);

    const handlePlaceOrder = async()=>{
        // await viewCart();
        // console.log(userCart)
        const response = await placeOrder({items:userCart?.items,totalAmount:userCart?.totalPrice});
        navigate(`/order/${response.data.data?._id}/payment`)
    }
    return (
        <>
        <div className='OrderContainer'>
            <div className='OrderContainer1'>   
                <p className='OrderContainer11'>{user?.name}</p>
                <p className='OrderContainer12'>{user?.phoneNumber}</p>
                <p className='OrderContainer13'>{user?.address}</p>
                <p className='OrderContainer14'>{user?.email}</p>
            </div>
            <div className='OrderContainer2'>
                <p className='OrderContainer21'>Total Items:{userCart?.items?.length}</p>
                <p className='OrderContainer22'>Total Amount:{userCart?.totalPrice}</p>
            </div>
            <div className='OrderContainer3'>
                <button 
                    className='OrderContainer31'
                    onClick={handlePlaceOrder}
                >
                    Process to payment
                </button>
            </div>
        </div>
        {isLoading && (
            <Loader />
        )}
        </>
    )
}

export default Order
