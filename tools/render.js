
const renderToCanvasGenerator = (backGroundImage, gameImages) => (canvas, board, blockSize, swapXY) => {
  const ctx = canvas.getContext('2d');
  for (let i = 0; i < 8; i+=2) {
    for (let j = 0; j < 8; j+=2) {
      ctx.drawImage(backGroundImage, i * blockSize, j * blockSize,
        blockSize * 2, blockSize * 2,  
      );
    }
  }
  const offset = blockSize / 32;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const idx = i + j * 8;
      const color = board[idx];
      if (color === -1) continue;
      ctx.drawImage(gameImages[color], i * blockSize + offset, j * blockSize + offset, 
        blockSize - offset * 2, blockSize - offset * 2);
    }
  }
};

module.exports = { renderToCanvasGenerator };
