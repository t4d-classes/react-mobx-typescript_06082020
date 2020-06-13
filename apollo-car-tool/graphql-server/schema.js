export const typeDefs = `
  type Query {
    message: String
    cars: [Car]
  }

  type Mutation {
    appendCar(car: AppendCar): Car
    deleteCar(carId: ID): Car
    replaceCar(car: ReplaceCar): Car
  }

  type Car {
    id: ID
    make: String
    model: String
    year: Int
    color: String
    price: Float
  }

  input AppendCar {
    make: String
    model: String
    year: Int
    color: String
    price: Float
  }

  input ReplaceCar {
    id: ID
    make: String
    model: String
    year: Int
    color: String
    price: Float
  }

`;
