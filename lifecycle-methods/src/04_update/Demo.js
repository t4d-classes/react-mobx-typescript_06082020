import React from 'react';

import { UpdateClassDemo } from './UpdateClassDemo';
import { UpdateHookDemo } from './UpdateHookDemo';

export const Demo = ({ componentToRunHelpers, children }) => {
  return (
    <>
      <h3>Component Updates</h3>
      {children}

      {componentToRunHelpers.showClassComp() && <UpdateClassDemo />}
      {componentToRunHelpers.showHookComp() && <UpdateHookDemo />}
    </>
  );
};
