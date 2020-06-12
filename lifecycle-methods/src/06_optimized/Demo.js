import React from 'react';

import { OptimizedClassDemo } from './OptimizedClassDemo';
import { OptimizedHookDemo } from './OptimizedHookDemo';

export const Demo = ({ componentToRunHelpers, children }) => {
  return (
    <>
      <h3>Optimized Component Updates</h3>
      {children}

      {componentToRunHelpers.showClassComp() && <OptimizedClassDemo />}
      {componentToRunHelpers.showHookComp() && <OptimizedHookDemo />}
    </>
  );
};
