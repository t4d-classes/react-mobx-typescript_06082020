import React, { FC, useState } from 'react';

import { Color } from '../models/Color';
import { ToolHeader } from './ToolHeader';
import { ColorForm } from './ColorForm';

interface ColorToolProps {
  colors: Color[];
}

export const ColorTool: FC<ColorToolProps> = ({ colors: initialColors }) => {

  const [ colors, setColors ] = useState(initialColors.concat());

  const addColor = (color: Color) => {

    setColors(colors.concat({
      ...color,
      id: Math.max(...(colors.map(c => c.id) as []), 0) + 1,
    }));
  };

  return (
    <>
      <ToolHeader headerText="Color Tool" />
      <ul>
        {colors.map(c => {
          return <li key={c.id}>{c.name.toUpperCase()}</li>;
        })}
      </ul>
      <ColorForm buttonText="Add Color" onSubmitColor={addColor} />
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
