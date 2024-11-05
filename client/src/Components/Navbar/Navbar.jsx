import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.scss'
import './NavbarSection/NavbarSection'
import NavbarSection from './NavbarSection/NavbarSection'
import userAuthStore from '../../store/useAuth.store'
import { useNavigate } from 'react-router-dom'

function Navbar() {

    const navigate = useNavigate();
    const {isAuthenticated, isLoading, logout} = userAuthStore();

    const submitHandler = () => {
        if (isAuthenticated) {
            logout();
        } else {
            navigate('/signup');
        }
    };

    return (
        <div className='NavbarContainer'>
            <Link>
                <NavbarSection title="Home" />
            </Link>
            <Link to="/wishlist">
                <NavbarSection title="WishList" />
            </Link>
            <NavbarSection title="View Cart" />
            <NavbarSection title="Order History" />
            <NavbarSection title="Payment History" />
            <NavbarSection 
                className="logoutButton cursor-pointer" 
                onClick={submitHandler} 
                title={isAuthenticated ? "Logout" : "SignUp"} 
            />
        </div>
    )
}

export default Navbar
