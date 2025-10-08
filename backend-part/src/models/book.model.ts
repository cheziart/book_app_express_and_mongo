import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
    code: string;
    author: string;
    title: string;
}

const bookSchema = new Schema<IBook>({
  code: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  title: { type: String, required: true },
});

bookSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const Book = mongoose.model<IBook>("Book", bookSchema);