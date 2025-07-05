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
exports.getBorrowedBooksSummary = exports.borrowBook = void 0;
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId, quantity, dueDate } = req.body;
        if (!bookId || !quantity || !dueDate) {
            res.status(400).json({
                success: false,
                message: 'bookId, quantity, and dueDate are required',
            });
        }
        else if (!(yield book_model_1.Book.exists({ _id: bookId }))) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }
        else {
            const book = yield book_model_1.Book.findById(bookId);
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
            yield book.checkAvailability();
            yield book.save();
            const borrowData = yield borrow_model_1.Borrow.create({
                book: bookId,
                quantity,
                dueDate: dueDate || new Date(),
            });
            res.status(201).json({
                success: true,
                message: 'Book borrowed successfully',
                data: borrowData,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
});
exports.borrowBook = borrowBook;
const getBorrowedBooksSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' },
                },
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookInfo',
                },
            },
            {
                $unwind: '$bookInfo',
            },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: '$bookInfo.title',
                        isbn: '$bookInfo.isbn',
                    },
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: summary,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
});
exports.getBorrowedBooksSummary = getBorrowedBooksSummary;
