const { mouse, Key, Button, Point, left, sleep } = require("@nut-tree/nut-js");

(async () => {
  await sleep(2000)
  const pos = await mouse.getPosition()

  console.log(pos.toString());
})();
