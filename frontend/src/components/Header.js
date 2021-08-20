import React from 'react';
import vector from '../images/logo.svg'
function Header(props) {
    return (
        <header className="header">
            <img src={vector} alt={'Место'} className="header__logo"></img>

            <nav className="header__nav">
                {props.children}
            </nav>
           
        </header >
    );
}

export default Header;