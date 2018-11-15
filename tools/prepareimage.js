
const { createCanvas, loadImage } = require('canvas')

const prepareImages = async () => {
  const backGroundImage = await loadImage('./assets/background.png');
  const gameImagesSrc = [];
  gameImagesSrc.push('./assets/red.png');
  gameImagesSrc.push('./assets/purple.png');
  gameImagesSrc.push('./assets/blue.png');
  gameImagesSrc.push('./assets/green.png');
  gameImagesSrc.push('./assets/gold.png');
  gameImagesSrc.push('./assets/brown.png');
  gameImagesSrc.push('./assets/skull.png');
  gameImagesSrc.push('./assets/block.png');
  gameImagesSrc.push('./assets/skull2.png');
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
