import React from 'react';

import { ErrorClassDemo } from './ErrorClassDemo';

export const Demo = ({ children }) => {
  return (
    <>
      <h3>Handling Component Errors</h3>
      {children}

      <ErrorClassDemo />
    </>
  );
};
