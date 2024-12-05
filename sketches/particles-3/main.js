import { createEngine } from "../../shared/engine.js";
import { Spring } from "../../shared/spring.js";
import ParticleSystem from "./particleSystem.js";

const { renderer, input, math, run, finish } = createEngine();
const { ctx, canvas } = renderer;
run(update);
export default class App extends BaseApp {
  constructor() {
    super();
    this.pathPoints = [];
    this.particleSystem = new ParticleSystem();

    this.init();
  }
  x;

  async init() {
    this.pathPoints = await Utils.loadSVG(
      "sketches/particles-3/SVG/letter.svg"
    );
    this.animate();
  }

  getRandomPathPoint() {
    const pathIndex = Math.floor(Math.random() * this.pathPoints.length);
    const points = this.pathPoints[pathIndex];
    const pointIndex = Math.floor(Math.random() * points.length);
    return points[pointIndex];
  }

  generateParticles() {
    if (this.mouse.isPressed && this.pathPoints.length > 0) {
      for (let i = 0; i < 3; i++) {
        const targetPoint = this.getRandomPathPoint();
        this.particleSystem.addParticle(
          this.mouse.x,
          this.mouse.y,
          targetPoint.x,
          targetPoint.y
        );
      }
    }
  }

  animate() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 1)";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.generateParticles();
    this.particleSystem.update();
    this.particleSystem.draw(this.ctx);

    requestAnimationFrame(() => this.animate());
  }
}
