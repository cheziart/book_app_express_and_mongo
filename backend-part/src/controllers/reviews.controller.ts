import { Request, Response } from "express";
import { customResponses } from "../utils/response";
import { Review } from "../models/review.model";
import { ICustomResponse } from "../types/response.types";
import { IReviewRequest } from "../types/review.types";

export class ReviewsController {

  public getReviews = async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const {page = 1, limit = 10} = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    try {
      const reviews = await Review.find({bookId})
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: -1 });

      return customResponses.ok(res, reviews);
    } catch(error) {
      return customResponses.badRequest(res, "Unexpected error");
    }
  };

  public addReview = async (req: Request<{bookId: string}, ICustomResponse, IReviewRequest>, res: Response) => {
    const bookId = req.params.bookId;
    const { message } = req.body;

    const review = new Review({ bookId, userId: req.user?.id, message });
    console.log(review, bookId, req.params);
    try {
        await review.save();
        return customResponses.ok(res, null, 'Review added successfully')
    } catch(error: any) {
        if (error.name === "ValidationError") {
            return customResponses.badRequest(res, "Validation failed");
        }   
      
        return customResponses.badRequest(res, "Unexpected error");
    }
  };

  public updateReview = async (req: Request<{bookId: string, reviewId: string}, ICustomResponse, IReviewRequest>, res: Response) => {
    const reviewId = req.params.reviewId;

    const { message } = req.body;

    try {
        await Review.findByIdAndUpdate(
          reviewId,
          { $set: {message} },
          { new: true, runValidators: true },
        );
        customResponses.ok(res, null, 'Review updated successfully')
    } catch(error: any) {
        return customResponses.badRequest(res, "Unexpected error");
    }
  };

  public removeReview = async (req: Request, res: Response) => {
    const reviewId = req.params.reviewId;

    try {
      const deletedReview = await Review.findByIdAndDelete(reviewId);

      if (!deletedReview) {
        return customResponses.badRequest(res, "Review not found");
      }

      return customResponses.ok(res, null, "Review deleted successfully");
    } catch(error: any) {
      return customResponses.badRequest(res, "Unexpected error");
    }
  };
}