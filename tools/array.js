const dumpArray = (offset, array, score) => {
  let s = "";
  for (let j = offset; j < 8 + offset; j++) {
    for (let i = offset; i < 8 + offset; i++) {
      let v = array[j * (8 + offset * 2) + i];
      let str = v;
      if (score != null) {
        if (score.x1 === i && score.y1 === j ||
          score.x2 === i && score.y2 === j) {
            str = makeRed(str);
          }
      }
      s = s + " " + str;
    }
    s = s + "\n";
  }
  console.log(s);
  return s;
}

module.exports = {
  dumpArray,
};
