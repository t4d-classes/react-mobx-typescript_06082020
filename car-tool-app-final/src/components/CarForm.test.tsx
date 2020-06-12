import * as React from 'react';
import {
  render, mount, shallow,
  ReactWrapper, ShallowWrapper,
} from 'enzyme';

import { Car } from '../models/Car';
import { CarForm } from './CarForm';

describe('<CarForm /> Enzyme Static HTML', () => {
  test('<CarForm /> renders', () => {
    const component = JSON.stringify(
      render(<CarForm onSubmitCar={() => null} buttonText="Add Car" />).html(),
    );

    expect(component).toMatchSnapshot();
  });
});

describe('<CarForm /> Enzyme Mock DOM', () => {
  const eventHandlers = {
    submitCar: () => null,
  };

  let submitCarSpy: jest.SpyInstance;
  let component: ReactWrapper;

  beforeEach(() => {
    submitCarSpy = jest.spyOn(eventHandlers, 'submitCar');

    component = mount(
      <CarForm buttonText="Add Car" onSubmitCar={eventHandlers.submitCar} />,
    );
  });

  test('<CarForm /> renders', () => {
    expect(component.find('button').text()).toBe('Add Car');
  });

  test('<CarForm /> form and submit car button', () => {
    const car: Car = {
      make: 'Ford',
      model: 'F-150',
      year: 1980,
      color: 'red',
      price: 42000,
    };

    Object.keys(car).forEach((propName) => {
      component.find(`#${propName}-input`).simulate('change', {
        target: { value: car[propName], name: propName },
      });
    });

    component.find('button').simulate('click');

    expect(submitCarSpy).toHaveBeenCalledWith(car);
  });
});

describe('<CarForm /> Shallow with Enzyme', () => {
  const eventHandlers = {
    submitCar: () => null,
  };

  let submitCarSpy: jest.SpyInstance;
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    submitCarSpy = jest.spyOn(eventHandlers, 'submitCar');

    wrapper = shallow(
      <CarForm buttonText="Add Car" onSubmitCar={eventHandlers.submitCar} />,
    );
  });

  test('<CarForm /> renders', () => {
    expect(wrapper.find('button').text()).toBe('Add Car');
  });

  test('<CarForm /> form and submit widget button', () => {
    const car: Car = {
      make: 'Ford',
      model: 'F-150',
      year: 1980,
      color: 'red',
      price: 42000,
    };

    Object.keys(car).forEach((propName) => {
      wrapper.find(`#${propName}-input`).simulate('change', {
        target: { value: car[propName], name: propName },
      });
    });

    wrapper.find('button').simulate('click');

    expect(submitCarSpy).toHaveBeenCalledWith(car);
  });
});
