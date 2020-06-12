import React, { Component } from 'react';

import { ErrorThrowingComponent } from './ErrorThrowingComponent';

export class ErrorClassDemo extends Component {
  constructor(props) {
    super(props);

    console.log('Executing ErrorClassDemo Constructor');

    this.state = {
      hasError: false,
      error: null,
    };
  }

  /*
    The getDerivedStateFromError Lifecycle Method is used to generate
    the state data needed to implement the logic to choose to show
    the fallback error UI. This method must be implemented
    to properly construct an Error Boundary.
  */
  static getDerivedStateFromError(error) {
    console.log('Executing ErrorClassDemo getDerivedStateFromError');

    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  /*
    The componentDidCatch Lifecycle Method is used to record
    the error which occurred. The componentDidCatch is not
    a factor in the rendering of the fallback error UI. In fact,
    this method will run after the re-rendering of the component
    to display the fallback UI

    If a componentDidCatch method is defined but the 
    getDerivedStateFromError method is not defined then an error
    will appear in the console stating that the getDerivedStateFromError
    should be defined.

    Here is the execution order:

    ** Task 1: JavaScript **
    - Error Boundary Component: Render
    - Error Thrown in Child Component
    - Error Boundary Component: getDerivedStateFromError
    - Error Boundary Component: Render to display Fallback UI
    - Error Boundary Component: componentDidCatch

    ** Task 2: Browser UI **
    - Paint
  */
  componentDidCatch(error, errorInfo) {
    console.log('Executing ErrorClassDemo componentDidCatch');

    // You can also log the error to an error reporting service
    console.log('error: ', error);
    console.log('errorInfo: ', errorInfo);
  }

  render() {
    console.log('Executing ErrorClassDemo Render');

    return (
      <div>
        <h4>Error Boundary Class Component</h4>
        {/*
          When implementing fallback UI logic, be sure to not re-render
          the child component tree from which the error is coming
        */}
        {this.state.hasError ? (
          <div> An error occurred: {this.state.error.message}</div>
        ) : (
          <ErrorThrowingComponent />
        )}
      </div>
    );
  }
}
