import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://adityapandey1663_db_user:8KAK2az4c5JqVUJC@cluster0.hhx9xvu.mongodb.net/food-del"
    )
    .then(() => console.log("DB Connected"));
};

// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.
