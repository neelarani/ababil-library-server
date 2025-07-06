"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookById = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = require("./../models/book.model");
// Create Book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookData = req.body;
        const available = Number(bookData.copies) > 0;
        const book = yield book_model_1.Book.create(Object.assign(Object.assign({}, bookData), { available }));
        res.status(201).json({
            success: true,
            message: 'Book Created successfully',
            data: book,
        });
    }
    catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json({
                success: false,
                message: 'Validation failed!',
                error: err,
            });
        }
    }
});
exports.createBook = createBook;
// Get All Books
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = 'createdAt' } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const books = yield book_model_1.Book.find(query).sort({ [sortBy]: 1 });
        res.status(201).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err,
        });
    }
});
exports.getAllBooks = getAllBooks;
// Get a single book from the database using its id
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = req.params.bookId;
        let filter = yield book_model_1.Book.findById(book);
        res.status(201).json({
            sucess: true,
            message: 'Book retrieved successfully',
            data: filter,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: 'Book not found!',
            error: err,
        });
    }
});
exports.getBookById = getBookById;
// book updated using its id
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updatedData = yield book_model_1.Book.findByIdAndUpdate(bookId, req.body, {
            new: true,
        });
        res.status(201).json({
            success: true,
            message: 'Book updated successfully',
            data: updatedData,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: 'Update Failed',
            error: err,
        });
    }
});
exports.updateBook = updateBook;
// delete book using id
const deleteBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const deletedBook = yield book_model_1.Book.findByIdAndDelete(bookId);
        res.status(201).json({
            success: true,
            message: 'Book deleted successfully',
            data: null,
        });
    }
    catch (err) {
        res.status(400).json({
            success: true,
            message: 'Failed book update',
            error: err,
        });
    }
});
exports.deleteBookById = deleteBookById;
