import React from 'react';
import PropTypes from 'prop-types';

export const PageLayout = ({ pageTitle, children }) => {
  return (
    <>
      <h3>{pageTitle}</h3>
      {children}
    </>
  );
}

PageLayout.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
