import mongoose, { Schema } from 'mongoose';
import { IBook } from '../interfaces/book.interface';
import { Borrow } from './borrow.model';

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: [
        'FICTION',
        'NON_FICTION',
        'SCIENCE',
        'HISTORY',
        'BIOGRAPHY',
        'FANTASY',
      ],
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: {
      type: Number,
      required: true,
      min: [0, 'Copies must be a positive number'],
      validate: {
        validator: Number.isInteger,
        message: 'Copies must be a positive number',
      },
    },
    available: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

bookSchema.post('findOneAndDelete', async function (doc, next) {
  if (doc) {
    await Borrow.deleteMany({ book: doc._id });
  }
  next();
});

export const Book = mongoose.model<IBook>('Book', bookSchema);
