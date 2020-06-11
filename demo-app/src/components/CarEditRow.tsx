import React, { ChangeEvent } from 'react';

import { Car } from '../models/Car';
import { blankToNaN, nanToBlank } from '../utils';

interface CarEditRowProps {
  car: Car;
  onSaveCar: (car: Car) => void;
  onCancelCar: () => void;
}

interface CarEditRowState {
  make: string;
  model: string;
  year: number;
  color: string;
  price: number;
  [ x: string ]: any; // to allow the computed property
}

export class CarEditRow extends React.Component<CarEditRowProps, CarEditRowState> {

  state = {
    make: this.props.car.make,
    model: this.props.car.model,
    year: this.props.car.year,
    color: this.props.car.color,
    price: this.props.car.price,
  };

  // constructor(props: CarEditRowProps) {
  //   super(props);

  //   this.firstName = 'Bob';

  //   this.state = {
  //     make: props.car.make,
  //     model: props.car.model,
  //     year: props.car.year,
  //     color: props.car.color,
  //     price: props.car.price,
  //   };

  //   this.change = this.change.bind(this);
  //   this.saveCar = this.saveCar.bind(this);
  // }

  // change(e: ChangeEvent<HTMLInputElement>) {
  //   this.setState({
  //     [ e.target.name ]: e.target.type === 'number'
  //       ? blankToNaN(e.target.value) : e.target.value,
  //   });
  // };

  // saveCar() {
  //   this.props.onSaveCar({
  //     ...this.state,
  //     id: this.props.car.id,
  //   });
  // };

  change = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [ e.target.name ]: e.target.type === 'number'
        ? blankToNaN(e.target.value) : e.target.value,
    });
  };

  saveCar = () => {
    this.props.onSaveCar({
      ...this.state,
      id: this.props.car.id,
    });
  };

  render() {
    return (
      <tr>
        <td>{this.props.car.id}</td>
        <td>
          <input type="text" value={this.state.make}
            name="make" onChange={this.change} />
        </td>
        <td>
          <input type="text" value={this.state.model}
            name="model" onChange={this.change} />
        </td>
        <td>
          <input type="number" value={nanToBlank(this.state.year)}
            name="year" onChange={this.change} />
        </td>
        <td>
          <input type="text" value={this.state.color}
            name="color" onChange={this.change} />
        </td>
        <td>
          <input type="number" value={nanToBlank(this.state.price)}
            name="price" onChange={this.change} />
        </td>
        <td>
          <button type="button" onClick={this.saveCar}>Save</button>
          <button type="button" onClick={this.props.onCancelCar}>Cancel</button>
        </td>
      </tr>
    );
  }

}

