import React from 'react';
import './Wishlist.scss';
import NotSignUp from '../Authentication/NotSignUp/NotSignUp';
import userAuthStore from '../../store/useAuth.store';

function Wishlist() {
    const { user, isAuthenticated } = userAuthStore();

    return (
        <>
            {user ? (
                <NotSignUp />
                
            ) : (
                <div className='wishlistContainer'>
                    {/* Wishlist content for authenticated users goes here */}
                    <p className='wishlistContainer1'>Your Wishlist</p>
                    {/* You can add more components or elements related to the wishlist */}
                </div>
            )}
        </>
    );
}

export default Wishlist;
