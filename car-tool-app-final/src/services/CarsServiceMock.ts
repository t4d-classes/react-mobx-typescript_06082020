import { ICarsService } from '../services/ICarsService';
import { Car } from '../models/Car';

export class CarsServiceMock implements ICarsService {

  private _cars: Car[] = [
    { id: 1, make: 'Ford', model: 'Fusion Hybrid', year: 2020, color: 'red', price: 45000 },
    { id: 2, make: 'Tesla', model: 'S', year: 2019, color: 'blue', price: 100000 },
  ];

  allCars() {
    return Promise.resolve(this._cars.concat());  
  }

  appendCar(car: Car) {

    const newCar = {
      ...car,
      id: Math.max(...this._cars.map(c => c.id) as [], 0) + 1,
    };

    this._cars = this._cars.concat(newCar);
    return Promise.resolve(newCar);  
  }

  replaceCar(car: Car) {
    const carIndex = this._cars.findIndex(c => c.id === car.id);
    const newCars = this._cars.concat();
    newCars[carIndex] = car;
    this._cars = newCars;
    return Promise.resolve();
  }

  removeCar(carId: number) {
    this._cars = this._cars.filter(c => c.id !== carId);
    return Promise.resolve();
  }

}

