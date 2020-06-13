import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';

const APPEND_CAR_MUTATION = gql`
  mutation AppendCar($car: AppendCar) {
    appendCar(car: $car) {
      id
      make
      model
      year
      color
      price
    }
  }
`;

const DELETE_CAR_MUTATION = gql`
  mutation DeleteCar($carId: ID) {
    deleteCar(carId: $carId) {
      id
      make
      model
      year
      color
      price
    }
  }
`;

const REPLACE_CAR_MUTATION = gql`
  mutation ReplaceCar($car: ReplaceCar) {
    replaceCar(car: $car) {
      id
      make
      model
      year
      color
      price
    }
  }
`;

export const useCars = (refetchQueries) => {

  const [ mutateAppendCar ] = useMutation(APPEND_CAR_MUTATION);
  const [ mutateDeleteCar ] = useMutation(DELETE_CAR_MUTATION);
  const [ mutateReplaceCar ] = useMutation(REPLACE_CAR_MUTATION);

  const appendCar = car => {

    mutateAppendCar({
      variables: {
        car: {
          ...car,
        }
      },
      refetchQueries,
      update(store) {
        store.writeData({
          data: {
            editCarId: '-1',
          },
        });
      },
    });

  };

  const replaceCar = car => {

    mutateReplaceCar({
      variables: {
        car,
      },
      update(store, { data: { replaceCar: oldCar }}) {

        car.__typename = oldCar.__typename;

        refetchQueries.forEach((refetchQuery) => {
          const data = store.readQuery(refetchQuery);

          const carIndex = data.cars.findIndex(c => c.id === car.id);
          const newCars = data.cars.concat();
          newCars[carIndex] = car;

          const newData = {
            ...data,
            cars: newCars,
            editCarId: '-1',
          };
          store.writeQuery({ ...refetchQuery, data: newData });
        });

      }
    })

  }

  const deleteCar = carId => {

    mutateDeleteCar({
      variables: {
        carId,
      },
      update(store, { data: { deleteCar: car }}) {

        refetchQueries.forEach((refetchQuery) => {
          const data = store.readQuery(refetchQuery);
          const newData = {
            ...data,
            cars: data.cars.filter(c => c.id !== car.id),
            editCarId: '-1',
          };
          store.writeQuery({ ...refetchQuery, data: newData });
        });

      }
    })

  }

  return [ appendCar, deleteCar, replaceCar ];

};

const SETEDITCARID_MUTATION = gql`
  mutation SetEditCarId($carId: ID) {
    setEditCarId(carId: $carId) @client
  }
`;

export const useCarTable = () => {

  const [ mutateSetEditCarId ] = useMutation(SETEDITCARID_MUTATION);

  return [ carId => {
    return mutateSetEditCarId({  variables: { carId } });
  } ];

}