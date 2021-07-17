import http2 from 'http2';
import ProviderFactory from '../providers/ProviderFactory';
import { Providers, AuthorizationExemptRequests } from '../constants';

const authorize = async (req, res, next) => {
  if (AuthorizationExemptRequests.some((path) => req.path.startsWith(path))) {
    return next();
  }
  const { userName, password } = req.body;
  if (!userName || !password) {
    res
      .status(http2.constants.HTTP_STATUS_BAD_REQUEST)
      .send('request body must include both "userName" and "password"');
  }
  const provider = ProviderFactory(Providers.Mongo, userName, password);
  if (!(await provider.validatePassword())) {
    res
      .status(http2.constants.HTTP_STATUS_FORBIDDEN)
      .send('incorrect password or user name');
  }
  req.body.provider = provider;
  return next();
};

export default authorize;
