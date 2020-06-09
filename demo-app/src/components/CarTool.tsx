import React, { FC, useState, ChangeEvent } from 'react';

import { Car } from '../models/Car';

export interface CarToolProps {
  cars: Car[];
}

const nanToBlank = (x: number) => {

  if (isNaN(x)) {
    return '';
  } else {
    return x;
  }

};

const blankToNaN = (x: string) => {

  if (x.length === 0) {
    return NaN;
  } else {
    return Number(x);
  }

}

export const CarTool: FC<CarToolProps> = ({ cars: initialCars }) => {

  const [ carForm, setCarForm ] = useState({
    make: '',
    model: '',
    year: NaN,
    color: '',
    price: NaN,
  });

  const [ cars, setCars ] = useState(initialCars.concat());

  const change = (e: ChangeEvent<HTMLInputElement>) => {

    setCarForm({
      ...carForm,
      [ e.target.name ]: e.target.type === 'number'
        ? blankToNaN(e.target.value) : e.target.value,
    });
  };

  const addCar = () => {

    setCars(cars.concat({
      ...carForm,
      id: Math.max(...(cars.map(c => c.id) as []), 0) + 1,
    }));

    setCarForm({
      make: '',
      model: '',
      year: NaN,
      color: '',
      price: NaN,
    });

  };

  console.log(cars);

  return (
    <>
      <header>
        <h1>Car Tool</h1>
      </header>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Color</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => <tr key={car.id}>
            <td>{car.id}</td>
            <td>{car.make}</td>
            <td>{car.model}</td>
            <td>{car.year}</td>
            <td>{car.color}</td>
            <td>{car.price}</td>
          </tr>)}
        </tbody>
      </table>
      <div>
        <label htmlFor="make-input">Make:</label>
        <input type="text" id="make-input" name="make"
          value={carForm.make} onChange={change} />
      </div>
      <div>
        <label htmlFor="model-input">Model:</label>
        <input type="text" id="model-input" name="model"
          value={carForm.model} onChange={change} />
      </div>
      <div>
        <label htmlFor="year-input">Year:</label>
        <input type="number" id="year-input" name="year"
          value={nanToBlank(carForm.year)} onChange={change} />
      </div>
      <div>
        <label htmlFor="color-input">Color:</label>
        <input type="text" id="color-input" name="color"
          value={carForm.color} onChange={change} />
      </div>
      <div>
        <label htmlFor="price-input">Price:</label>
        <input type="number" id="price-input" name="price"
          value={nanToBlank(carForm.price)} onChange={change} />
      </div>
      <button type="button" onClick={addCar}>Add Car</button>
    </>
  );

};

CarTool.defaultProps = {
  cars: [],
};