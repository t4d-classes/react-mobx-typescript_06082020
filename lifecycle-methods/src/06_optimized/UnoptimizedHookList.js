import React from 'react';

export const UnoptimizedHookList = ({ items }) => {
  console.log('Re-rendering Unoptimized Hook List');

  return (
    <>
      <h5>Unoptimized Hook List</h5>
      <ul>
        {items.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </>
  );
};
