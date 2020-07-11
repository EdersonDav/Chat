import mongoose from "mongoose";

const connected = {
  connect: (URL_DB) =>
    mongoose.connect(
      URL_DB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Database connected");
        }
      }
    ),
};
export default connected;
