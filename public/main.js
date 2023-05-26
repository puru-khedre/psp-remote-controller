const socket = io();
const analogStick = document.querySelector("#analog-stick");
const stick = analogStick.querySelector("#stick");
const range = 50;

let analogStickCenter;
let analogStickBox;
let processFlagNum = 0;

function handleDrag(e) {
  e.preventDefault();

  let left = e.clientX - analogStickCenter.left;
  let top = e.clientY - analogStickCenter.top;
  if (top >= range || top <= -range) top = (top / Math.abs(top)) * range;
  if (left >= range || left <= -range) left = (left / Math.abs(left)) * range;

  stick.style.top = `${top}px`;
  stick.style.left = `${left}px`;

  console.log(left, top);
  socket.emit("mousemove", { x: left, y: top });
  processFlagNum++;
}

analogStick.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  analogStickBox = analogStick.getBoundingClientRect();
  analogStickCenter = {
    left: analogStickBox.left + analogStickBox.width / 2,
    top: analogStickBox.top + analogStickBox.height / 2,
  };
  navigator.vibrate(50);
  stick.classList.remove("stick-transition");
  socket.emit("holdClick", null);
  analogStick.addEventListener("pointermove", handleDrag);
});

analogStick.addEventListener("pointerup", () => {
  stick.classList.add("stick-transition");
  stick.style.top = 0;
  stick.style.left = 0;
  socket.emit("releaseClick", null);
  analogStick.removeEventListener("pointermove", handleDrag);
});

function scalingForSec({ target: btn }) {
  btn.style.scale = "1.3";
  setTimeout(() => (btn.style.scale = ""), 200);
}

function scalingOn({ target: btn }) {
  btn.style.scale = "1.3";
}

function scalingOff({ target: btn }) {
  btn.style.scale = "";
}

function pressKey(e, key) {
  scalingForSec(e);
  socket.emit(key, null);
  navigator.vibrate(50);
}

function holdKey(e, key) {
  scalingOn(e);
  socket.emit(key, null);
  navigator.vibrate(50);
}

function releaseKey(e, key) {
  scalingOff(e);
  // socket.emit("releaseClick", null);
  socket.emit(key, null);
  navigator.vibrate(50);
}

function toggleFullscreen(event) {
  let elem = event.target;
  let isToggleOn = elem.getAttribute("data-toggle-mode");
  if (isToggleOn == "on") {
    elem.setAttribute("data-toggle-mode", "off");
    document.exitFullscreen();
  } else {
    elem.setAttribute("data-toggle-mode", "on");
    document.documentElement.requestFullscreen();
  }
}
