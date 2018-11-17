
const { createCanvas, loadImage } = require('canvas')

const prepareImages = async () => {
  const backGroundImage = await loadImage('./client/v2/src/assets/background.png');
  const gameImagesSrc = [];
  gameImagesSrc.push('./client/v2/src/assets/red.png');
  gameImagesSrc.push('./client/v2/src/assets/purple.png');
  gameImagesSrc.push('./client/v2/src/assets/blue.png');
  gameImagesSrc.push('./client/v2/src/assets/green.png');
  gameImagesSrc.push('./client/v2/src/assets/gold.png');
  gameImagesSrc.push('./client/v2/src/assets/brown.png');
  gameImagesSrc.push('./client/v2/src/assets/skull.png');
  gameImagesSrc.push('./client/v2/src/assets/block.png');
  gameImagesSrc.push('./client/v2/src/assets/skull2.png');
  const gameImages = [];
  for (let i = 0; i < gameImagesSrc.length; i++) {
    const img = await loadImage(gameImagesSrc[i]);
    gameImages.push(img);
  }
  return {
    backGroundImage,
    gameImages,
  }
}

module.exports = {
  prepareImages,
  createCanvas,
}
