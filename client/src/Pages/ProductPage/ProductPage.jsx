import React from 'react'
import { useEffect } from 'react';
import {useParams} from 'react-router-dom'

import './Product.scss'

import useProductStore from '../../store/useProduct.store'

function ProductPage() {
const {getAProduct,product} = useProductStore();
const {id} = useParams();
useEffect(()=>{
    const fetchData = async()=>{
        await getAProduct(id);
    }
    fetchData();
},[])

    return (
        <div className='productionSectionContainer'>
            <div className='productionSectionContainer1'>
                <img src={product.image} alt="" />
            </div>
            <div className='productionSectionContainer2'>
                <p className='productionSectionContainer21'>{product.title}</p>
                <p className='productionSectionContainer22'>{product.description}</p>
                <p className='productionSectionContainer23'>Price:${product.price}</p>
                <div className='productionSectionContainer24'>
                    <button className='productionSectionContainer241'>
                        Add to Cart
                    </button>
                    <button className='productionSectionContainer242'>
                        WishList
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductPage
