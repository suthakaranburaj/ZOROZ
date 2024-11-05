import React from 'react'
import './MainpageLayout.scss'

import SearchBar from '../../Components/SearchBar/SearchBar'
import Navbar from '../../Components/Navbar/Navbar'

import devStore from '../../store/devStore';
import { Outlet } from 'react-router-dom';

function MainpageLayout() {

    const { isNavOpen, toggleNav } = devStore(); 

    return (
        <>
        <div className='MainLayoutContainer'>
            <div className='searchBar'>
                <SearchBar/>
            </div>
            <div className='layoutContainer'>
                { isNavOpen && 
                    <div className='leftSide'>
                        <Navbar/>
                    </div>
                }
                <div className='rightSide'>
                    <Outlet/>
                </div>
            </div>
        </div>
        </>
    )
}

export default MainpageLayout
