import express from "express";
import path from "path";
import socketIO from "socket.io";
import UserModel from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
      return res.status(400).send("Username already existe");
    }

    //verify if email already exists
    const seletecEmail = await UserModel.findOne({ email: req.body.email });
    if (seletecEmail) {
      return res.status(400).send("Email already exists");
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

  userLogin: async (req, res) => {
    //Selected user in database where email == emais body
    const userSelected = await UserModel.findOne({ email: req.body.email });
    if (!userSelected) {
      return res.status(400).send("Email or Passworld not exists");
    }

    //compare password, the password database and password body
    const verifyPassword = bcrypt.compareSync(
      req.body.password,
      userSelected.password
    );
    if (!verifyPassword) {
      return res.status(400).send("Email or Passworld not exists");
    }
    const token = jwt.sign({ id: userSelected._id }, process.env.TOKE_JWT);
    res.header("auth", token);
    res.send("login");
  },

  auth: (req, res, next) => {
    const token = req.header("auth");
    if (!token) {
      return res.status(401).send("Access Denied");
    }
    try {
      const verifyToken = jwt.verify(token, process.env.TOKE_JWT);
      req.user = verifyToken;
      next();
    } catch (error) {
      return res.status(401).send("Access Denied");
    }
  },
};
export default controller;
