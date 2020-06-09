import React, { FC } from 'react';

import { Car } from '../models/Car';

export interface CarToolProps {
  cars: Car[];
}

export const CarTool: FC<CarToolProps> = ({ cars }) => {

  // object destructuring
  // const cars = props.cars;
  // const { cars } = props;

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
    </>
  );

};

CarTool.defaultProps = {
  cars: [],
};