import React from 'react';
import './NavbarSection.scss';

function NavbarSection({ title, className = '', onClick }) {
    return (
        <>
            <div className={`NavbarSectionContainer ${className}`} onClick={onClick}>
                <p className='titleSection'>{title}</p>
            </div>
            <div className='line'></div>
        </>
    );
}

export default NavbarSection;
