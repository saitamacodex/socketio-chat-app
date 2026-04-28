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
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User: ${socket.id} joined room: ${roomId}`);
  });

  // msg to room
  socket.on("client-send-msg", ({ roomId, message }) => {
    socket.to(roomId).emit("server-recieve-msg", {
      message,
      sender: socket.id,
    });
  });
});

server.listen(port, () => {
  console.log(`Chat room server listening on ${port}`);
});
