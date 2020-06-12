import React, { useState } from 'react';

import { OptimizedHookList } from './OptimizedHookList';
import { UnoptimizedHookList } from './UnoptimizedHookList';

export const OptimizedHookDemo = () => {
  const [state, setState] = useState({
    colors: ['red', 'green', 'blue'],
    colorInput: '',
  });

  const change = ({ target: { value } }) => {
    setState({
      ...state,
      colorInput: value,
    });
  };

  const addColorMutable = () => {
    const colors = state.colors;
    colors.push(state.colorInput);
    setState({
      ...state,
      colors: colors,
      colorInput: '',
    });
  };

  const addColorImmutable = () => {
    setState({
      ...state,
      colors: state.colors.concat(state.colorInput),
      colorInput: '',
    });
  };

  return (
    <div>
      <h4>UpdateHookDemo Component</h4>
      <OptimizedHookList items={state.colors} />
      <UnoptimizedHookList items={state.colors} />
      <form>
        <div>
          <label htmlFor="color-input">Color:</label>
          <input
            type="text"
            id="color-input"
            value={state.colorInput}
            onChange={change}
          />
        </div>
        <button type="button" onClick={addColorMutable}>
          Add Color Mutable
        </button>
        <button type="button" onClick={addColorImmutable}>
          Add Color Immutable
        </button>
      </form>
    </div>
  );
};
