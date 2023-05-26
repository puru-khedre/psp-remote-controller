require("@nut-tree/template-matcher");
const { sleep, screen, imageResource, ColorMode } = require("@nut-tree/nut-js");
const path = require("path");
const fs = require("fs");

async function getPosition() {
  await sleep(2000);
  screen.config.resourceDirectory = path.resolve("./images");
  const dPadImage = await imageResource("ppsspp-analog-stick(gray).png");
  const region = await screen.find(dPadImage, { confidence: 0.8 });
  console.log(JSON.stringify(region));
  return region;
}

getPosition()
  .then((r) => {
    fs.writeFileSync(
      path.resolve("./Analog-stick.json"),
      JSON.stringify(r),
      "utf-8"
    );
  })
  .catch((e) => console.log(e.message));
