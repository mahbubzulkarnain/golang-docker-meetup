try {
  require('dotenv').config();
} catch (e) {
  log.error(errors(e));
}

import { createServer } from 'http';
import graphql, { graphqlPath } from './src/graphql';
import app, { hostname, port } from './src/app';
import log from "./src/utils/log";
import { errors } from "graphql-response-parser";

graphql
  .applyMiddleware({ app, path: graphqlPath, cors: true });

graphql
  .installSubscriptionHandlers(createServer(app));

app
  .listen(port, hostname, (error) => {
    if (error) {
      log.error(error)
    }
    log.info(`>>> 🌎 Open ${hostname}:${port}${graphql.graphqlPath} in your browser.`)
  });
