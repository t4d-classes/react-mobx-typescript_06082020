import React, { FC } from 'react';

import { Car } from '../models/Car';

import { CarViewRow } from './CarViewRow';
import { CarEditRow } from './CarEditRow';

export interface CarTableProps {
  cars: Car[];
  editCarId: number;
  onEditCar: (carId: number) => void;
  onDeleteCar?: (carId: number) => void;
  onSaveCar: (car: Car) => void;
  onCancelCar: () => void;
}

export const CarTable: FC<CarTableProps> = ({
  cars, editCarId,
  onEditCar: editCar,
  onDeleteCar: deleteCar,
  onSaveCar: saveCar,
  onCancelCar: cancelCar,
}) => {

  function switchCarRow(car: Car) {
    if (editCarId === car.id) {
      return <CarEditRow key={car.id} car={car} onSaveCar={saveCar} onCancelCar={cancelCar} />;
    } else {
      return <CarViewRow key={car.id} car={car} onEditCar={editCar} onDeleteCar={deleteCar} />;
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Make</th>
          <th>Model</th>
          <th>Year</th>
          <th>Color</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {cars.map(switchCarRow)}
      </tbody>
    </table>
  );

};