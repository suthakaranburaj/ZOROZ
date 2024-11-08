import React, { useEffect } from 'react';
import './Cart.scss';
import CartItemCard from './CartItems/CartItemCard';
import useCartStore from '../../store/useCart.store';
import Loader from '../../Components/Loader/Loader';

import { Link } from 'react-router-dom';

function Cart() {
    const { viewCart, userCart, isLoading } = useCartStore();

    useEffect(() => {
        const fetchData = async () => {
            await viewCart();
        };
        fetchData();
    }, [viewCart]);

    return (
        <>  <p className='yourCart'>Your Cart</p>
            <div className='cartContainer'>
                {userCart?.items && userCart?.items?.length > 0 ? (
                    userCart?.items?.map((item) => (
                        <CartItemCard 
                            key={item?.productId} // Use a unique key for each item
                            productId={item?.productId}
                            title={item?.title}
                            price={item?.price}
                            quantity={item?.quantity}
                        />
                    ))
                ) : (
                    <p>Your cart is empty.</p>
                )}
                <div className='cartContainer2'>
                    <p className='cartContainer21'>Total Amount:<span>{userCart?.totalPrice}</span></p>
                    <Link to='/order'>
                        <button className='cartContainer22'>
                            Order
                        </button>
                    </Link>
                </div>
                <Link to='/order-history'><p className='view-history-header'>View Order History</p></Link>
            </div>
            {isLoading && (
                <Loader />
            )}
        </>
    );
}

export default Cart;
