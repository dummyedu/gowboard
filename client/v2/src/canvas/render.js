
const { fromX, fromY } = require('../utils');

const renderToCanvasGenerator = (backGroundImage, gameImages) => (canvas, board, blockSize, mark) => {
  const ctx = canvas.getContext('2d');
  let xoffset = mark ? 1 : 0;
  let yoffset = mark ? 0 : 0;
  for (let i = 0; i < 8; i+=2) {
    for (let j = 0; j < 8; j+=2) {
      ctx.drawImage(backGroundImage, (i + xoffset) * blockSize, (j + yoffset) * blockSize,
        blockSize * 2, blockSize * 2,  
      );
    }
  }
  if (mark) {
    const size = parseInt(30 * (blockSize) / 40, 10);
    const textOffsetX = parseInt(10 * (blockSize) / 40, 10);
    const textOffsetY = parseInt(10 * (blockSize) / 40, 10);
    ctx.font = `${size}px Arial`;
    for (let i = 0; i < 8; i++) {
      ctx.fillText(fromX(i), (i + xoffset) * blockSize + textOffsetX,
        8 * blockSize + textOffsetY + (blockSize / 2));
    }
    for (let i = 0; i < 8; i++) {
      ctx.fillText(fromY(i), textOffsetX,
      (i + yoffset) * blockSize + textOffsetY + (blockSize / 2));
    }
  }
  const offset = blockSize / 32;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const idx = i + j * 8;
      const color = board[idx];
      if (color === -1) continue;
      ctx.drawImage(gameImages[color], (i + xoffset) * blockSize + offset, (j + yoffset) * blockSize + offset, 
        blockSize - offset * 2, blockSize - offset * 2);
    }
  }
};

module.exports = { renderToCanvasGenerator };
