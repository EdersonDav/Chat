import express from "express";
import path from "path";
import socketIO from "socket.io";

const messages = [];

const controller = {
  roomPath: express.static(
    path.resolve(__dirname, "..", "..", "public", "views", "room")
  ),
  loginPath: express.static(
    path.resolve(__dirname, "..", "..", "public", "views", "login")
  ),

  messagesRooms: (server) => {
    const io = socketIO(server);
    const room = io.of(`/room`).on("connection", (socket) => {
      console.log("new_connection");
      socket.emit("update_messages", messages);
      socket.on("new_connection", (data) => {
        messages.push(data);
        room.emit("update_messages", messages);
      });
    });
  },

  userRegister: (req, res) => {
    res.send("register");
  },

  userLogin: (req, res) => {
    res.send("login");
  },
};
export default controller;
