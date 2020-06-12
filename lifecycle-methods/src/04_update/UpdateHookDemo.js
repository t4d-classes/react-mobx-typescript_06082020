import React, { useEffect, useState, useLayoutEffect } from 'react';

/*

  -- Overview --

  Hook-based Functional Components are updated when the component
  function is invoked again. Because there is no instance, there
  are no lifecycle methods such as getSnapshotBeforeUpdate and
  componentDidUpdate.

  To respond to updates various techniques can be used. To perform
  selective updates based upon the passing of new prop values the
  React.memo function can be used to produce a memoized component.
  The memo approach is similar to the Class-based shouldComponentUpdate
  lifecycle method. This is covered in the 06_optimized demo.

  
  -- Comparison to Class-based Components --

  There is no exact equivalent to the Class-based Component
  getSnapshotBeforeUpdate Lifecycle Method in Hook-based Functional
  Components. The best hook to use to capture UI state before the repainting
  of the screen is the Layout Effect hook. The Layout Effect hook is similar
  to the Effect Hook (covered in 02_mount). The difference between the Effect
  hook and the Layout Effect hook will be covered in this demo.

  Also, there is no exact equivalent to the component


  -- Execution of Component Update related Tasks within JavaScript and React --

  Here is quick summary of execution order:

  ** Task 1: JavaScript **
    - Trigger a state change for a re-render
    - Call Class-based Render Method or Functional Component Function to
      generate a new Virtual DOM Tree
    - Reconcile Virtual DOM Tree and Real DOM Tree
    - Invoke Class-based getSnapshotBeforeUpdate Method
    - Apply/Commit Reconciled DOM Changes to the Real DOM Tree
    - Unconditionally invoke callback function registered Hook-based
      Layout Effect Hook 
    - Invoke Class-based componentDidUpdate Method (snapshot data is passed in)

  ** Task 2: Browser UI **
    - Browser paints the screen

  ** Task 3: JavaScript **
    - Conditionally invoke (based upon dependencies) callback function
      registered with Effect Hook Callback


  -- Execution of Component Update related Tasks within JavaScript and React --

  When a Layout Effect performs a state change, the execution of the Effect hook
  changes slightly.

  ** Task 1: JavaScript **
    - Trigger a state change for a re-render
    - Call Class-based Render Method or Functional Component Function to
      generate a new Virtual DOM Tree
    - Reconcile Virtual DOM Tree and Real DOM Tree
    - Invoke Class-based getSnapshotBeforeUpdate Method
    - Apply/Commit Reconciled DOM Changes to the Real DOM Tree
    - Unconditionally invoke callback function registered Hook-based
      Layout Effect Hook and make state change in the hook
    - Conditionally invoke (based upon dependencies) callback function
      registered with Effect Hook Callback
    - Call Class-based Render Method or Functional Component Function to
      generate a new Virtual DOM Tree
    - Reconcile Virtual DOM Tree and Real DOM Tree
    - Invoke Class-based getSnapshotBeforeUpdate Method
    - Apply/Commit Reconciled DOM Changes to the Real DOM Tree
    - Unconditionally invoke callback function registered Hook-based
      Layout Effect Hook
    - Invoke Class-based componentDidUpdate Method (snapshot data is passed in)

  ** Task 2: Browser UI **
    - Browser paints the screen

  ** Task 3: JavaScript **
    - Conditionally invoke (based upon dependencies) callback function
      registered with Effect Hook Callback


  -- When to choose Class-based over Hooks --

  Generally, Hook-based Functional Components are always perferred. They
  are easier and simpler to write, require less esoteric JavaScript and
  enable the creation and use of reusable state-based logic.

  However, there are times when hooks cannot do what Class-based component
  lifecycle methods can do.

  For example, if a component needs a snapshot of the DOM right before
  applying/committing changes to the DOM tree, then the getSnapshotBeforeUpdate
  must be used.

*/

export const UpdateHookDemo = () => {
  const [state, setState] = useState({ counter: 0 });

  useEffect(() => {
    console.log('Executing UpdateHookDemo Effect (componentDidMount)');

    return () => {
      console.log('Executing UpdateHookDemo Effect (componentWillUnmount)');
    };
  }, []);

  /*
    Generally, the Effect Hook callback runs after the paint task. This
    is not the case, when the state is changed in the Layout Effect Hook,
    then the Effect Hook will execute in the same task (synchronously) as
    Layout Effect Hook, followed by another call to the Functional Component
    and Layout Effect Hook.
  */
  useEffect(function effectHook() {
    console.log(
      'Executing Second UpdateHookDemo Effect, counter: ',
      state.counter,
    );

    // if (state.counter === 1) {
    //   incrementCounter();
    // }
  });

  useLayoutEffect(function layoutEffectHook() {
    console.log(
      'Executing UpdateHookDemo Layout Effect (Before Paint), counter: ',
      state.counter,
    );

    // enable to see updating the state in the layout effect hook
    if (state.counter === 1) {
      incrementCounter();
    }
  });

  const incrementCounter = () => {
    setState({
      ...state,
      counter: state.counter + 1,
    });

    // setState(function setCounterState(prevState) {
    //   return {
    //     ...prevState,
    //     counter: prevState.counter + 1,
    //   };
    // });
  };

  console.log('Executing UpdateHookDemo Render');

  return (
    <div>
      <h4>UpdateHookDemo Component</h4>
      <p id="counter-output">Counter: {state.counter}</p>
      <button type="button" onClick={incrementCounter}>
        Increment Counter
      </button>
    </div>
  );
};
