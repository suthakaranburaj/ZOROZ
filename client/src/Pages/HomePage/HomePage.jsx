import React, { useEffect, useRef, useCallback } from 'react';

import useProductStore from '../../store/useProduct.store';

import './HomePage.scss';
import ProductSection from './ProductSection/ProductSection'

function HomePage() {
    const { allProducts, getProducts, isLoading } = useProductStore();
    const loader = useRef(null);

    // Initial load of products
    useEffect(() => {
        getProducts();
    }, []);

    const handleIntersection = useCallback((entries) => {
        if (entries[0].isIntersecting && !isLoading) {
            console.log("Loader is visible, fetching more products...");
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
        <div className='homePageContainer'>
            <div className='Products'>
            {allProducts.map((product) => (
                <ProductSection 
                    key={product.id}
                    id={product.id} 
                    image={product.image} 
                    title={product.title} 
                    price={product.price}
                />
            ))}
            </div>
            <div ref={loader} className='loadingIndicator'>
                <p>Scroll down for more products</p>
            </div>
        </div>
    );
}

export default HomePage;
