import Particle from "./Particle.js";
import { createEngine } from "../../shared/engine.js";
import { Spring } from "../../shared/spring.js";

const { renderer, input, math, run, finish } = createEngine();
const { ctx, canvas } = renderer;
run(update);

let particles = [];
let specialCharPosPX;

let threeAsbeenFound = false;

createGrid();

window.addEventListener("resize", handleResize.bind(this));

function handleResize() {
  particles = [];
  createGrid();
}

function createGrid() {
  console.log("create grid");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ+*#£$!?^=&%§";
  const gridSize = 40;
  const cols = Math.floor(canvas.width / gridSize);
  const rows = Math.floor(canvas.height / gridSize);

  // Centering offsets
  const offsetX = (canvas.width - cols * gridSize) / 2;
  const offsetY = (canvas.height - rows * gridSize) / 2;

  let placedSpecialChar = false;
  const specialCharPos = {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows),
  };
  // console.log(specialCharPos);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let letter = letters.charAt(Math.floor(Math.random() * letters.length));

      const isSpecial =
        !placedSpecialChar && i === specialCharPos.x && j === specialCharPos.y;
      if (isSpecial) {
        letter = "3";
        placedSpecialChar = true;
      }

      particles.push(
        new Particle(
          ctx,
          letter,
          isSpecial,
          i * gridSize + offsetX,
          j * gridSize + offsetY
        )
      );
    }
  }

  specialCharPosPX = {
    x: specialCharPos.x * gridSize + offsetX,
    y: specialCharPos.y * gridSize + offsetY,
  };
}

function update() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    const dx = particle.x - input.getX();
    const dy = particle.y - input.getY();
    const distance = Math.sqrt(dx * dx + dy * dy);

    const sx = specialCharPosPX.x - input.getX();
    const sy = specialCharPosPX.y - input.getY();

    const distanceWithSpecialChar = Math.sqrt(sx * sx + sy * sy);
    const progress = math.mapClamped(distanceWithSpecialChar, 100, 600, 1, 0);
    const maxDistance = math.mapClamped(progress, 0, 1, 200, 30);
    let scale;

    if (particle.isSpecial) {
      particle.color = "red";
    }

    if (!threeAsbeenFound) {
      scale = Math.max(0.2, 2 - distance / maxDistance);
    } else {
      if (particle.isSpecial) {
        particle.color = "red";
        scale = 12;
        particle.x = canvas.width / 2;
        particle.y = canvas.height / 2;
      } else {
        scale = 0.2;
      }
    }

    let specialParticleScale = false;

    particle.scale = scale;

    if (input.isPressed()) {
      if (!particle.isSpecial) {
        const force = Math.max(0, 150 - distance) / 100;
        particle.vx += force * dx * 1;
        particle.vy += force * dy * 1;
      }
    }
    if (input.isDown()) {
      if (particle.isSpecial && distanceWithSpecialChar < 20) {
        threeAsbeenFound = true;
      }
    }

    particle.updatePosition(input.isPressed());
    particle.draw();
  });
}
