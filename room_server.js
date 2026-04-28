import express from "express";
import path from "path";
import http from "node:http";
import { Server } from "socket.io";

const app = express();
const port = 8181;
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("./public/index.html");
});

// socket handler
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // join room
  socket.on("join-room", ({ roomId, username }) => {
    socket.join(roomId);
    // store username in socket
    socket.data.username = username;
    console.log(`User: ${username} joined room: ${roomId}`);
  });

  // send msg to room
  socket.on("client-send-msg", ({ roomId, message }) => {
    io.to(roomId).emit("server-recieve-msg", {
      message,
      username: socket.data.username,
    });
  });
});

server.listen(port, () => {
  console.log(`Chat room server listening on ${port}`);
});
