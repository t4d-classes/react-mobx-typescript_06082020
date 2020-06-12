import React, { Component } from 'react';

export class UnoptimizedClassList extends Component {
  render() {
    console.log('Re-rendering Unoptimized Class List');

    return (
      <>
        <h5>Unoptimized Class List</h5>
        <ul>
          {this.props.items.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </>
    );
  }
}
