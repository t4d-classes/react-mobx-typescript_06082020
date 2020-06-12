import React from 'react';

import { StateClassDemo } from './StateClassDemo';
import { StateHookDemo } from './StateHookDemo';

export const Demo = ({ componentToRunHelpers, children }) => {
  return (
    <>
      <h3>Managing State within a Component</h3>
      {children}

      {componentToRunHelpers.showClassComp() && <StateClassDemo />}
      {componentToRunHelpers.showHookComp() && <StateHookDemo />}
    </>
  );
};
