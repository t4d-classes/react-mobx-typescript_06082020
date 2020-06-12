import { Car } from '../models/Car';

export interface ICarsService {
  allCars: () => Promise<Car[]>;
  appendCar: (car: Car) => Promise<Car>;
  replaceCar: (car: Car) => Promise<void>;
  removeCar: (carId: number) => Promise<void>;
}