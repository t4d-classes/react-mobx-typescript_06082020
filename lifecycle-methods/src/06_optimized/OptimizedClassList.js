import React, { PureComponent } from 'react';

export class OptimizedClassList extends PureComponent {
  render() {
    console.log('Re-rendering Optimized Class List');

    return (
      <>
        <h5>Optimized Class List</h5>
        <ul>
          {this.props.items.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </>
    );
  }
}
