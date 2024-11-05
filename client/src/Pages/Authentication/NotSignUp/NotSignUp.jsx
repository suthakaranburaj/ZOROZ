import React from 'react'

import { Link } from 'react-router-dom'

import './NotSignUp.scss'
function NotSignUp() {
    return (
        <div className='notSignUpContainer'>
            <Link to='/signup'>
                <button className='notSignUpContainer1'>SignUp</button>
            </Link>
        </div>
    )
}

export default NotSignUp
