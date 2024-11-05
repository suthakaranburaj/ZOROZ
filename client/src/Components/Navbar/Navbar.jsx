import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.scss'
import './NavbarSection/NavbarSection'
import NavbarSection from './NavbarSection/NavbarSection'

function Navbar() {
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
            {/* <NavbarSection title="SignUp" /> */}
        </div>
    )
}

export default Navbar
