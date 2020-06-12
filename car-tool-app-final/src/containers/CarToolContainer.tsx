import React, { FC, useEffect } from 'react';
import { useObserver } from 'mobx-react-lite';

import { CarToolStore } from '../stores/CarToolStore';
import { CarTool } from '../components/CarTool';

export interface CarToolContainerProps {
  store: CarToolStore;
}

export const CarToolContainer: FC<CarToolContainerProps> = ({ store }) => {

  useEffect(() => {
    store.refreshCars();
  }, [ store ]);

  return useObserver(() => {

    const carToolProps = {
      cars: store.cars,
      editCarId: store.editCarId,
      onAddCar: store.appendCar,
      onSaveCar: store.replaceCar,
      onDeleteCar: store.removeCar,
      onEditCar: store.editCar,
      onCancelCar: store.cancelCar,
    };
  
    return <CarTool {...carToolProps} />;

  });
}