import React, { Component } from 'react';

export class MountClassDemo extends Component {
  /*
    The Constructor method should not cause side effect such as
    executing AJAX calls or registering a setTimeout. Instead,
    such calls should be placed in the Component Did Mount method.
  */
  constructor(props) {
    super(props);

    console.log('Executing MountClassDemo Constructor');
  }

  /*
    The Component Did Mount method runs after the component's initial
    output to the DOM tree on the first render. This is a good method to
    wire up AJAX calls to download initial data for the component. Also,
    if the component needs to subcribe to data sources this is good
    place to make those subscriptions.
  */
  componentDidMount() {
    console.log('Executing MountClassDemo Component Did Mount');
  }

  /*
    The Component Will Unmount method will run just before the component
    is removed from the DOM and destroyed. This will is a good method to
    clean up timers, intervas, unsubscribe from subscriptions, cancel other
    network call results, etc...
  */
  componentWillUnmount() {
    console.log('Executing MountClassDemo Component Will Unmount');
  }

  render() {
    console.log('Executing MountClassDemo Render');

    return <div>
      <h4>MountClassDemo Component</h4>
    </div>;
  }
}
