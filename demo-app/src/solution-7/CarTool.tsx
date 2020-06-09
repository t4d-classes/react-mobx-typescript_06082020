import React, { FC, useState } from 'react';

import { Car } from '../models/Car';

import { ToolHeader } from './ToolHeader';
import { CarTable } from './CarTable';

export interface CarToolProps {
  cars: Car[];
}

export const CarTool: FC<CarToolProps> = ({ cars: initialCars }) => {

  const [ cars, setCars ] = useState(initialCars.concat());

  return (
    <>
      <ToolHeader headerText="Car Tool" />
      <CarTable cars={cars} />
    </>
  );

};

CarTool.defaultProps = {
  cars: [],
};