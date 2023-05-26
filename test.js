// const fs = require("fs");

// let obj = [];
// [0, 0, 0, 0, 0, 0, 0, 0].forEach((ele, i) => {
//   const angle = i * (Math.PI / 8);
//   let sin = Math.sin(angle).toFixed(3);
//   let cos = Math.cos(angle).toFixed(3);
//   let tan = Math.tan(angle).toFixed(3);
//   // obj[`${2*i+1}`]=[sin, cos];
//   obj.push({ angle, value: tan });
// });

// (() => {
//   fs.writeFileSync("tan.json", JSON.stringify(obj), "utf-8");
// })();

const { mouse, Key, Button, Point, left, sleep } = require("@nut-tree/nut-js");
const region = require("./DPadPosition.json");

(async () => {
  mouse.config.mouseSpeed = 1;
  await mouse.setPosition(new Point(region.left, region.top));
  await mouse.pressButton(Button.LEFT);

  await sleep(1000);
  await mouse.setPosition(new Point(region.left + 40, region.top + 40));
  await sleep(2000);

  await mouse.releaseButton(Button.LEFT);

  // await mouse.setPosition(
  //   new Point(region.left + region.width, region.top + region.height)
  // );
})();
