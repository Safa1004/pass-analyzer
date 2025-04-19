import React from 'react';
import './styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <img src="/assets/logo.png" alt="Logo" className="logo-img" />
        <div className="header-text">
          <h1 className="headline">How Secure Is Your Password?</h1>
          <p className="subheadline">Analyze your password strength in seconds.</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
