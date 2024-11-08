import React, { useEffect, useState } from 'react';

import useProductStore from '../../../store/useProduct.store';
import './CartItemCard.scss';
import useCartStore from '../../../store/useCart.store';

function CartItemCard({ productId, price, quantity }) {
    const { getAProduct } = useProductStore();
    const [localProduct, setLocalProduct] = useState(null);
    const {addItemToCart,removeItemFromCart} = useCartStore();

    useEffect(() => {
        const fetchData = async () => {
            const productData = await getAProduct(productId);
            setLocalProduct(productData);
        };
        fetchData();
    }, [productId, getAProduct]);

    const handleAddItem = async({productId, price}) =>{
        await addItemToCart({productId,price});
    }

    const handleDeleteItem = async(productId) =>{
        await removeItemFromCart(productId);
    }

    return (
        <div className='CartItemCard'>
            <div className='CartItemCard1'>
                <img src={localProduct?.image} />
            </div>
            <div className='CartItemCard2'>
                <p className='CartItemCard21'>{localProduct?.title}</p>
                <p className='CartItemCard22'>Quantity:<span>{quantity}</span></p>
                <p className='CartItemCard23'>Price:$<span>{price}</span></p>
            </div>
            <div className='CartItemCard3'>
                <button onClick={()=>handleAddItem({productId,price})} className='CartItemCard31'>
                    Add
                </button>
                <button onClick={()=>handleDeleteItem(productId)} className='CartItemCard32'>
                    Remove
                </button>
            </div>
        </div>
    );
}

export default CartItemCard;
