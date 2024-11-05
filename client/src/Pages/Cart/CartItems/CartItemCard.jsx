import React, { useEffect, useState } from 'react';

import useProductStore from '../../../store/useProduct.store';
import './CartItemCard.scss';

function CartItemCard({ productId, price, quantity }) {
    const { getAProduct } = useProductStore();
    const [localProduct, setLocalProduct] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const productData = await getAProduct(productId);
            setLocalProduct(productData);
        };
        fetchData();
    }, [productId, getAProduct]);

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
                <button className='CartItemCard31'>
                    Add
                </button>
                <button className='CartItemCard32'>
                    Remove
                </button>
            </div>
        </div>
    );
}

export default CartItemCard;
