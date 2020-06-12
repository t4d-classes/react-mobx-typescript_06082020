import React, { Component } from 'react';

export class RenderClassDemo extends Component {
  /*
    Class-based Components produce a Component Instance, the
    Constructor Method is used to initialize the Component
    Instance. The Constructor Method only executes when the
    Component is instantiated
  */
  constructor(props) {
    super(props);

    console.log('Executing RenderClassDemo Constructor');
  }

  /*
    The Render Method of Class-based Components run each
    time React re-renders the component tree. The Class-based
    Component Render Method is equivalent to the function
    of the Functional Component
  */
  render() {
    console.log('Executing RenderClassDemo Render');

    return <div>
      <h4>RenderClassDemo Component</h4>
    </div>;
  }
}
