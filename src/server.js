import express from 'express';
import cors from 'cors';
import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import contactsRouter from './routers/contacts.js';
import { getEnvVar } from './utils/getEnvVar.js';

export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json({
    type: ['application/json', 'application/vnd.api + json'],
    limit: '100kb'
  }));

  // app.use(logger);

  app.use('/contacts', contactsRouter);

  app.use(errorHandler);

  app.use(notFoundHandler);
  const port = Number(getEnvVar('PORT', 3000));
  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
