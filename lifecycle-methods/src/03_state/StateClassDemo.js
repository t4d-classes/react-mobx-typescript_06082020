import React, { Component } from 'react';

export class StateClassDemo extends Component {
  /*
    With Class-based Components, the component's instance and state data
    are tightly coupled together. The component's Constructor Method is where
    the component's State is initialized. For the component, State is data
    which is controlled/managed by the component and it changes over time.

    Data which is not controlled/managed by the component or does not
    change over time is not considered to be the State of the component.

    Functional Components and Hook-based State are not tightly coupled
    to each other. State is managed within React itself and no component
    instance is created and persisted between renders.
  */
  constructor(props) {
    super(props);

    console.log('Executing StateClassDemo Constructor');

    /*
      The "state" property on the component instance is a special property
      understood by React. The state of a Class-based Component is always
      stored on the component instance's "state" property.

      Data on the "state" property can be set one-time the Constructor
      Method, but all future changes to the "state" property are
      performed exclusively through the "setState" function shown below.
    */
    this.state = {
      counter: 0,
    };

    /*
      JavaScript uses a form of inheritance named Prototype Inheritance.
      The purpose of Prototype Inheritance is share functions with many
      objects. JavaScript classes are used to setup prototype inheritance
      with a super class sharing its functions with a subclass. The sharing
      is accomplished via heap-based prototype chain. Because JavaScript
      inheritance is a chain of objects on the heap, the inheritance is 
      between live objects and not specifications.

      To know which object is invoking the function, JavaScript uses
      something called call-site this. Meaning the value of this within
      a function is determined by "how" the function is invoked, not
      where the function is defined. Normally, this works without issue.
      
      But for functions which are passed as callbacks, the context
      of the original object is lost when the function is invoked. To
      preserve this content (aka the value of "this"), a contextually
      bound version of the function is created and assigned to the
      instance.

      When using Functional Components with Hook-based State, none
      of this esoteric JavaScript knowledge and work arounds are
      needed.
    */
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  /*
    The "incrementCounter" will be passed as an event handler
    to the button below. The function is defined on the prototype.
    Using bind above, a new contextually bound version of this
    function will be added to each component instance.
  */
  incrementCounter() {
    /*
      The "setState" function is used to update the State of the
      component. The "setState" function will copy the properties
      of the object passed to "setState" and the properties of the
      current state onto a new state object.

      In addition to updating the state, the "setState" function
      will trigger a re-render of the component and its child
      components.
    */
    this.setState({
      counter: this.state.counter + 1,
    });
  }

  componentDidMount() {
    console.log('Executing StateClassDemo Component Did Mount');
  }

  componentWillUnmount() {
    console.log('Executing StateClassDemo Component Will Unmount');
  }

  /*
    This method is rarely used. It runs on each render (first
    and subsequent renders), and because it is static, there is
    no access to the component instance.

    It runs before the Render Method, allowing the component to update
    the state one last time using the latest props before rendering
    occurs.

    This method replaced the older and now deprecated
    "componentWillReceiveProps" lifecycle method. The
    "componentWillReceiveProps" method did not run on the
    first render, only subsequent renders.
  */
  static getDerivedStateFromProps(props, state) {
    // the props and state can be used to run logic and
    // the return value from the function will update the state

    console.log('Executing StateClassDemo GetDerivedStateFromProps');

    // The original state object can be returned
    return state;

    // If null is returned the original state object is used
    // return null;

    // The contents of this object is merge with the current state object
    // return {
    //   test: 2,
    // };
  }

  render() {
    console.log('Executing StateClassDemo Render');

    console.log('StateClassDemo State => ', this.state);

    return (
      <div>
        <h4>StateClassDemo Component</h4>
        {/*
          The state is accessed via the "state" property on the
          component instance.
        */}
        <p>Counter: {this.state.counter}</p>
        {/*
          The "this.incrementCounter" function is the contextually-
          bound version of the incrementCounter function.
        */}
        <button type="button" onClick={this.incrementCounter}>
          Increment Counter
        </button>
      </div>
    );
  }
}
