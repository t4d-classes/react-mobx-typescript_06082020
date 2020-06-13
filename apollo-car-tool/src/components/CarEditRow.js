import React from 'react';
import PropTypes from 'prop-types';
import { pick } from 'lodash';

import { useForm } from '../hooks/useForm';

export const CarEditRow = ({ car, onSaveCar, onCancelCar: cancelCar }) => {

  const [ carForm, change ] = useForm(pick(car, ['make', 'model', 'year', 'color', 'price']));

  const saveCar = () => {
    onSaveCar({
      ...carForm,
      id: car.id,
    });
  };

  return <tr>
    <td>{car.id}</td>
    <td><input type="text" name="make"
      value={carForm.make} onChange={change} /></td>
    <td><input type="text" name="model"
      value={carForm.model} onChange={change} /></td>
    <td><input type="number" name="year"
      value={carForm.year} onChange={change} /></td>
    <td><input type="text" name="color"
      value={carForm.color} onChange={change} /></td>
    <td><input type="number" name="price"
      value={carForm.price} onChange={change} /></td>
    <td>
      <button type="button"
        onClick={saveCar}>Save</button>
      <button type="button"
        onClick={cancelCar}>Cancel</button>
    </td>
  </tr>;

};

CarEditRow.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.string.isRequired,
    make: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onSaveCar: PropTypes.func.isRequired,
  onCancelCar: PropTypes.func.isRequired,
};
