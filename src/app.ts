import express, { Application, Request, Response } from 'express';
import bookRoutes from '../src/routes/book.route';
import borrowRoutes from '../src/routes/borrow.route';
import globalErrorHandler from './middleware/errorHandler';
import cors from 'cors';

const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: 'https://ababil-library.vercel.app',
  })
);

app.use('/api', bookRoutes);
app.use('/api', borrowRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send(
    '💖 Welcome to Ababil Library – Built with love, inspired by my dearest Ababil 💖'
  );
});

app.use(globalErrorHandler);

export default app;
