import React, { FC, useState, ChangeEvent } from 'react';

import { Color } from '../models/Color';
import { ToolHeader } from './ToolHeader';

interface ColorToolProps {
  colors: Color[];
}

export const ColorTool: FC<ColorToolProps> = ({ colors: initialColors }) => {

  const [
    colorForm, /* first item, state data */
    setColorForm, /* second item, update + re-render function */
  ] = useState({
    name: '',
    hexcode: '',
  } /* initial value of the state on the first render */);

  const [ colors, setColors ] = useState(initialColors.concat());

  const change = (e: ChangeEvent<HTMLInputElement>) => {

    // console.log(colorForm['hexcode']);
    // console.log(colorForm.hexcode);

    setColorForm({
      // object spread operator
      ...colorForm,
      [ e.target.name ]: e.target.value,
    });
  };

  const addColor = () => {

    setColors(colors.concat({
      ...colorForm,
      id: Math.max(...(colors.map(c => c.id) as []), 0) + 1,
    }));

    setColorForm({
      name: '', hexcode: '',
    });

  };

  return (
    <>
      <ToolHeader headerText="Color Tool" />
      <ul>
        {colors.map(c => {
          return <li key={c.id}>{c.name.toUpperCase()}</li>;
        })}
      </ul>
      <form>
        <div>
          {/* React.createElement('label', { htmlFor: 'color-name-input' }, 'Color Name:')   */}
          <label htmlFor="color-name-input">Color Name: </label>
          <input type="text" id="color-name-input" name="name" value={colorForm.name} onChange={change} />
        </div>
        <div>
          {/* React.createElement('label', { htmlFor: 'color-name-input' }, 'Color Name:')   */}
          <label htmlFor="color-hexcode-input">Color Hexcode: </label>
          <input type="text" id="color-hexcode-input" name="hexcode" value={colorForm.hexcode} onChange={change} />
        </div>
        <button type="button" onClick={addColor}>Add Color</button>
      </form>
    </>
  );

};

// const ucColors = [];

// // imperative
// for (let x=0; x<colors.length; x++) {
//   // console.log(colors[x]);
//   ucColors.push(colors[x].toUpperCase());
// }

// console.log(ucColors);

// // declarative
// // colors.forEach(color => {
// //   console.log(color);
// // });

// const ucColors2 = colors.map(color => color.toUpperCase());

// console.log(ucColors2);
