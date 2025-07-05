import express from 'express';
import {
  createBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBook,
} from '../controllers/book.controller';
const router = express.Router();

router.post('/books', createBook);
router.get('/books', getAllBooks);
router.get('/books/:bookId', getBookById);
router.put('/books/:bookId', updateBook);
router.delete('/books/:bookId', deleteBookById);

export default router;
