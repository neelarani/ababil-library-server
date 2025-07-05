import { Request, Response } from 'express';
import { Book } from '../models/book.model';
import { Borrow } from '../models/borrow.model';

const borrowBook = async (req: Request, res: Response) => {
  try {
    const { bookId, quantity, dueDate } = req.body;

    if (!bookId || !quantity || !dueDate) {
      res.status(400).json({
        success: false,
        message: 'bookId, quantity, and dueDate are required',
      });
    } else if (!(await Book.exists({ _id: bookId }))) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    } else {
      const book = await Book.findById(bookId);

      if (!book) {
        res.status(404).json({
          success: false,
          message: 'Book not found',
        });
        return;
      }

      if (book.copies < quantity) {
        res.status(400).json({
          success: false,
          message: 'Not enough copies available',
        });
        return;
      }

      book.copies -= quantity;
      await book.save();

      const borrowData = await Borrow.create({
        book: bookId,
        quantity,
        dueDate: dueDate,
      });

      res.status(201).json({
        success: true,
        message: 'Book borrowed successfully',
        data: borrowData,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

const getBorrowedBooksSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.getBorrowedBooksSummary();
    res.status(200).json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: summary,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

export { borrowBook, getBorrowedBooksSummary };
