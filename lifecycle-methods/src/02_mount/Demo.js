import React from 'react';

import { MountClassDemo } from './MountClassDemo';
import { MountHookDemo } from './MountHookDemo';

export const Demo = ({ componentToRunHelpers, children }) => (
  <>
    <h3>Mounting and Unmounting a Component</h3>
    {children}

    {componentToRunHelpers.showClassComp() && <MountClassDemo />}
    {componentToRunHelpers.showHookComp() && <MountHookDemo />}
  </>
);
