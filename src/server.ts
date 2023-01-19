import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import morgan from 'morgan';
import dotenv from 'dotenv';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import asyncErrors from 'express-async-errors';
// require('express-async-errors');

// import { globalErrorHandler } from './middleware/globalErrorHandler';
import errorHandlerMiddleware from './middleware/error-handler';
// import notFoundHandler from './middleware/notFound';
// import { NotFound } from './middleware/globalErrorHandler';
dotenv.config();

const app: express.Application = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// eslint-disable-next-line @typescript-eslint/no-inferrable-types

app.use(bodyParser.json());

app.use('/api', routes);

// app.use(notFoundHandler);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
const address = `0.0.0.0:${PORT}`;

app.listen(PORT, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
