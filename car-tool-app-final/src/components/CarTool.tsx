import React, { FC } from 'react';

import { Car } from '../models/Car';

import { ToolHeader } from './ToolHeader';
import { CarTable } from './CarTable';
import { CarForm } from './CarForm';

export interface CarToolProps {
  cars: Car[];
  editCarId: number;
  onAddCar: (car: Car) => void;
  onSaveCar: (car: Car) => void;
  onDeleteCar: (carId: number) => void;
  onEditCar: (carId: number) => void;
  onCancelCar: () => void;
}

export const CarTool: FC<CarToolProps> = ({
  cars, editCarId,
  onAddCar: addCar,
  onSaveCar: saveCar,
  onDeleteCar: deleteCar,
  onEditCar: editCar,
  onCancelCar: cancelCar,
}) => {

  return (
    <>
      <ToolHeader headerText="Car Tool" />
      <CarTable cars={cars} editCarId={editCarId}
        onEditCar={editCar} onDeleteCar={deleteCar}
        onSaveCar={saveCar} onCancelCar={cancelCar} />
      <CarForm buttonText="Add Car" onSubmitCar={addCar} /> 
    </>
  );

};

CarTool.defaultProps = {
  cars: [],
  editCarId: -1,
};