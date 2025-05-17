const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes"); // will be updated to accept io
const connectDB = require("./config/db");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Replace * with your frontend URL in production
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to Task Manager API");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes(io)); // Pass io here

// You can keep this minimal connection log for socket.io
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
