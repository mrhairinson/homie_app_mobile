require("dotenv").config();
const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./src/routes");

const app = express();

const port = process.env.PORT || 8000;
const baseUrl = process.env.BASE_URL;
const mongodbUri = process.env.MONGODB_URI;

const activeSockets = {};

//Enabled CORS policies
app.use(
  cors({ origin: "*", methods: ["GET", "POST", "PUT", "PATCH", "DELETE"] })
);
//Enable express JSON middleware
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
//Use routes
app.use(baseUrl, routes);

app.get(baseUrl, (req, res) => {
  res.send("Hello World!");
});
const server = createServer(app);
const io = new Server(server);
io.on("connection", (socket) => {
  // console.log("a user connected with id: ", socket.id);
  socket.on("join", (userId) => {
    // console.log("user joined with id: ", userId);
    activeSockets[userId] = socket.id;
    // console.log("User", activeSockets);
  });

  socket.on("disconnect", () => {
    // console.log("user disconnected");
    for (let key in activeSockets) {
      if (
        activeSockets.hasOwnProperty(key) &&
        activeSockets[key] === socket.id
      ) {
        delete activeSockets[key];
      }
    }
  });

  socket.on("message", (data) => {
    // console.log("Message received:", data);
    const { chatId, senderId, receiverId, message } = data;
    const receiverSocket = activeSockets[receiverId];
    const sendBackData = {
      chatId: chatId,
      senderId: senderId,
      text: message,
    };
    if (receiverSocket) {
      io.to(receiverSocket).emit("getMessage", sendBackData);
    }
  });
});
//DB connection
mongoose
  .connect(mongodbUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(`Error: MongoDB connection Failed: \n${err}`))
  .finally(() => {
    server.listen(port, (err) => {
      if (err) console.log(`Error: ${err}`);
      console.log(`Server listening on http://localhost:${port}/api/v1`);
    });
  });
