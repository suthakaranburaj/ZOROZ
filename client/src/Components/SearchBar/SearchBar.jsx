import React, { useEffect } from 'react'

import './SearchBar.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch ,faCartShopping} from '@fortawesome/free-solid-svg-icons';

import devStore from '../../store/devStore';
import userAuthStore from '../../store/useAuth.store';
import { Link } from 'react-router-dom';
import useCartStore from '../../store/useCart.store';

function SearchBar() {

    const { isNavOpen, toggleNav } = devStore(); 
    const {isAuthenticated , user,isLoading,error} = userAuthStore();
    const { viewCart, userCartItems } = useCartStore(); // Retrieve userCart from the store

    useEffect(() => {
        viewCart(); // Load cart data on component mount
    }, [viewCart]);

    
    return (
        <div className='containerSearchBar'>
            <FontAwesomeIcon
                className='icon'
                icon={isNavOpen ? faTimes : faBars}
                onClick={() => toggleNav()}
            />
            <div className='searchBarContainer'>
                <input
                    type="text"
                    placeholder="Search"
                    className="search-input"
                />
                <button className='search-button'>
                    <FontAwesomeIcon 
                        icon={faSearch} 
                        className='search-icon' 
                    />
                </button>
            </div>
            <Link to={isAuthenticated ? `/${user._id}/cart` : `/signup`}>
                <div className="cart-container">
                    <FontAwesomeIcon 
                        icon={faCartShopping} 
                        className='cart-icon' 
                    />
                    <span className="cart-count">{userCartItems?.length || 0}</span>
                </div>
            </Link>
        </div>
    )
}

export default SearchBar
