// const io = require("socket.io")(3000);

// io.on("connection", (socket) => {
//   socket.emit("chat-message", "Hello World");
// });
const http = require("http");
const { Server } = require("socket.io");

const users = {};
const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connection");
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", {
      message,
      name: users[socket.id],
    });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});

httpServer.listen(3000, "192.168.1.4", () => console.log("listening"));
