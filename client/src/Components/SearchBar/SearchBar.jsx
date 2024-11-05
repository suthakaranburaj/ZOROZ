import React from 'react'

import './SearchBar.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch ,faCartShopping} from '@fortawesome/free-solid-svg-icons';

import devStore from '../../store/devStore';

function SearchBar() {

    const { isNavOpen, toggleNav } = devStore(); 
    
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
            <div className="cart-container">
                <FontAwesomeIcon 
                    icon={faCartShopping} 
                    className='cart-icon' 
                />
                <span className="cart-count">1</span>
            </div>
        </div>
    )
}

export default SearchBar
