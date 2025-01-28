import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";  // Only needed if you have REST API endpoints

const app = express();
const server = http.createServer(app);

// Configure CORS for Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

// Optional: Configure CORS for Express REST API
app.use(cors({
  origin: "http://localhost:5173"
}));

io.on("connection", (socket) => {
    console.log("User connected", socket.id);
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});