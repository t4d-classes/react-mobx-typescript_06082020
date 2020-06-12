import React, { Component } from 'react';

/*

  When a Class-based Component updates, the lifecycle methods run in
  the following order:

  static getDerivedStateFromProps - covered in the 03_state demo
  shouldComponentUpdate - covered in the 06_optimized demo
  render - covered in 01_render demo
  getSnapshotBeforeUpdate
  componentDidUpdate

  This demonstration will focus on getSnapshotBeforeUpdate
  and componentDidUpdate

  A component will update under several circumstances:

  - The component state is updated with the setState method
  - A child component's parent component is re-rendered
  - A component's forceUpdate method is called (very rarely used)

*/

export class UpdateClassDemo extends Component {
  constructor(props) {
    super(props);

    console.log('Executing UpdateClassDemo constructor');

    this.state = {
      counter: 0,
    };

    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }

  componentDidMount() {
    console.log('Executing UpdateClassDemo componentDidMount');
  }

  componentWillUnmount() {
    console.log('Executing UpdateClassDemo componentWillUnmount');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('Executing UpdateClassDemo getDerivedStateFromProps');

    return state;
  }

  /*
    The getSnapshotBeforeUpdate Method is invoked right before
    changes are made to the DOM tree. The purpose of the
    method is to allow the component to capture any useful DOM
    information right before the DOM tree is updated.  Usually,
    the captured data is user session UI data which exists
    beyond the DOM tree itself. The classic example of this is
    scroll position. React focuses on the DOM tree itself not
    extra information such as the input element with the current
    focus or the scroll position of the window. Sometimes this
    information is needed after a re-render to ensure the user
    has a consistent UI experience between renders.

    Notes:

    setState cannot be called in this method

    A Class-based Component must implement the componentDidUpdate method
    if the getSnapshotBeforeUpdate Method is implemented

    This method is rarely used
  */
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('Executing UpdateClassDemo getSnapshotBeforeUpdate');

    /*
      The return value from this method is passed as an
      argument to the snapshot parameter of the
      componentDidUpdate lifecycle method.
    */

    return 42;
  }

  /*
    The componentDidUpdate Lifecycle Method is invoked immediately
    after the DOM tree is updated. If the component needs to perform
    some kind of DOM operation this is the method where it can be
    done.

    Similar to the componentDidMount Lifecycle Method, side-effects can
    be performed in this method. Generally, the side-effects are tied to
    some kind of change in props or state and should be limited to when
    such changes occur.

    Notes:

    - The componentDidUpdate method is not invoked on the initial render.
      The componentDidMount method should be used for the inital render.

    - setState can be conditionally called in this method, but it must
      be conditional otherwise the component will be endlessly re-rendered
      triggering an error in React.
  */
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('Executing UpdateClassDemo componentDidUpdate');
    console.log('snapshot value: ', snapshot);

    if (this.state.counter === 1) {
      this.incrementCounter();
    }
  }

  render() {
    console.log('Executing UpdateClassDemo render');

    return (
      <div>
        <h4>UpdateClassDemo Component</h4>
        <p>Counter: {this.state.counter}</p>
        <button type="button" onClick={this.incrementCounter}>
          Increment Counter
        </button>
      </div>
    );
  }
}
