import { Router } from "express";
import { ReviewsController } from "../controllers/reviews.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { checkOwnership } from "../middleware/ownershipMiddleware";
import { Review } from "../models/review.model";
import { validateBody } from "../middleware/validate.middleware";
import { reviewSchema } from "../schemas/review.schema";

const router = Router({ mergeParams: true });
const reviewsController = new ReviewsController();

router.get("/", reviewsController.getReviews);
router.post("/", authMiddleware, validateBody(reviewSchema), reviewsController.addReview);
router.put(
    "/:reviewId", 
    authMiddleware, 
    checkOwnership(Review, 'reviewId'),
    validateBody(reviewSchema),
    reviewsController.updateReview);
router.delete(
    "/:reviewId", 
    authMiddleware, 
    checkOwnership(Review, 'reviewId'), 
    reviewsController.removeReview);

export default router;