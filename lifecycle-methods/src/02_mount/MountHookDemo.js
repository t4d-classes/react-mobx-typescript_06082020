import React, { useEffect } from 'react';

export const MountHookDemo = () => {
  /*
    Within a Functional Component side-effects such as AJAX calls
    should not be performed. To perform side-effects, the Effect Hook
    is used. The Effect Hook supports several configurations, for this
    demo the configurations which most closely relate to a Class-based
    components's Component Did Mount and Component Will Unmount methods
    will be explored.
  */

  /*
    In this configuration (see the comment next to the empty array below),
    the Function passed to useEffect will only execute on the first render.
    The Function runs after the changes to the DOM tree have been completed
    similar to Component Did Mount.
  */
  useEffect(
    () => {
      console.log('Executing MountHookDemo Effect (Component Did Mount)');

      /*
      Optionally, a Function may be returned from the Function passed into
      useEffect. This returned Function will be called when the component
      is removed from the DOM similar to the Component Will Unmount method
      from Class-based components.
    */
      return () => {
        console.log('Executing MountHookDemo Effect (Component Will Unmount)');
      };
    },
    [] /*
    Empty Array Configures the Function passed to useEffect
    to executed on the first render only.
  */,
  );

  console.log('Executing MountHookDemo Render');

  return <div>
    <h4>MountHookDemo Component</h4>
  </div>;
};
