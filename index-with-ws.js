const express = require("express");
const http = require("http");
const Ws = require("ws");

const app = express();

const httpServer = http.createServer(app);

const wsServer = new Ws.Server({ server: httpServer });

wsServer.on("connection", (ws) => {
  console.log("socket conn");
  ws.on("pong", () => console.log("ping"));
  ws.on("message", (socket) => console.log(socket.toString()));
  ws.on("close", () => console.log("conn closed"));
});

app.get("/", (req, res) => {
  res.send("hello");
});

httpServer.listen(3000, () => {
  console.log(`Server started on port ${httpServer.address().port} :)`);
});
