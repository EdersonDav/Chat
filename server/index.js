import express from "express";
import dotenv from "dotenv";
import router from "./router/router";
import controller from "./controllers/controller";
import DB from "./database/connectedDatabase";

const app = express();
dotenv.config();
DB.connect();

app.use("/", express.json(), router);

const server = app.listen(process.env.PORT, () => {
  console.log("server running");
});

controller.messagesRooms(server);
