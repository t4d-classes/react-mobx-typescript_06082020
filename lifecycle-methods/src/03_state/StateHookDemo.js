import React, { useEffect, useState } from 'react';

export const StateHookDemo = () => {
  /*
    Functional Components do not store their own State. This
    is why a component instance is not needed. The State is stored
    within the React engine and is retrieved using a Hook.

    The argument passed to "useState" is the initial value of the
    state on the first render. The value is ignore on subsequent
    renders.

    The "useState" function returns an array with two elements, the
    first element is the state data, the second element is a
    function used to update the state and trigger a re-render.

    The names "state" and "setState" are used below for comparison
    purposes with the Class-based Component's approach to state.
    In real code, these are named something more appropriate. The
    State Hook allows the state to be named whatever makes sense
    for the data in the component. With Class-based Components the
    "state" property and "setState" function must always be named
    that.
  */
  const [
    state, // state data
    setState, // function to update the state data
  ] = useState({ counter: 0 } /* initial state value */);

  useEffect(() => {
    console.log('Executing StateHookDemo Effect (Component Did Mount)');

    return () => {
      console.log('Executing StateHookDemo Effect (Component Will Unmount)');
    };
  }, []);

  /*
    With Functional Component there are no classes, no prototype chain,
    and no "call-site" this which means no binding and no need to know
    esoteric JavaScript knowledge. A simple function is all that is needed.
  */
  const incrementCounter = () => {
    /*
      Unlike the "setState" of Class-based Components, the current state
      must be explicitly copied into the new state object.
    */
    setState({
      ...state,
      counter: state.counter + 1,
    });
  };

  console.log('Executing StateHookDemo Render');

  return (
    <div>
      <h4>StateHookDemo Component</h4>
      {/*
        Using the State variable, the data from the
        state can be rendered.
      */}
      <p>Counter: {state.counter}</p>
      {/* The function reference is passed to the onClick event handler. */}
      <button type="button" onClick={incrementCounter}>
        Increment Counter
      </button>
    </div>
  );
};
