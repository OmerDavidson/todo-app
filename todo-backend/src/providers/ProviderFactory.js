import PostgresProvider from './PostrgesProvider';
import MongoProvider from './mongoProvider';
import { Providers } from '../constants';

const ProviderFactory = (providerType, userName, Password) => {
  switch (providerType) {
    case Providers.Postgress:
      return new PostgresProvider(userName, Password);
    case Providers.Mongo:
      return new MongoProvider(userName, Password);
    default:
      throw new Error('no such provider');
  }
};

export default ProviderFactory;
