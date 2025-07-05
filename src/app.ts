import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
app.use(cors());
app.use(express.json());

import bookRoutes from '../src/routes/book.route';
import borrowRoutes from '../src/routes/borrow.route';
import globalErrorHandler from './middleware/errorHandler';

app.use('/api', bookRoutes);
app.use('/api', borrowRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send(
    '💖 Welcome to Ababil Library – Built with love, inspired by my dearest Ababil 💖'
  );
});

app.use(globalErrorHandler);

export default app;
