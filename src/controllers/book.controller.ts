import { Request, Response } from 'express';
import { Book } from './../models/book.model';

// Create Book
const createBook = async (req: Request, res: Response) => {
  try {
    const bookData = req.body;
    const available = Number(bookData.copies) > 0;

    const book = await Book.create({ ...bookData, available });

    res.status(201).json({
      success: true,
      message: 'Book Created successfully',
      data: book,
    });
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        message: 'Validation failed!',
        error: err,
      });
    }
  }
};

// Get All Books
const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = 'createdAt' } = req.query;

    const query: any = {};
    if (filter) {
      query.genre = filter;
    }
    const books = await Book.find(query)
      .sort({ [sortBy as string]: 1 })
      .limit(10);
    res.status(201).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};

// Get a single book from the database using its id
const getBookById = async (req: Request, res: Response) => {
  try {
    const book = req.params.bookId;
    let filter = await Book.findById(book);
    res.status(201).json({
      sucess: true,
      message: 'Book retrieved successfully',
      data: filter,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Book not found!',
      error: err,
    });
  }
};

// book updated using its id
const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const updatedData = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
    });
    res.status(201).json({
      success: true,
      message: 'Book updated successfully',
      data: updatedData,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Update Failed',
      error: err,
    });
  }
};

// delete book using id
const deleteBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const deletedBook = await Book.findByIdAndDelete(bookId);

    res.status(201).json({
      success: true,
      message: 'Book deleted successfully',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      success: true,
      message: 'Failed book update',
      error: err,
    });
  }
};

export { createBook, getAllBooks, getBookById, updateBook, deleteBookById };
