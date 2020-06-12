import React, { FC } from 'react';

import './Layout.css';

export const Layout: FC<{}> = ({ children }) => {

  return (
    <div className="layout">
      {children}
    </div>
  );


};