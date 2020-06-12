import { CarToolStore } from './CarToolStore';
import { CarsServiceMock } from '../services/CarsServiceMock';

describe('Car Tool Store', () => {

  let carToolStore: CarToolStore;

  beforeEach(() => {

    carToolStore = new CarToolStore(new CarsServiceMock());

  });

  test('refresh cars', async () => {

    await carToolStore.refreshCars();
    const cars = carToolStore.cars;
    expect(cars.length).toEqual(2);
    expect(carToolStore.editCarId).toEqual(-1);

  });

  test('append car', async () => {

    await carToolStore.refreshCars();
    const cars1 = carToolStore.cars;
    expect(cars1.length).toEqual(2);

    const newCar = {
      make: 'Nissan',
      model: 'Pathfinder',
      year: 2020,
      color: 'navy',
      price: 45000,
    };

    await carToolStore.appendCar(newCar);
    const cars2 = carToolStore.cars;
    expect(cars2.length).toEqual(3);
    expect(carToolStore.editCarId).toEqual(-1);

  });

  test('replace car', async () => {

    await carToolStore.refreshCars();
    const cars1 = carToolStore.cars;
    expect(cars1.length).toEqual(2);

    const replacementCar = {
      id: 2,
      make: 'Nissan',
      model: 'Pathfinder',
      year: 2020,
      color: 'navy',
      price: 45000,
    };

    await carToolStore.replaceCar(replacementCar);
    const cars2 = carToolStore.cars;
    expect(cars2.length).toEqual(2);
    expect(cars2[1].make).toEqual('Nissan');
    expect(carToolStore.editCarId).toEqual(-1);

  });

  test('remove car', async () => {

    await carToolStore.refreshCars();
    const cars1 = carToolStore.cars;
    expect(cars1.length).toEqual(2);

    await carToolStore.removeCar(2);
    const cars2 = carToolStore.cars;
    expect(cars2.length).toEqual(1);
    expect(carToolStore.editCarId).toEqual(-1);

  });

  test('edit car', () => {

    carToolStore.editCar(1);
    expect(carToolStore.editCarId).toEqual(1);

  });

  test('cancel car', () => {

    carToolStore.editCar(1);
    expect(carToolStore.editCarId).toEqual(1);

    carToolStore.cancelCar();
    expect(carToolStore.editCarId).toEqual(-1);

  });

});