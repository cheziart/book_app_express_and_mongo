import mongoose from "mongoose";
import dotenv from "dotenv";
import { Book } from "./models/book.model";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);

    await Book.deleteMany({});

    const books = await Book.insertMany([
      { title: "Atomic Habits", author: "James Clear", code: "B001" },
      { title: "Clean Code", author: "Robert C. Martin", code: "B002" },
      { title: "Deep Work", author: "Cal Newport", code: "B003" },
    ]);

    console.log("Seeded books:", books.length);

    mongoose.connection.close();
    console.log("Done!");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seed();