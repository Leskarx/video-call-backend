import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const users = [];

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: "http://localhost:5173" }));

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("user-joined", ({ username }) => {
    console.log("User Joined:", username);
    users.push({ username, id: socket.id });
    io.emit("joined-users", users);
  });

  socket.on("get-users", () => {
    socket.emit("joined-users", users);
  });

  socket.on("start-call", ({ offer, id }) => {
    io.to(id).emit("incoming-call", { offer, id: socket.id });
  });

  socket.on("answer-call", ({ answer, to }) => {
    io.to(to).emit("call-accepted", { answer, from: socket.id });
  });

  socket.on("ice-candidate", ({ candidate, targetUserId }) => {
    socket.to(targetUserId).emit("ice-candidate", candidate);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    const index = users.findIndex((user) => user.id === socket.id);
    if (index !== -1) {
      users.splice(index, 1);
    }
    io.emit("joined-users", users);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});