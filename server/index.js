import express from "express";
import router from "./router/router";
import controler from "./controllers/controller";

// import path from "path";
const app = express();

app.use("/", router);

const server = app.listen(5000, () => {
  console.log("server running port 5000");
});

controler.messagesRooms(server);
// let i = 0;

// while (i < controler.rooms.length) {
//   controler.messagesRooms(server, controler.rooms[i]);
//   console.log(controler.rooms[i]);
//   i++;
// }

// controler.rooms.forEach((room) => {
//   controler.messagesRooms(server, room);
// });

// for (let rom of controler.rooms) {
//   controler.messagesRooms(server, rom);
// }
