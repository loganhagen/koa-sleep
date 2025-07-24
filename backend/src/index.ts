import './initEnv';
import moduleAlias from 'module-alias';

if (process.env.NODE_ENV === 'production') {
  moduleAlias.addAliases({
    '@utils': `${__dirname}/utils`,
    '@custom_types': `${__dirname}/../../types`
  });
}

import app from './app';
import { EXPRESS_PORT } from "./config/config";

app.listen(EXPRESS_PORT, () => {
  console.log(`Server is running on port ${EXPRESS_PORT}`);
  console.log(`Check /docs for available endpoints.`);
});
