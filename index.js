const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const region = require("./Analog-stick.json");
const {
  Key,
  mouse,
  Button,
  Point,
  KeyboardClass,
} = require("@nut-tree/nut-js");
const path = require("path");
const pressKey = require("./actions/pressKey");
const holdKey = require("./actions/holdKey");
const releaseKey = require("./actions/releaseKey");
const centerPoint = new Point(
  region.left + region.width / 2,
  region.top + region.height / 2
);
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("pressTriangle", async (data) => pressKey(Key.S));
  socket.on("pressSquare", async (data) => pressKey(Key.A));
  socket.on("pressCross", async (data) => pressKey(Key.Z));
  socket.on("pressCircle", async (data) => pressKey(Key.X));
  socket.on("pressLeftTrigger", async (data) => pressKey(Key.Q));
  socket.on("pressRightTrigger", async (data) => pressKey(Key.W));

  socket.on("holdTriangle", async (data) => holdKey(Key.S));
  socket.on("holdSquare", async (data) => holdKey(Key.A));
  socket.on("holdCross", async (data) => holdKey(Key.Z));
  socket.on("holdCircle", async (data) => holdKey(Key.X));
  socket.on("holdLeftTrigger", async (data) => holdKey(Key.Q));
  socket.on("holdRightTrigger", async (data) => holdKey(Key.W));
  socket.on("holdUp", async (data) => holdKey(Key.Up));
  socket.on("holdDown", async (data) => holdKey(Key.Down));
  socket.on("holdLeft", async (data) => holdKey(Key.Left));
  socket.on("holdRight", async (data) => holdKey(Key.Right));
  socket.on("holdSelect", async (data) => holdKey(Key.Enter));
  socket.on("holdStart", async (data) => holdKey(Key.Space));

  socket.on("releaseTriangle", async (data) => releaseKey(Key.S));
  socket.on("releaseSquare", async (data) => releaseKey(Key.A));
  socket.on("releaseCross", async (data) => releaseKey(Key.Z));
  socket.on("releaseCircle", async (data) => releaseKey(Key.X));
  socket.on("releaseLeftTrigger", async (data) => releaseKey(Key.Q));
  socket.on("releaseRightTrigger", async (data) => releaseKey(Key.W));
  socket.on("releaseUp", async (data) => releaseKey(Key.Up));
  socket.on("releaseDown", async (data) => releaseKey(Key.Down));
  socket.on("releaseLeft", async (data) => releaseKey(Key.Left));
  socket.on("releaseRight", async (data) => releaseKey(Key.Right));
  socket.on("releaseSelect", async (data) => releaseKey(Key.Enter));
  socket.on("releaseStart", async (data) => releaseKey(Key.Space));

  socket.on("log", ({ msg }) => console.log(msg));
  socket.on("holdClick", async (data) => {
    console.log("hold click");

    await mouse.setPosition(centerPoint);
    await mouse.pressButton(Button.LEFT);
  });

  socket.on("mousemove", async ({ x, y }) => {
    const point = new Point(centerPoint.x + x, centerPoint.y + y);
    console.log(point.toString());
    await mouse.setPosition(point);
  });

  socket.on("releaseClick", async (d) => {
    console.log("release click");
    mouse.releaseButton(Button.LEFT);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use("/", express.static(path.resolve("./public/")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// 192.168.177.109
server.listen(3000, () => {
  console.log(`Server started on port ${server.address().address} :)`);
});
