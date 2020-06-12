import React, { FC } from 'react';

import { Car } from '../models/Car';
import { nanToBlank } from '../utils';
import { useForm } from '../hooks/useForm';

interface CarEditRowProps {
  car: Car;
  onSaveCar: (car: Car) => void;
  onCancelCar: () => void;
}

export const CarEditRow: FC<CarEditRowProps> = ({
  car,
  onSaveCar,
  onCancelCar: cancelCar,
}) =>  {

  const [ carForm, change ] = useForm({
    make: car.make,
    model: car.model,
    year: car.year,
    color: car.color,
    price: car.price,
  });
 
  const saveCar = () => {
    onSaveCar({
      ...carForm,
      id: car.id,
    });
  }

  return <tr>
    <td>{car.id}</td>
    <td>
      <input type="text" value={carForm.make}
        name="make" onChange={change} />
    </td>
    <td>
      <input type="text" value={carForm.model}
        name="model" onChange={change} />
    </td>
    <td>
      <input type="number" value={nanToBlank(carForm.year)}
        name="year" onChange={change} />
    </td>
    <td>
      <input type="text" value={carForm.color}
        name="color" onChange={change} />
    </td>
    <td>
      <input type="number" value={nanToBlank(carForm.price)}
        name="price" onChange={change} />
    </td>
    <td>
      <button type="button" onClick={saveCar}>Save</button>
      <button type="button" onClick={cancelCar}>Cancel</button>
    </td>
  </tr>;

};
