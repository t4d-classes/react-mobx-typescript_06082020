import React, { Component } from 'react';

import { OptimizedClassList } from './OptimizedClassList';
import { UnoptimizedClassList } from './UnoptimizedClassList';

export class OptimizedClassDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: ['red', 'green', 'blue'],
      colorInput: '',
    };

    this.change = this.change.bind(this);
    this.addColorMutable = this.addColorMutable.bind(this);
    this.addColorImmutable = this.addColorImmutable.bind(this);
  }

  change({ target: { value } }) {
    this.setState({
      colorInput: value,
    });
  }

  addColorMutable() {
    const colors = this.state.colors;
    colors.push(this.state.colorInput);
    this.setState({
      colors: colors,
      colorInput: '',
    });
  }

  addColorImmutable() {
    this.setState({
      colors: this.state.colors.concat(this.state.colorInput),
      colorInput: '',
    });
  }

  render() {
    return (
      <div>
        <h4>Optimization Class Demo Component</h4>
        <OptimizedClassList items={this.state.colors} />
        <UnoptimizedClassList items={this.state.colors} />
        <form>
          <div>
            <label htmlFor="color-input">Color:</label>
            <input
              type="text"
              id="color-input"
              value={this.state.colorInput}
              onChange={this.change}
            />
          </div>
          <button type="button" onClick={this.addColorMutable}>
            Add Color Mutable
          </button>
          <button type="button" onClick={this.addColorImmutable}>
            Add Color Immutable
          </button>
        </form>
      </div>
    );
  }
}
