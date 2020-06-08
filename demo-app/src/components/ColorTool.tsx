import React, { FC } from 'react';

import { Color } from '../models/Color';

interface ColorToolProps {
  colors: Color[];
}

export const ColorTool: FC<ColorToolProps> = (props) => {

  return (
    <>
      <header>
        <h1>Color Tool</h1>
      </header>
      <ul>
        {props.colors.map(c =>
          <li key={c.id}>{c.name}</li>)}
      </ul>
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
