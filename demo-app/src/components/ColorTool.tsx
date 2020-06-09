import React, { FC, useState, ChangeEvent } from 'react';

import { Color } from '../models/Color';

interface ColorToolProps {
  colors: Color[];
  newProp?: string;
}

export const ColorTool: FC<ColorToolProps> = (props) => {

  const [
    colorForm, /* first item, state data */
    setColorForm, /* second item, update + re-render function */
  ] = useState({
    name: '',
    hexcode: '',
  } /* initial value of the state on the first render */);

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setColorForm({
      // object spread operator
      ...colorForm,
      [ e.target.name ]: e.target.value,
    });
  };

  console.log(colorForm);

  return (
    <>
      <header>
        <h1>Color Tool</h1>
      </header>
      <ul>
        {props.colors.map(c => {
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
