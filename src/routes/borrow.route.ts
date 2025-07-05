import express from 'express';
import {
  borrowBook,
  getBorrowedBooksSummary,
} from '../controllers/borrow.controller';

const router = express.Router();

router.post('/borrow', borrowBook);
router.get('/borrow', getBorrowedBooksSummary);

export default router;
