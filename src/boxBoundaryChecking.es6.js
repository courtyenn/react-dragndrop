'use strict';

// Checks a box boundary with another box boundary
export default function checkBoundaries(origin, target){
  return (origin.x >= target.x &&
    origin.x <= target.x + target.width &&
    origin.y >= target.y &&
    origin.y <= target.y + target.height) ||
    (origin.x + origin.width >= target.x &&
      origin.x + origin.width <= target.x + target.width &&
      origin.y + origin.height >= target.y &&
      origin.y + origin.height <= target.y + target.height);

    }
