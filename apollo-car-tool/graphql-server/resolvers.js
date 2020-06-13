import fetch from 'node-fetch';

export const resolvers = {
  Query: {
    message: () => 'Hello World!',
    cars: (_1, _2, { restURL }) => {
      return fetch(`${restURL}/cars`).then(res => res.json());
    },
  },
  Mutation: {
    appendCar: (_, { car }, { restURL }) => {
      return fetch(`${restURL}/cars`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car),
      }).then(res => res.json());
    },
    deleteCar: async (_, { carId }, { restURL }) => {
      const car = await fetch(`${restURL}/cars/${encodeURIComponent(carId)}`)
        .then(res => res.json());
      await fetch(`${restURL}/cars/${encodeURIComponent(carId)}`, {
        method: 'DELETE',
      });
      return car;
    },
    replaceCar: async (_, { car }, { restURL }) => {
      
      const oldCar = await fetch(`${restURL}/cars/${encodeURIComponent(car.id)}`)
        .then(res => res.json());

      await fetch(`${restURL}/cars/${encodeURIComponent(car.id)}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car),
      });
        
      return oldCar;
    }
  }
};
