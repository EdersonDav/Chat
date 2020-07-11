import mongoose from "mongoose";

const database = {
  connect: () => {
    mongoose.connect(
      process.env.DB_URL,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Mongo connected");
        }
      }
    );
  },
};
export default database;
