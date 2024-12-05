// import BaseApp from "./BaseApp.js";
// import Particle from "./Particle.js";

// export default class App extends BaseApp {
//   constructor() {
//     super();
//     this.ctx.willReadFrequently = true; // Optimization for pixel reading
//     this.particles = [];
//     this.mouse = { x: 0, y: 0, isClicked: false };
//     this.zoomFactor = 1; // Initial zoom factor (default zoom)
//     this.zoomSpeed = 0.05; // Speed of zoom effect

//     // Create the grid of random letter particles
//     this.createGrid();

//     // Event listeners for mouse interactions
//     this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
//     this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
//     this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));

//     // Start the animation loop
//     this.startAnimation();
//   }

//   // Handle mouse down to start interactions
//   handleMouseDown(e) {
//     this.mouse.isClicked = true;
//     this.mouse.x = e.offsetX;
//     this.mouse.y = e.offsetY;
//   }

//   // Handle mouse up to stop interactions
//   handleMouseUp() {
//     this.mouse.isClicked = false;
//   }

//   // Update mouse position during movement
//   handleMouseMove(e) {
//     this.mouse.x = e.offsetX;
//     this.mouse.y = e.offsetY;
//   }

//   // Create the grid of random letter particles, including a special '3' that always appears
//   createGrid() {
//     const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
//     const gridWidth = 150;
//     const gridHeight = 80;
//     let placedSpecialChar = false; // Flag to ensure '3' is placed only once

//     // Create a grid of "particles" where each "particle" is a randomly selected letter
//     for (let i = 0; i < gridWidth; i++) {
//       for (let j = 0; j < gridHeight; j++) {
//         let randomLetter;

//         if (!placedSpecialChar) {
//           // Place the '3' at a random position and mark it as placed
//           if (Math.random() < 1 / (gridWidth * gridHeight)) {
//             randomLetter = "3";
//             placedSpecialChar = true; // Ensure only one '3' is placed
//           }
//         }

//         // If '3' has not been placed yet, pick a random letter from the string
//         if (!randomLetter) {
//           randomLetter = letters.charAt(
//             Math.floor(Math.random() * letters.length)
//           );
//         }

//         // Create a particle with the random letter (or '3' in one case)
//         this.particles.push(
//           new Particle(this.ctx, randomLetter, i * 10, j * 10)
//         );
//       }
//     }
//   }

//   // Start the animation loop
//   startAnimation() {
//     const animate = () => {
//       this.update(); // Update zoom factor based on mouse
//       this.draw(); // Draw the grid

//       // Request the next frame
//       requestAnimationFrame(animate);
//     };
//     animate(); // Start the animation
//   }

//   // Update the zoom factor for the animation based on mouse position
//   update() {
//     // Zoom effect: particles zoom towards the mouse position
//     if (this.mouse.isClicked) {
//       // Gradually zoom in when clicked
//       this.zoomFactor += this.zoomSpeed;
//     } else {
//       // Gradually zoom out when the mouse is not clicked
//       this.zoomFactor -= this.zoomSpeed;
//     }

//     // Keep the zoom factor within limits
//     if (this.zoomFactor > 1.5) this.zoomFactor = 1.5;
//     if (this.zoomFactor < 1) this.zoomFactor = 1;
//   }

//   // Main draw loop that updates and draws each particle
//   draw() {
//     this.ctx.fillStyle = "black";
//     this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

//     this.particles.forEach((particle) => {
//       // Calculate distance of particle from mouse position
//       const dx = particle.x - this.mouse.x;
//       const dy = particle.y - this.mouse.y;
//       const distance = Math.sqrt(dx * dx + dy * dy);

//       // Calculate the scaling factor based on the distance from the mouse
//       const scaleFactor = 1 + (distance / 500) * (this.zoomFactor - 1);

//       // Set the particle's new position and scale based on the zoom factor and distance
//       const scaledX = particle.initialX - (dx * scaleFactor - dx);
//       const scaledY = particle.initialY - (dy * scaleFactor - dy);

//       // Set color to red if the letter is '3', otherwise use white
//       if (particle.letter === "3") {
//         particle.color = "red"; // Change color for the special '3'
//       } else {
//         particle.color = "white"; // Default color for other letters
//       }

//       // Update the particle's position and draw it
//       particle.x = scaledX;
//       particle.y = scaledY;

//       // Update the particle's position with friction (no mouse interaction)
//       particle.updatePosition(false, 0, 0);

//       // Draw the particle (the randomly selected letter)
//       particle.draw();
//     });
