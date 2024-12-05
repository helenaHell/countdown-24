import BaseApp from "./BaseApp.js";
import Particle from "./Particle.js";

export default class App extends BaseApp {
  constructor() {
    super();
    this.ctx.willReadFrequently = true;
    this.particles = [];
    this.mouse = { x: 0, y: 0, isClicked: false };

    // Initial grid creation
    this.createGrid();

    // Event listeners for mouse interactions
    this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
    this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
    this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));

    // Handle window resize
    window.addEventListener("resize", this.handleResize.bind(this));

    this.specialCharPosPX;
  }

  handleResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.particles = []; // Clear particles
    this.createGrid(); // Recreate grid
  }

  handleMouseDown(e) {
    this.mouse.isClicked = true;
    this.mouse.x = e.offsetX;
    this.mouse.y = e.offsetY;
  }

  handleMouseUp() {
    this.mouse.isClicked = false;
  }

  handleMouseMove(e) {
    this.mouse.x = e.offsetX;
    this.mouse.y = e.offsetY;
  }

  createGrid() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ+*#£$!?^=&%§";
    const gridSize = 40;
    const cols = Math.floor(this.canvas.width / gridSize);
    const rows = Math.floor(this.canvas.height / gridSize);

    // Centering offsets
    const offsetX = (this.canvas.width - cols * gridSize) / 2;
    const offsetY = (this.canvas.height - rows * gridSize) / 2;

    let placedSpecialChar = false;
    const specialCharPos = {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
    };
    console.log(specialCharPos);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let letter = letters.charAt(Math.floor(Math.random() * letters.length));

        if (
          !placedSpecialChar &&
          i === specialCharPos.x &&
          j === specialCharPos.y
        ) {
          letter = "3";
          placedSpecialChar = true;
        }

        this.particles.push(
          new Particle(
            this.ctx,
            letter,
            i * gridSize + offsetX,
            j * gridSize + offsetY
          )
        );
      }
    }
    this.draw();

    this.specialCharPosPX = {
      x: specialCharPos.x * gridSize + offsetX,
      y: specialCharPos.y * gridSize + offsetY,
    };
  }

  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle) => {
      const dx = particle.x - this.mouse.x;
      const dy = particle.y - this.mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (this.specialCharPosPX) {
        const sx = this.specialCharPosPX.x - this.mouse.x;
        const sy = this.specialCharPosPX.y - this.mouse.y;

        const distanceWithSpecialChar = Math.sqrt(sx * sx + sy * sy);
        this.variation = distanceWithSpecialChar;
      }

      const maxDistance = 100;
      let scale = Math.max(0.2, 2 - distance / maxDistance);
      // scale = scale * this.variation;
      particle.scale = scale;
      particle.color = particle.letter === "3" ? "red" : "white";

      if (this.mouse.isClicked) {
        const force = Math.max(0, 100 - distance) / 100;
        particle.vx += force * dx * 0.5;
        particle.vy += force * dy * 0.5;
      }

      particle.updatePosition(this.mouse.isClicked);
      particle.draw();
    });
    requestAnimationFrame(this.draw.bind(this));
  }
}
