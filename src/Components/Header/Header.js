import React from 'react';
import './Header.css';
import logoImage from './../../Assets/logo.png';

const Header = () => {
  return (
    <header className="header">
      <img src={logoImage} alt="Logo" className="logo" />
    </header>
  );
};

export default Header;