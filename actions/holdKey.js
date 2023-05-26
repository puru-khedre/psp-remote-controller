const { keyboard, Key } = require("@nut-tree/nut-js");

async function holdKey(key) {
  console.log(parseInt(key), "holdkey");
  await keyboard.pressKey(key);
}

module.exports = holdKey;
