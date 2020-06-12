import { useState } from 'react';

export const useTriggerRender = () => {
  const [ state, setState ] = useState(true);
  return () => setState(!state);
};
