import { Request, Response } from "express";
import { Book } from "../models/book.model";
import { customResponses } from "../utils/response";

interface IBookFilters {
  code?: string;
  author?: string;
  title?: string;
}

export class BooksController {
  getBooks = async (req: Request, res: Response) => {
    const {code, author, title, page = 1, limit = 10} = req.query;
    let filters: IBookFilters = {};
    
    if (code) {
      filters.code = code.toString();
    }

    if (author) {
      filters.author = author.toString();
    }

    if (title) {
      filters.title = title.toString();
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    try {
      const books = await Book.find(filters)
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: -1 });

      return customResponses.ok(res, books);
    } catch(error) {
      return customResponses.badRequest(res, "Unexpected error");
    }
  };

  getBookById = async (req: Request, res: Response) => {
    const bookId =  req.params.bookId;

     try {
      const book = await Book.findById(bookId);
      return customResponses.ok(res, book);
    } catch(error) {
      return customResponses.badRequest(res, "Unexpected error");
    }
  };
}