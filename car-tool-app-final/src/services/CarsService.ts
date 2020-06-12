import { Car } from '../models/Car';
import { ICarsService } from './ICarsService';

export class CarsService implements ICarsService {

  constructor(private baseUrl: string) {}

  private getCollectionUrl() {
    return this.baseUrl + '/cars';
  }

  private getElementUrl(carId: number) {
    return this.baseUrl + '/cars/' + encodeURIComponent(carId);
  }

  private getOptions(method = 'GET', body: object | null = null) {

    const options: RequestInit = {
      // method: method,
      method,
    };

    const headers: { [ x: string ]: string } = {};

    if (method === 'PUT' || method ==='POST') {
      headers['Content-Type'] = 'application/json';
    }

    if (Object.getOwnPropertyNames(headers).length > 0) {
      options.headers = headers;
    }

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    return options;
  }

  async allCars() {
    const res = await fetch(this.getCollectionUrl());
    return res.json();
  }

  async appendCar(car: Car) {
    const res = await fetch(this.getCollectionUrl(), this.getOptions('POST', car));
    return res.json();
  }

  async replaceCar(car: Car) {
    const res = await fetch(this.getElementUrl(car.id!), this.getOptions('PUT', car));
    return res.json();
  }

  async removeCar(carId: number) {
    const res = await fetch(this.getElementUrl(carId), this.getOptions('DELETE'));
    return res.json();
  }
}

