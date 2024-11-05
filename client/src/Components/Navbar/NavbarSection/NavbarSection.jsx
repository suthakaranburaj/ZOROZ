import React from 'react'

import './NavbarSection.scss'

function NavbarSection({title}) {
    return (
        <>
        <div className='NavbarSectionContainer'>
            <p className='titleSection'>{title}</p>
        </div>
        <div className='line'></div>
        </>
    )
}

export default NavbarSection
