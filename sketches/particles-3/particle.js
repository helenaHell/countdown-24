// particle.js
export class Particle {
  constructor(x, y, targetX, targetY) {
    this.x = x; // Initial x position
    this.y = y; // Initial y position
    this.targetX = targetX; // Target x position (where the mouse is)
    this.targetY = targetY; // Target y position (where the mouse is)
    this.size = Math.random() * 5 + 2; // Random particle size
    this.speed = Math.random() * 3 + 1; // Random speed for variety
    this.angle = Math.atan2(targetY - y, targetX - x); // Direction angle towards target
  }

  update() {
    // Move the particle towards the target (mouse position)
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
  }

  draw(ctx) {
    // Draw the particle on the canvas
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  }
}
