import { Model, Types } from 'mongoose';

interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

interface IborrowStatic extends Model<IBorrow> {
  getBorrowedBooksSummary(): Promise<any>;
}

export { IBorrow, IborrowStatic };
