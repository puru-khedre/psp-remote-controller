const { keyboard, Key } = require("@nut-tree/nut-js");

async function pressKey(key) {
  console.log(parseInt(key), "pressKey");
  await keyboard.pressKey(key);
  await keyboard.releaseKey(key);
}

module.exports = pressKey;
