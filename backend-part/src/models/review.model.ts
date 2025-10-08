import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
    message: string;
    bookId: string;
    userId: string;
}

const reviewSchema = new Schema<IReview>({
  message: { type: String, required: true},
  bookId: { type: String, required: true },
  userId: { type: String, required: true },
}, {
  timestamps: true,
});

reviewSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const Review = mongoose.model<IReview>("Review", reviewSchema);