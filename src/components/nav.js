import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <header>
    <div className="menu">
      <h1>BookStore Cms</h1>
      <Link to="/">Home</Link>
      <Link to="/categories">Categories</Link>
    </div>
  </header>
);

export default NavBar;
