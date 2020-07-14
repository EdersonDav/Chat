import express from "express";
import dotenv from "dotenv";
import router from "./router/router";
import controller from "./controllers/controller";
import connected_DB from "./database/connected";

dotenv.config();
//connected_DB.connect(process.env.URL_DB);

const app = express();
dotenv.config();

app.use("/", express.json(), router);

const server = app.listen(process.env.PORT, () => {
  console.log("server running");
});

controller.messagesRooms(server);
