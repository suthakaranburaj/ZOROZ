import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'
import NavbarSection from './NavbarSection/NavbarSection'
import userAuthStore from '../../store/useAuth.store'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate();
    const { isAuthenticated, logout, user } = userAuthStore();

    const handleNavigation = (path) => {
        if (isAuthenticated) {
            navigate(path);
        } else {
            navigate('/signup');
        }
    };

    const submitHandler = () => {
        if (isAuthenticated) {
            logout();
        } else {
            navigate('/signup');
        }
    };

    return (
        <div className='NavbarContainer'>
            <div onClick={() => handleNavigation('/')}>
                <NavbarSection title="Home" />
            </div>
            <div onClick={() => handleNavigation('/wishlist')}>
                <NavbarSection title="WishList" />
            </div>
            <div onClick={() => handleNavigation(`/${user?._id}/cart`)}>
                <NavbarSection title="View Cart" />
            </div>
            <div onClick={() => handleNavigation('/order-history')}>
                <NavbarSection title="Order History" />
            </div>
            <div onClick={submitHandler}>
                <NavbarSection 
                    className="logoutButton cursor-pointer" 
                    title={isAuthenticated ? "Logout" : "SignUp"} 
                />
            </div>
        </div>
    );
}

export default Navbar;
