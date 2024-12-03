import Particle from "./Particle.js";
import { createEngine } from "../../shared/engine.js";
import { Spring } from "../../shared/spring.js";

const { renderer, input, math, run, finish } = createEngine();
const { ctx, canvas } = renderer;
run(update);

const particles = [];
let specialCharPosPX;

// Initial grid creation
createGrid();

// Handle window resize
window.addEventListener("resize", handleResize.bind(this));

function handleResize() {
  particles = []; // Clear particles
  createGrid(); // Recreate grid
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
  console.log("Draw");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    const dx = particle.x - input.getX();
    const dy = particle.y - input.getY();
    const distance = Math.sqrt(dx * dx + dy * dy);

    let variation = 0;

    const sx = specialCharPosPX.x - input.getX();
    const sy = specialCharPosPX.y - input.getY();

    const distanceWithSpecialChar = Math.sqrt(sx * sx + sy * sy);
    const progress = math.mapClamped(distanceWithSpecialChar, 100, 600, 1, 0);

    const maxDistance = math.mapClamped(progress, 0, 1, 200, 30);

    let scale = Math.max(0.2, 2 - distance / maxDistance);
    //scale = scale * (1 + variation);
    particle.scale = scale;
    particle.color = particle.letter === "3" ? "red" : "white";

    if (input.isPressed()) {
      if (particle.isSpecial) {
      } else {
        const force = Math.max(0, 100 - distance) / 100;
        particle.vx += force * dx * 0.5;
        particle.vy += force * dy * 0.5;
      }
    }

    particle.updatePosition(input.isPressed());
    particle.draw();
  });
}
