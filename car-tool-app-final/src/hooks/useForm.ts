import { useState, ChangeEvent } from 'react';

import { blankToNaN } from '../utils';

type HTMLFormControls = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

type UseForm = <T>(initialForm: T) =>
  ([ T, (e: ChangeEvent<HTMLFormControls>) => void, () => void ]);


export const useForm: UseForm = (initialForm) => {

  const [ form, setForm ] = useState(initialForm);

  const change = (e: ChangeEvent<HTMLFormControls>) => {

    setForm({
      ...form,
      [ e.target.name ]: e.target.type === 'number'
        ? blankToNaN(e.target.value) : e.target.value,
    });
  };

  return [ form, change, () => setForm(initialForm) ];
};