import { createEngine } from "../../shared/engine.js";

const { renderer, input, math, run, finish } = createEngine();
const { ctx, canvas } = renderer;
run(update);

const points = [];
const lines = [];
let startPoint;
let clickPositionX;
let clickPositionY;

function createPoint(x, y) {
  points.push({ positionX: x, positionY: y, radius: 20 });
}

function createLine(startPoint, endPoint) {
  lines.push({ startPoint, endPoint });
}

function deleteLine(line) {
  const id = lines.indexOf(line);
  lines.splice(id, 1);
}

function seededRandom(seed) {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function createSeededPoints(numPoints, seed) {
  for (let i = 0; i < numPoints; i++) {
    const x = seededRandom(seed + i) * canvas.width;
    const y = seededRandom(seed + i + numPoints) * canvas.height;
    createPoint(x, y);
  }
}

// Use a fixed seed to keep point positions consistent
const seed = 12345; // You can change this number to generate a different layout
createSeededPoints(50, seed);

function update() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const mouseX = input.getX();
  const mouseY = input.getY();
  if (input.isDown()) {
    clickPositionX = mouseX;
    clickPositionY = mouseY;
  }

//   if (input.isPressed()) {
//     if (!startPoint) {
//       for (const point of points) {
//         const dist = math.dist(
//           point.positionX,
//           point.positionY,
//           mouseX,
//           mouseY
//         );
//         if (dist < point.radius) {
//           startPoint = point;
//         }
//       }
//     }

//     if (!startPoint) {
//       for (const line of lines) {
//         const mouseSide = getSideOfLineSegment(
//           line.startPoint.positionX,
//           line.startPoint.positionY,
//           line.endPoint.positionX,
//           line.endPoint.positionY,
//           mouseX,
//           mouseY
//         );
//         const clickSide = getSideOfLineSegment(
//           line.startPoint.positionX,
//           line.startPoint.positionY,
//           line.endPoint.positionX,
//           line.endPoint.positionY,
//           clickPositionX,
//           clickPositionY
//         );
//         if (clickSide !== mouseSide) {
//           deleteLine(line);
//           break;
//         }
//       }
//     }
//   }

//   let currentLineX = mouseX;
//   let currentLineY = mouseY;

//   if (startPoint) {
//     for (const point of points) {
//       if (point === startPoint) continue;
//       if (
//         isLineNearPoint(
//           startPoint,
//           { positionX: currentLineX, positionY: currentLineY },
//           point
//         )
//       ) {
//         createLine(startPoint, point);
//         startPoint = null;
//         break;
//       }
//     }
//   }

//   if (!input.isPressed()) {
//     startPoint = null;
//   }

//   drawPointsAndLines();
// }

// function drawPointsAndLines() {
//   ctx.fillStyle = "white";
//   for (const point of points) {
//     ctx.beginPath();
//     ctx.ellipse(
//       point.positionX,
//       point.positionY,
//       point.radius,
//       point.radius,
//       0,
//       0,
//       Math.PI * 2
//     );
//     ctx.fill();
//   }

//   ctx.strokeStyle = "white";
//   ctx.lineWidth = 10;
//   for (const line of lines) {
//     ctx.beginPath();
//     ctx.moveTo(line.startPoint.positionX, line.startPoint.positionY);
//     ctx.lineTo(line.endPoint.positionX, line.endPoint.positionY);
//     ctx.stroke();
//   }

//   if (startPoint) {
//     ctx.beginPath();
//     ctx.moveTo(startPoint.positionX, startPoint.positionY);
//     ctx.lineTo(input.getX(), input.getY());
//     ctx.stroke();
//   }
// }

/**
 * Check if a line segment is near a point.
 * @param {Object} lineStart - Start point of the line.
 * @param {Object} lineEnd - Current endpoint of the line being drawn.
 * @param {Object} point - The point to check against.
 * @returns {boolean} - True if the line is near the point.
 */
function isLineNearPoint(lineStart, lineEnd, point) {
  const distance = closestDistanceToSegment(
    lineStart.positionX,
    lineStart.positionY,
    lineEnd.positionX,
    lineEnd.positionY,
    point.positionX,
    point.positionY
  );
  return distance < point.radius;
}

function closestDistanceToSegment(x1, y1, x2, y2, px, py) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx === 0 && dy === 0) return math.dist(x1, y1, px, py);

  const t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);
  const clampedT = Math.max(0, Math.min(1, t));
  const nearestX = x1 + clampedT * dx;
  const nearestY = y1 + clampedT * dy;
  return math.dist(nearestX, nearestY, px, py);
}

// function getSideOfLineSegment(x1, y1, x2, y2, px, py) {
//   const determinant = (x2 - x1) * (py - y1) - (y2 - y1) * (px - x1);
//   const withinXBounds = Math.min(x1, x2) <= px && px <= Math.max(x1, x2);
//   const withinYBounds = Math.min(y1, y2) <= py && py <= Math.max(y1, y2);

//   if (determinant === 0 && withinXBounds && withinYBounds) return "on";
//   if (!withinXBounds || !withinYBounds) return "outside";
//   return determinant > 0 ? "left" : "right";
// }
