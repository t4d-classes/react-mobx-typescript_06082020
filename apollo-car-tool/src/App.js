import * as React from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import { ToolHeader } from './components/ToolHeader';
import { CarTable } from './components/CarTable';
import { CarForm } from './components/CarForm';

import { useCars, useCarTable } from './hooks/useCars';

const APP_QUERY = gql`
  query AppQuery {
    headerText @client
    editCarId @client
    cars {
      id
      make
      model
      year
      color
      price
    }
  }
`;

export const App = () => {
  const { loading, data, error } = useQuery(APP_QUERY);

  const [ appendCar, deleteCar, replaceCar ] = useCars([
    { query: APP_QUERY },
  ]);

  const [ editCar ] = useCarTable();

  if (loading) {
    return <div>Loading!</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return <>
    <ToolHeader headerText="Car Tool" />
    <CarTable cars={data.cars} editCarId={data.editCarId}
      onEditCar={editCar} onDeleteCar={deleteCar}
      onSaveCar={replaceCar} onCancelCar={() => editCar(-1)}/>
    <CarForm buttonText="Add Car" onSubmitCar={appendCar} />
  </>;
};
