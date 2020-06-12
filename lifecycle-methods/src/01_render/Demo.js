import React from 'react';

import { RenderClassDemo } from './RenderClassDemo';
import { RenderHookDemo } from './RenderHookDemo';

export const Demo = ({ componentToRunHelpers, children }) => (
  <>
    <h3>Rendering a Component</h3>
    {children}

    {componentToRunHelpers.showClassComp() && <RenderClassDemo />}
    {componentToRunHelpers.showHookComp() && <RenderHookDemo />}
  </>
);
