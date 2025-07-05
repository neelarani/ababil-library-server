import mongoose, { Schema } from 'mongoose';
import { IBorrow, IborrowStatic } from '../interfaces/borrow.interface';
import { Book } from './book.model';

const borrowSchema = new Schema<IBorrow, IborrowStatic>(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
      validate: {
        validator: Number.isInteger,
        message: 'Quantity must be an integer',
      },
    },
    dueDate: { type: Date, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

borrowSchema.pre('save', async function (next) {
  const book = await Book.findById(this.book);
  if (!book) return next();
  if (book?.copies < 1) {
    book.available = false;
  }
  await book.save();
  next();
});

borrowSchema.static('getBorrowedBooksSummary', async function () {
  const summary = await Borrow.aggregate([
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
  return summary;
});

export const Borrow = mongoose.model<IBorrow, IborrowStatic>(
  'Borrow',
  borrowSchema
);
