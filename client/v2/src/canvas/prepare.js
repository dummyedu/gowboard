
const { renderToCanvasGenerator } = require('./render');

const prepareImages = () => {
  
  const backGroundImage = new Image();
  backGroundImage.src = require('../assets/background.png');
  
  const gameImagesSrc = [];
  gameImagesSrc.push(require('../assets/red.png'));
  gameImagesSrc.push(require('../assets/purple.png'));
  gameImagesSrc.push(require('../assets/blue.png'));
  gameImagesSrc.push(require('../assets/green.png'));
  gameImagesSrc.push(require('../assets/gold.png'));
  gameImagesSrc.push(require('../assets/brown.png'));
  gameImagesSrc.push(require('../assets/skull.png'));
  gameImagesSrc.push(require('../assets/block.png'));
  gameImagesSrc.push(require('../assets/skull2.png'));
  
  const gameImages = gameImagesSrc.map(src => {
    const img = new Image();
    img.src = src;
    return src == null ? null : img;
  });  
  
  return {
    backGroundImage,
    gameImages,
  }
}

const { backGroundImage, gameImages } = prepareImages();

const isImagePrepared = () => {
  if (!backGroundImage.complete) {
    return false;
  }
  for (let i = 0; i < gameImages.length; i++) {
    const img = gameImages[i];
    if (img && !img.complete) {
      return false;
    }
  }
  return true;
}

const renderToCanvas = renderToCanvasGenerator(backGroundImage, gameImages);

export {
  renderToCanvas,
  isImagePrepared
}
