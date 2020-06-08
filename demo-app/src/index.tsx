import React from 'react';
import ReactDOM from 'react-dom';

import { Color } from './models/Color';
import { ColorTool } from './components/ColorTool';
import { CarTool } from './components/CarTool';

const colorList: Color[] = [
  { id: 1, name: 'orange', hexcode: '12ef34' },
  { id: 2, name: 'blue', hexcode: 'abe124' },
  { id: 3, name: 'green', hexcode: '56ac12' },
];

ReactDOM.render(
  // React.createElement(HelloWorld),
  <>
    <ColorTool colors={colorList} />
    <CarTool />
  </>,
  // HelloWorld(),
  document.querySelector('#bob'),    
);









// function declaration
// function HelloWorld2() {

// }

// function expression
// const HelloWorld3 = function() {

// };


