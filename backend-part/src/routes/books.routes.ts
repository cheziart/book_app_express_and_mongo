import { Router } from "express";
import { BooksController } from "../controllers/books.controller";
import reviewsRouter from "./reviews.routes";

const router = Router();
const booksController = new BooksController();

router.get("/", booksController.getBooks);
router.get("/:bookId", booksController.getBookById);

router.use("/:bookId/reviews", reviewsRouter);

export default router;