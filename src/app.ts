import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
app.use(express.json());

const corsOptions = {
  origin: 'https://ababil-library-client-dx8q.vercel.app',
  credentials: true,
};
app.use(cors(corsOptions));

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
