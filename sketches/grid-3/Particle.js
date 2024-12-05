export default class Particle {
  constructor(ctx, letter, isSpecial, x, y) {
    this.ctx = ctx;
    this.letter = letter;
    this.x = x;
    this.y = y;
    this.initialX = x;
    this.initialY = y;
    this.isSpecial = isSpecial;
    this.vx = 0;
    this.vy = 0;
    this.color = "white";
    this.scale = 1;
    this.hasBeenClicked = false;
  }

  updatePosition(mouseIsClicked) {
    this.vx *= 0.6;
    this.vy *= 0.6;
    this.x += this.vx;
    this.y += this.vy;

    if (!mouseIsClicked) {
      const dx = this.initialX - this.x;
      const dy = this.initialY - this.y;
      this.vx += dx * 0.9;
      this.vy += dy * 0.9;
    }
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.fillStyle = this.color;
    this.ctx.font = `${this.scale * 20}px monospace`;
    this.ctx.fillText(this.letter, 0, 0);
    this.ctx.restore();
  }
}
