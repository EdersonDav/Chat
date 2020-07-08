import express from "express";
import socketIO from "socket.io";
import path from "path";
const app = express();

const messages = [];

app.use("/", express.static(path.resolve(__dirname, "..", "public")));

const server = app.listen(3000, () => {
  console.log("server running port 3000");
});

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("new_connection");
  socket.on("new_connection", (data) => {
    message.push(data.message);
    io.emit("update_messages", messages);
  });
});
