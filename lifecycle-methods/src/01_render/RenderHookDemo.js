import React from 'react';

export const RenderHookDemo = () => {
  /*
    There is no Constructor Method for Functional Components
    because Functional Components do not produce a Component
    Instance
  */

  console.log('Executing RenderHookDemo Render');

  return <div>
    <h4>RenderHookDemo Component</h4>
  </div>;
};
