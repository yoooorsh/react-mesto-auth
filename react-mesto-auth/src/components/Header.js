import React from 'react';
import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
        <img className="logo" src={logo} alt="Mesto" />
    </header>
  );
}

export default Header;