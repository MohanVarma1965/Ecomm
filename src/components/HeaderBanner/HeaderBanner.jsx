import React from "react";
import { Link } from "react-router-dom";
import "./HeaderBanner.css";
import { useSelector } from "react-redux";

const Header = () => {
  const { totalQuantity } = useSelector((state) => state.cart);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-logo">
          EcommStore
        </Link>
        <nav className="header-nav">
          <Link to="/" className="nav-link nav-item-hide">
            Home
          </Link>
          <Link to="/products" className="nav-link nav-item-hide">
            Products
          </Link>
          <Link to="/AboutUs" className="nav-link nav-item-hide">
            About Us
          </Link>
          <Link to="/Contact" className="nav-link nav-item-hide">
            Contact
          </Link>
        </nav>
        <div className="header-icons">
          <Link to="/cart" className="icon-link">
            <span className="nav-item-hide"> View Cart </span>🛒
            <span className="cart-count">{totalQuantity}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
