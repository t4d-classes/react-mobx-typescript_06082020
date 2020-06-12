import { CarsService } from './CarsService';
import { ICarsService } from './ICarsService';
import { Car } from '../models/Car';

describe('Cars Service', () => {

  const baseRestUrl = 'http://fakedomain';
  const carsRestUrl = baseRestUrl + '/cars';
  let carsService: ICarsService;

  beforeEach(() => {

    fetchMock.resetMocks();

    carsService = new CarsService(baseRestUrl);
  });

  test('refresh cars', async () => {

    const carsData: Car[] = [
      { id: 1, make: 'Ford', model: 'Fusion Hybrid', year: 2020, color: 'red', price: 45000 },
      { id: 2, make: 'Tesla', model: 'S', year: 2019, color: 'blue', price: 100000 },
      { id: 3, make: 'Nissan', model: 'Pathfinder', year: 2016, color: 'red', price: 40000 },
      { id: 4, make: 'Chevrolet', model: 'Volt', year: 2017, color: 'black', price: 50000 },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(carsData));

    const cars = await carsService.allCars();
    expect(cars.length).toEqual(4);

    expect(fetch).toBeCalledWith(carsRestUrl);

  });

  test('append car', async () => {

    const carToAppend: Car = {
      make: 'Toyota',
      model: 'Sienna',
      year: 2004,
      color: 'light blue',
      price: 15000,
    };

    const appendedCar: Car = { id: 5, ...carToAppend };

    fetchMock.mockResponseOnce(
      JSON.stringify(appendedCar),
    );

    const car = await carsService.appendCar(carToAppend);
    expect(car).toEqual(appendedCar);

    const appendCarRequestInit: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carToAppend),
    };

    expect(fetch).toBeCalledWith(carsRestUrl, appendCarRequestInit);

  });

  test('replace car', async () => {

    const carToReplace: Car = {
      id: 3,
      make: 'Toyota',
      model: 'Sienna',
      year: 2004,
      color: 'light blue',
      price: 15000,
    };

    const carToReplaceUrl = `${carsRestUrl}/${encodeURIComponent(carToReplace.id!)}`;

    const carToReplaceBody = JSON.stringify(carToReplace);

    fetchMock.mockResponseOnce(
      carToReplaceBody,
    );

    const car = await carsService.replaceCar(carToReplace);
    expect(car).toEqual(carToReplace);

    const replaceCarRequestInit: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: carToReplaceBody,
    };

    expect(fetch).toBeCalledWith(carToReplaceUrl, replaceCarRequestInit);

  });

  test('remove car', async () => {

    const carIdToRemove = 3;

    const carToRemoveUrl = `${carsRestUrl}/${encodeURIComponent(carIdToRemove)}`;

    fetchMock.mockResponseOnce(
      '{}',
    );

    const res = await carsService.removeCar(carIdToRemove);
    expect(res).toEqual({});

    const removeCarRequestInit: RequestInit = {
      method: 'DELETE',
    };

    expect(fetch).toBeCalledWith(carToRemoveUrl, removeCarRequestInit);

  });

});