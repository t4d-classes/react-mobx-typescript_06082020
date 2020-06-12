import React from 'react';
import { Link } from 'react-router-dom';

import './pageParts.css';

export const PageHeader = () => {

  return <header className="header">
    <h1>A Cool Company, Inc.</h1>
  </header>;

};

export const PageFooter = () => {

  return <footer className="footer">
    <small>&copy; {new Date().getFullYear() } A Cool Company, Inc.</small>
  </footer>;

};

export const Sidebar = () => {

  return <aside className="sidebar">
    Sidebar
  </aside>;

};

export const Menu = () => {

  return <nav className="menu">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about/34">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>
  </nav>;

}