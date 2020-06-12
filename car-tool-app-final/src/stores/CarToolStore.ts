import { observable, action, isObservableArray, computed, runInAction, flow } from 'mobx';

import { Car } from '../models/Car';
import { ICarsService } from '../services/ICarsService';

export class CarToolStore {

  constructor(private _carsSvc: ICarsService) { }

  // application state - is the data used to render the UI?

  // stored in the permanent store
  @observable
  private _cars = observable.array<Car>([]);

  // stored in the temoporal store
  @observable
  editCarId = -1;

  @computed
  get cars() {
    return this._cars.slice();
  }

  @action.bound
  async refreshCars() {

    const cars = await this._carsSvc.allCars()

    runInAction(() => {

      // if (!isObservableArray(this._cars)) {
      //   throw new Error('cars array should be observable');
      // }

      this._cars.replace(cars);
      this.editCarId = -1;
    });

  }

  @action.bound
  appendCar = flow(function* appendCarFlow(this: CarToolStore, car: Car) {
    yield this._carsSvc.appendCar(car);
    yield this.refreshCars(); 
    this.editCarId = -1;
  });

  @action.bound
  async replaceCar(car: Car) {
    await this._carsSvc.replaceCar(car);
    await this.refreshCars(); 

    runInAction(() => {
      this.editCarId = -1;
    });
  }

  @action.bound
  async removeCar(carId: number) {
    await this._carsSvc.removeCar(carId);
    await this.refreshCars(); 

    runInAction(() => {
      this.editCarId = -1;
    });
  }

  @action.bound
  editCar(carId: number) {
    this.editCarId = carId;
  }

  @action.bound
  cancelCar() {
    this.editCarId = -1;
  }
}