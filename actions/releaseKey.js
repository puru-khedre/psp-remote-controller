const { keyboard, Key } = require("@nut-tree/nut-js");

async function releaseKey(key) {
  console.log(parseInt(key), "releaseKey");
  await keyboard.releaseKey(key);
}

module.exports = releaseKey;
