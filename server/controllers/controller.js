import express from "express";
import path from "path";
import socketIO from "socket.io";
import UserModel from "../models/User";
import bcrypt from "bcryptjs";

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

  userRegister: async (req, res) => {
    //verify if username already exists
    const selectedUsername = await UserModel.findOne({
      username: req.body.username,
    });
    if (selectedUsername) {
      return res.send("Username already existe");
    }

    //verify if email already exists
    const seletecEmail = await UserModel.findOne({ email: req.body.email });
    if (seletecEmail) {
      return res.send("Email already exists");
    }

    const user = new UserModel({
      //getting body params of requisition
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    try {
      const savedUser = await user.save();
      //return used save in database
      res.send(savedUser);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  userLogin: (req, res) => {
    res.send("login");
  },
};
export default controller;
