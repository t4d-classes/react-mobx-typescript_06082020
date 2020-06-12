import React, { memo } from 'react';

export const OptimizedHookList = memo(({ items }) => {
  console.log('Re-rendering Optimized Hook List');

  return (
    <>
      <h5>Optimized Hook List</h5>
      <ul>
        {items.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </>
  );
});
