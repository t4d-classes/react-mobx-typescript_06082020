import React from 'react';
import ReactDOM from 'react-dom';

import { ColorTool } from './components/ColorTool';
import { CarTool } from './components/CarTool';

ReactDOM.render(
  // React.createElement(HelloWorld),
  <>
    <ColorTool />
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


