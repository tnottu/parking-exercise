import { gql } from 'apollo-server-express';
import oukaMiddleman from '../services/ouka-middleman';

interface CarParkEntry {
  carParkId: string;
  name: string;
  maxCapacity?: number;
  spacesAvailable?: number;
  realtime: boolean;
  pricing: CarParkPriceListItem[];
  testKey?: string;
  lat?: number;
  lon?: number;
}

interface CarParkPriceListItem {
  title?: LocalizedString;
  value?: LocalizedString;
}

interface LocalizedString {
  fi: string;
  sv: string;
  en: string;
}

const typeDefs = gql`
  type CarPark {
    carParkId: String
    name: String!
    maxCapacity: Int
    spacesAvailable: Int
    realtime: Boolean
    pricing: [CarParkPriceListItem]
    testKey: String!
    lon: Float
    lat: Float
  }

  type CarParkPriceListItem {
    title: LocalizedString!
    value: LocalizedString!
  }

  type LocalizedString {
    fi: String
    sv: String
    en: String
  }

  type Query {
    carParks: [CarPark!]!
  }
`;

function itemToEntry(item: any): CarParkEntry {
  const entry: CarParkEntry = {
    carParkId: item.carParkId,
    name: item.string,
    maxCapacity: item.maxCapacity,
    spacesAvailable: item.spacesAvailable,
    realtime: item.realtime,
    pricing: item.pricing,
    testKey: item.testKey,
    lat: item.lat,
    lon: item.lat,
  }
  return entry;
}

const resolvers = {
  Query: {
    carParks: async (_parent, _args, context): Promise<CarParkEntry[]> => {
      const response = await oukaMiddleman.query(context.req);

      // Format response to fit TS type
      let entries = [];
      if (Array.isArray(response.data.carParks)) {
        entries = response.data.carParks.map((item) => {
          const entry: CarParkEntry = {
            carParkId: string;
            name: string;
            maxCapacity?: number;
            spacesAvailable?: number;
            realtime: boolean;
            pricing: CarParkPriceListItem[];
            testKey?: string;
            lat?: number;
            lon?: number;
          }
          return entry;
        });
      }



      return response.data.carParks;
    },
  },
};

const exp = {
  typeDefs,
  resolvers,
};

export default exp;
