const path = require("path");
const http = require("http");

const express = require("express");
const socketIO = require("socket.io");

publicPath = path.join(__dirname, "..", "public");
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", socket => {
  console.log("New user connected");
  // socket.emit('newMessage', {
  //     from: 'Mike',
  //     text: "Hello there",
  //     createAt: 10
  // });
  socket.emit("newMessage", {
    from: "admin",
    text: "welcome to chat app",
    createAt: new Date().getTime()
  });
  socket.broadcast.emit("newMessage", {
    from: "admin",
    text: "new user joined",
    createAt: new Date().getTime()
  });
  socket.on("createMessage", message => {
    console.log({ message });
    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      createAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage', {
    //     from: message.from,
    //     text: message.text,
    //     createAt: new Date().getTime()
    // });
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(express.static(publicPath));
server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
