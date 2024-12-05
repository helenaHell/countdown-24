import { createEngine } from "../../shared/engine.js";

const { renderer, input, math, run, finish } = createEngine();
const { ctx, canvas } = renderer;

let elCamera, elContainer, elScene;
let camPosition = 0;
let smoothPosition = 0;
let camAngle = 0;
let smoothAngle = 0;
let posZ = 200;

function update() {
  // Efface le canvas à chaque frame
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Met à jour la caméra
  updateCamera();
}

function setup() {
  elScene = document.querySelector(".scene");
  elCamera = document.querySelector(".camera");
  elContainer = document.querySelector(".container");

  moveCamera(posZ);

  window.addEventListener("wheel", (event) => {
    posZ += event.deltaY * 0.3;
    moveCamera(posZ, false);
  });

  window.addEventListener("mousemove", (event) => {
    const { clientX, clientY } = event;
    let x = (clientX / window.innerWidth) * 2 - 1;
    let y = (clientY / window.innerHeight) * 2 - 1;

    x *= 100;
    y *= 100;

    elScene.style.transform = `translate3D(${x}px, ${y + 200}px, 0)`;
  });

  buildWorld();
}

function lerp(start, end, t) {
  return start + (end - start) * t;
}

function moveCamera(position, smoothed = true) {
  camPosition = position;
  if (!smoothed) smoothPosition = camPosition;
}

function updateCamera() {
  smoothAngle = lerp(smoothAngle, camAngle, 0.1);
  smoothPosition = lerp(smoothPosition, camPosition, 0.1);

  const transform = `translateZ(${smoothPosition}px) rotateY(${smoothAngle}deg)`;
  elCamera.style.transform = transform;
  elContainer.style.setProperty("--z", smoothPosition + "px");
}

function create({
  x,
  y,
  z,
  width,
  height,
  classes = "",
  id = "",
  html = "",
  rotX = 0,
  rotY = 0,
  rotZ = 0,
  scaleX = 1,
  scaleY = 1,
  scaleZ = 1,
}) {
  const el = document.createElement("div");
  if (id) el.id = id;
  el.classList.add("rectangle");
  if (classes) el.classList.add(...classes.split(" "));

  const rotation = `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`;
  const scale = `scaleX(${scaleX}) scaleY(${scaleY}) scaleZ(${scaleZ})`;

  el.style.transform = `translate3D(${x}px, ${-y}px, ${z}px) ${rotation} ${scale}`;
  el.style.width = `${width}px`;
  el.style.height = `${height}px`;
  el.innerHTML = html;
  elCamera.appendChild(el);

  return el;
}

function buildWorld() {
  create({ x: 3027, y: 260, z: -2900, width: 80, height: 80, classes: "div" });
  create({ x: 1388, y: 284, z: -1600, width: 40, height: 60, classes: "div" });
  create({ x: 1789, y: 194, z: -1920, width: 50, height: 50, classes: "div" });
}

// Initialisation et démarrage de l'animation
setup();
run(update);
