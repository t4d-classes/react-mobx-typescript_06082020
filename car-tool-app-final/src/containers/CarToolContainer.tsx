import React, { FC, useEffect, useContext } from 'react';
import { useObserver } from 'mobx-react-lite';

import { CarTool } from '../components/CarTool';
import { CarToolStoreContext } from '../contexts';

export interface CarToolContainerProps { }

export const CarToolContainer: FC<CarToolContainerProps> = () => {

  const store = useContext(CarToolStoreContext);

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