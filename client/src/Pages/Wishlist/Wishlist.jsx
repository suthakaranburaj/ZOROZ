import React, { useEffect, useState } from 'react';
import './Wishlist.scss';
import NotSignUp from '../Authentication/NotSignUp/NotSignUp';
import userAuthStore from '../../store/useAuth.store';
import { Link } from 'react-router-dom';
import ProductSection from '../HomePage/ProductSection/ProductSection';
import useProductStore from '../../store/useProduct.store';
import Loader from '../../Components/Loader/Loader';

function Wishlist() {
    const { user, isAuthenticated } = userAuthStore();
    const { getAProduct, isLoading, error } = useProductStore();
    
    const [wishlistProducts, setWishlistProducts] = useState([]);

    useEffect(() => {
        const fetchWishlistProducts = async () => {
            if (user?.wishlist?.length) {
                const products = await Promise.all(
                    user.wishlist.map(async (id) => {
                        const product = await getAProduct(id);
                        return product;
                    })
                );
                setWishlistProducts(products.filter(Boolean));
            }
        };
        fetchWishlistProducts();
    }, [user?.wishlist, getAProduct]);

    return (
        <>
            {isAuthenticated ? (
                <div className='wishlistContainer'>
                    <p className='userWishlist'>Your WishList</p>
                    {isLoading ? (
                        <Loader />
                    ) : error ? (
                        <p>{error}</p>
                    ) : wishlistProducts.length ? (
                        wishlistProducts.map((product) => (
                            <Link key={product.id} to={`/product/${product.id}`}>
                                <ProductSection 
                                    id={product.id} 
                                    image={product.image} 
                                    title={product.title} 
                                    price={product.price}
                                />
                            </Link>
                        ))
                    ) : (
                        <p>Your wishlist is empty.</p>
                    )}
                </div>
            ) : (
                <NotSignUp />
            )}
        </>
    );
}

export default Wishlist;
