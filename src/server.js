import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';

import { handleMovesAccessTokenRequest, handleMovesRefreshAccessTokenRequest } from './requestHandlers';

const startServer = () => {
  const app = express();

  const movesRouter = express.Router();

  movesRouter.post('/access_token', (request, response) => {
    handleMovesAccessTokenRequest(request, response);
  });

  movesRouter.post('/refresh_access_token', (request, response) => {
    handleMovesRefreshAccessTokenRequest(request, response);
  });

  winston.log('info', `Listening on port: ${process.env.PORT}`);
  app.listen(process.env.PORT);

  app.use(bodyParser.json({ type: 'application/json' }));
  app.use('/moves', movesRouter);
};


export default startServer;
