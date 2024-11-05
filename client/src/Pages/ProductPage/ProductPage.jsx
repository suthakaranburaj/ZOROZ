import React from 'react'
import { useEffect, useRef, useCallback } from 'react';
import {Link, useParams} from 'react-router-dom'

import './Product.scss'

import useProductStore from '../../store/useProduct.store'
import ProductSection from '../HomePage/ProductSection/ProductSection'
import Loader from '../../Components/Loader/Loader';

function ProductPage() {

    const { allProducts, getProducts, isLoading } = useProductStore();

    const loader = useRef(null);

    const {getAProduct,product} = useProductStore();
    const {id} = useParams();
    useEffect(()=>{
        const fetchData = async()=>{
            await getAProduct(id);
        }
        fetchData();
    },[id])

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);
    
    const handleIntersection = useCallback((entries) => {
        if (entries[0].isIntersecting && !isLoading) {
            // console.log("Loader is visible, fetching more products...");
            getProducts();
        }
    }, [isLoading, getProducts]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, [handleIntersection]);

    return (
        <>
        <div className='productionSectionContainer'>
            <div className='productionSectionContainer1'>
                <img className='productionSectionContainer11' src={product?.image} alt="" />
            </div>
            <div className='productionSectionContainer2'>
                <p className='productionSectionContainer21'>{product?.title}</p>
                <p className='productionSectionContainer22'>{product?.description}</p>
                <p className='productionSectionContainer23'>Price:${product?.price}</p>
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
        <p className='viewMore'>View more</p>
        <div className='Products'>
            {allProducts.map((product) => (
                id != product.id &&(
                    <Link key={product.id} to={`/product/${product.id}`}>
                        <ProductSection 
                            id={product.id} 
                            image={product.image} 
                            title={product.title} 
                            price={product.price}
                        />
                    </Link>
                )
            ))}
        </div>
        <div ref={loader} className='loadingIndicator'>
                <p>Scroll down for more products</p>
        </div>
        {isLoading && (
                    // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    //     <ClipLoader size={50} color="#ffffff" />
                    //     <p>Registering your account...</p>
                    // </div>
                    <Loader/>
        )}
        </>
    )
}

export default ProductPage
