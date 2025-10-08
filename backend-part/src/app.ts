import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import booksRouter from "./routes/books.routes";
import authRouter from "./routes/auth.routes";
import { connectDB } from "./config/db";

dotenv.config();

export class App {
  public app: Application;
  private PORT: number;

  constructor(port?: number) {
    this.app = express();
    this.PORT = port || Number(process.env.PORT) || 3000;

    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
  }

  private initializeRoutes() {
    this.app.use("/", authRouter);
    this.app.use("/books", booksRouter);
  }

  public async listen() {
    await connectDB();

    this.app.listen(this.PORT, () => {
      console.log(`Server running on http://localhost:${this.PORT}`);
    });
  }
}
