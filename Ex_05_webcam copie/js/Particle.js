export default class Particle {
  constructor(ctx, letter, x, y) {
    this.ctx = ctx;
    this.letter = letter; // Now the letter is passed randomly
    this.x = x;
    this.y = y;
    this.initialX = x;
    this.initialY = y;
    this.vx = 0;
    this.vy = 0;
    this.color = "white";
    this.scale = 1;
  }

  // updatePosition(mouseIsClicked, mouseX, mouseY) {
  //   // Apply friction
  //   this.vx *= 0.75;
  //   this.vy *= 0.75;
  //   this.x += this.vx;
  //   this.y += this.vy;

  updatePosition(mouseIsClicked) {
    // Friction applied during movement
    this.vx *= 0.5;
    this.vy *= 0.5;
    this.x += this.vx;
    this.y += this.vy;

    // If the mouse is clicked, move the particle towards the mouse
    // if (mouseIsClicked) {
    //   const dx = mouseX - this.x;
    //   const dy = mouseY - this.y;
    //   const distance = Math.sqrt(dx * dx + dy * dy);
    //   const force = Math.min(0.1, Math.max(0, (100 - distance) / 100)); // Limit the force applied to the particle
    //   this.vx += force * dx * 0.5;
    //   this.vy += force * dy * 0.5;
    // }

    // Apply friction to particles that aren't being dragged by the mouse
    if (!mouseIsClicked) {
      const dx = this.initialX - this.x;
      const dy = this.initialY - this.y;
      this.vx += dx * 0.5;
      this.vy += dy * 0.5;
    }
  }

  // Draw the particle (the random letter)
  draw() {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.fillStyle = this.color;
    this.ctx.font = `${this.scale * 20}px monospace`;
    this.ctx.fillText(this.letter, 0, 0);
    this.ctx.restore();
  }
}
