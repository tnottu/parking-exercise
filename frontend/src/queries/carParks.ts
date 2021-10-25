import { gql } from '@apollo/client';

export const ALL_CARPARKS = gql`
  query getAllCarParks {
    carParks {
      carParkId
      name
      lat
      lon
      maxCapacity
      spacesAvailable
    }
  }
`;
