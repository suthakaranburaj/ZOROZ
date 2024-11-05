import React from 'react'

import './ProductSection.scss'
import { Link } from 'react-router-dom'

function ProductSection({id, title, price, image}) {
    return (
        <Link key={id} to={`/product/${id}`}>
            <div  className='productSectionContainer'>
                <div className='productSectionContainer1'>
                    <img className='productSectionContainer11' src={image} alt="" />
                </div>
                <div className='productSectionContainer2'>
                    <p className='productSectionContainer21'>{title}</p>
                    <p className='productSectionContainer22'>${price} </p>
                </div>
            </div>
        </Link>
    )
}

export default ProductSection
