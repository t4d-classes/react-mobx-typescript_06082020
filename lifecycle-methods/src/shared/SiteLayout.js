import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './SiteLayout.css';

import { appConfig } from '../../package.json';

const { appTitle, appSubtitle } = appConfig;

export const SiteLayout = ({ children }) => {
  return (
    <>
      <header>
        <h1><Link to="/">{appTitle}</Link></h1>
        <h2>{appSubtitle}</h2>
      </header>
      
      <div id="content">
        {children}
      </div>
    </>
  );
}

SiteLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
