import axios from 'axios';
import winston from 'winston';

const handleMovesAccessTokenRequest = (request, response) => {
  winston.log('info', `Received moves access token request at ${new Date().getTime()}`);

  const { body } = request;

  if (body && body.authorization_code) {
    winston.log('info', `Making request to Moves API at ${new Date().getTime()}`);

    axios.post('https://api.moves-app.com/oauth/v1/access_token', {}, {
      params: {
        grant_type: 'authorization_code',
        code: body.authorization_code,
        client_id: process.env.MOVES_CLI_CLIENT_ID,
        client_secret: process.env.MOVES_CLI_CLIENT_SECRET,
      },
    }).then((data) => {
      winston.log('info', `Moves API Request successful response at ${new Date().getTime()}`);

      return response.status(data.status).send(data.data);
    }).catch((error) => {
      winston.log('error', `Moves API Request error at ${new Date().getTime()}`);
      winston.log('error', `Moves API Request error ${error}`);

      if (error.response) {
        return response.status(error.response.status).send(error.response.data);
      } else if (error.request) {
        return response.status(400).send({ error: 'Request sent but no response received' });
      }

      return response.status(500).send({ error: 'Unexpected error' });
    });
  } else {
    winston.log('error', `Invalid parameter: ${body}`);

    response.status(400).send({ error: 'Invalid parameter' });
  }
};

const handleMovesRefreshAccessTokenRequest = (request, response) => {
  winston.log('info', `Received Moves refresh access token request at ${new Date().getTime()}`);

  const { body } = request;

  if (body && body.refresh_access_token) {
    winston.log('info', `Making request to Moves API at ${new Date().getTime()}`);

    axios.post('https://api.moves-app.com/oauth/v1/', {}, {
      params: {
        grant_type: 'refresh_token',
        refresh_token: body.refresh_access_token,
        client_id: process.env.MOVES_CLI_CLIENT_ID,
        client_secret: process.env.MOVES_CLI_CLIENT_SECRET,
      },
    }).then((data) => {
      winston.log('info', `Moves API Request successful response at ${new Date().getTime()}`);

      return response.status(data.status).send(data.data);
    }).catch((error) => {
      winston.log('error', `Moves API Request error at ${new Date().getTime()}`);
      winston.log('error', `Moves API Request error ${error}`);

      if (error.response) {
        return response.status(error.response.status).send(error.response.data);
      } else if (error.request) {
        return response.status(400).send({ error: 'Request sent but no response received' });
      }

      return response.status(500).send({ error: 'Unexpected error' });
    });
  } else {
    winston.log('error', `Invalid parameter: ${JSON.stringify(body)}`);

    response.status(400).send({ error: 'Invalid parameter' });
  }
};

export { handleMovesAccessTokenRequest, handleMovesRefreshAccessTokenRequest };
