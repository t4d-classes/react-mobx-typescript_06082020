import React, { FC, useState, ChangeEvent } from 'react';

import { Color } from '../models/Color';

export interface ColorFormProps {
  buttonText?: string;
  onSubmitColor: (color: Color) => void;
}

export const ColorForm: FC<ColorFormProps> =
  ({ buttonText, onSubmitColor }) => {

    const [ colorForm, setColorForm ] = useState({
      name: '',
      hexcode: '',
    });

    const change = (e: ChangeEvent<HTMLInputElement>) => {
      setColorForm({
        ...colorForm,
        [ e.target.name ]: e.target.value,
      });
    };    

    const submitColor = () => {

      onSubmitColor(colorForm);
      
      setColorForm({
        name: '',
        hexcode: '',
      });
    };

    return (
      <form>
        <div>
          <label htmlFor="color-name-input">Color Name: </label>
          <input type="text" id="color-name-input"
            name="name" value={colorForm.name} onChange={change} />
        </div>
        <div>
          <label htmlFor="color-hexcode-input">Color Hexcode: </label>
          <input type="text" id="color-hexcode-input"
            name="hexcode" value={colorForm.hexcode} onChange={change} />
        </div>
        <button type="button" onClick={submitColor}>{buttonText}</button>
      </form>
    )
  


};

ColorForm.defaultProps = {
  buttonText: 'Submit Color',
};
